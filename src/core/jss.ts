import { Falsy, ComettaStyle } from '../types';
import nativeProps from '../resolver/nativeProps';
import aliasProps from '../resolver/aliasProps';
import { __cometta_aliases__, __cometta_variables__, isWeb, remInPixel } from '../constants';

const parseUnit = (value: any) => {
  return isNaN(value) ? value : Number(value);
};

export default function jss(...styles: (ComettaStyle | string | Falsy)[]) {
  let result: ComettaStyle = {};

  for (let currentStyles of styles) {
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

        const valueTrim = `${value ?? ''}`.trim();
        const valueSplit = valueTrim.split(/\s/g).filter((item: string) => item.trim());

        // recursive object jss
        if (typeof value === 'object' && value) {
          result[prop] = jss(value);
          continue;
        }

        // Parse to camel-case
        prop = prop.replace(/([\-_]\w)/g, (k) => k[1]?.toUpperCase() ?? '');

        // extract alias
        prop = __cometta_aliases__[prop] ?? prop;
        // @ts-expect-error
        prop = aliasProps[prop] ?? prop;
        // @ts-expect-error
        prop = nativeProps[prop] ?? prop;

        if (!prop) {
          continue;
        }

        // Resolve VARS
        if (typeof value === 'string') {
          value = value.replace(/var\(([\w\-\_]+)\)+/g, (original: string, varName: string) => {
            return varName in __cometta_variables__ ? (__cometta_variables__[varName] as string) : original;
          });
        }

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

  // Cast Units
  for (let prop in result) {
    let value = result[prop];

    // REM polyfill
    if (typeof value === 'string' && !isWeb) {
      const remRegex = /([+-]?([0-9]*[.])?[0-9]+)rem/gi;
      if (remRegex.test(value)) {
        value = value.replace(remRegex, ($x, $1) => {
          return `${$x ? $1 * remInPixel : 0}`;
        });

        value = parseUnit(value);
      }
    }

    // PX
    if (typeof value === 'string' && /^-?[\d.]+px$/.test(value)) {
      value = Number(value.replace(/px$/, ''));
    }

    result[prop] = value;
  }

  return result;
}
