import { ComettaStyle, Falsy } from '../types';
import aliasProps from '../resolver/aliasProps';
import nativeProps from '../resolver/nativeProps';
import webProps from '../resolver/webProps';
import {
  __cometta_aliases__,
  __cometta_parsers__,
  __cometta_polyfill__,
  __cometta_variables__,
  isNative,
  isWeb,
} from '../constants';

const parseUnit = (value: any) => {
  return isNaN(value) ? value : Number(value);
};

export default function prepare(...styles: (ComettaStyle | string | Falsy)[]) {
  let result: ComettaStyle = {};

  const resolved = styles.filter(Boolean).map((item) => {
    return Array.isArray(item) ? prepare(...item) : item;
  });

  // Override props
  for (let currentStyles of resolved) {
    if (!currentStyles) {
      continue;
    }

    if (typeof currentStyles === 'string') {
      const rules = currentStyles
        .split(';')
        .filter((item) => item.trim())
        .map((item) => {
          const split = item.split(':');
          const attr = (split.shift() ?? '').trim();
          const value = split.join(':').trim();

          return [attr, value] as const;
        });

      currentStyles = Object.fromEntries(rules);
    }

    if (typeof currentStyles === 'object' && currentStyles) {
      for (let attr in currentStyles) {
        let prop: string | null = attr;
        let value = currentStyles[prop];

        // apply "*" parser
        if (__cometta_parsers__['*'] instanceof Function) {
          const parsed = __cometta_parsers__['*'](value, prop);

          if (parsed) {
            Object.assign(result, parsed);
            continue;
          }
        }

        // custom parsers
        if (__cometta_parsers__[prop] instanceof Function) {
          Object.assign(result, __cometta_parsers__[prop](value, prop) || {});
          continue;
        }

        // recursive object prepare
        if (typeof value === 'object' && value) {
          result[prop] = prepare(value);
          continue;
        }

        // Parse to camel-case
        if (!prop.startsWith('_') && !prop.startsWith('-')) {
          prop = prop.replace(/([\-_]\w)/g, (k) => k[1]?.toUpperCase() ?? '');
        }

        // extract alias
        prop = __cometta_aliases__[prop] ?? prop;
        // @ts-expect-error
        prop = aliasProps[prop] ?? prop;

        if (isNative) {
          // @ts-expect-error
          prop = nativeProps[prop] ?? prop;
        } else {
          // @ts-expect-error
          prop = webProps[prop] ?? prop;
        }

        if (!prop) {
          continue;
        }

        const valueTrim = `${value ?? ''}`.trim();
        const valueSplit = valueTrim.split(/\s/g).filter((item: string) => item.trim());

        // Resolve borders
        if (['border', 'borderTop', 'borderBottom', 'borderLeft', 'borderRight'].includes(prop)) {
          if (value) {
            const preffix = prop;
            const types = [
              'none',
              'hidden',
              'dotted',
              'dashed',
              'solid',
              'double',
              'groove',
              'ridge',
              'inset',
              'outset',
              'initial',
              'inherit',
            ];

            const styleIndex = valueSplit.findIndex((item: string) => types.includes(item));
            const borderStyle = styleIndex >= 0 ? valueSplit.splice(styleIndex, 1).shift() : 'solid';

            const sizeIndex = valueSplit.findIndex((item: string) => /^\d\w*$/.test(item));
            const borderWidth =
              sizeIndex >= 0 ? Number(valueSplit.splice(sizeIndex, 1).shift()?.replace(/\D/g, '') ?? 1) : 1;

            const color = valueSplit?.shift()?.replace(/undefined|null|false|true/g, '');
            const borderColor = color || '#000000';

            Object.assign(result, {
              [`${preffix}Width`]: borderWidth,
              [`${preffix}Style`]: borderStyle,
              [`${preffix}Color`]: borderColor,
            });

            prop = null;
          }
        }

        // Resolve padding/margin arrays
        ['padding', 'margin'].forEach((prefix) => {
          if (prop === prefix) {
            const [v1, v2, v3, v4] = valueSplit;

            if (valueSplit.length > 1) {
              prop = null;

              Object.assign(result, {
                [`${prefix}Top`]: parseUnit(v1),
                [`${prefix}Right`]: parseUnit(v2 ?? v1),
                [`${prefix}Bottom`]: parseUnit(v3 ?? v1),
                [`${prefix}Left`]: parseUnit(v4 ?? v2 ?? v1),
              });
            }
          }
        });

        if (prop) {
          result[prop] = value;
        }
      }
    }
  }

  const fontSize =
    __cometta_polyfill__.fontSize instanceof Function ? __cometta_polyfill__.fontSize() : __cometta_polyfill__.fontSize;

  const screenWidth =
    __cometta_polyfill__.screenWidth instanceof Function
      ? __cometta_polyfill__.screenWidth()
      : __cometta_polyfill__.screenWidth;

  const screenHeight =
    __cometta_polyfill__.screenHeight instanceof Function
      ? __cometta_polyfill__.screenHeight()
      : __cometta_polyfill__.screenHeight;

  // Cast Units
  for (let prop in result) {
    let value = result[prop];

    if (typeof value === 'string') {
      // Resolve VARS
      value = value.replace(/var\(([\w\-_]+)\)+/g, (original: string, varName: string) => {
        return varName in __cometta_variables__ ? (__cometta_variables__[varName] as string) : original;
      });

      if (!isWeb) {
        // Polyfill REM
        if (fontSize) {
          value = value.replace(/([+-]?([0-9]*[.])?[0-9]+)rem/gi, ($x, $1) => {
            const newValue = fontSize * $1;
            return `${$x ? newValue : 0}px`;
          });
        }

        // Polyfill VW
        if (screenWidth) {
          value = value.replace(/([+-]?([0-9]*[.])?[0-9]+)vw/gi, ($x, $1) => {
            const newValue = (screenWidth * $1) / 100;
            return `${$x ? newValue : 0}px`;
          });
        }

        // Polyfill VH
        if (screenHeight) {
          value = value.replace(/([+-]?([0-9]*[.])?[0-9]+)vh/gi, ($x, $1) => {
            const newValue = (screenHeight * $1) / 100;
            return `${$x ? newValue : 0}px`;
          });
        }
      }

      if (/^-?[\d.]+px$/.test(value)) {
        value = Number(value.replace(/px$/, ''));
      }
    }

    result[prop] = value;
  }

  return result;
}
