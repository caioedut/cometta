import { ComettaParam, ComettaStyle } from '../types';
import aliasProps from '../resolver/aliasProps';
import nativeProps from '../resolver/nativeProps';
import webProps from '../resolver/webProps';
import border from '../resolver/border';
import spacing from '../resolver/spacing';
import {
  __cometta_aliases__,
  __cometta_parsers__,
  __cometta_polyfill__,
  __cometta_units__,
  __cometta_variables__,
  isNative,
  isWeb,
} from '../constants';

const parseUnit = (value: any) => {
  return isNaN(value) ? value : Number(value);
};

export default function prepare(...styles: (ComettaParam | ComettaParam[])[]) {
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

        if (typeof value === 'undefined') {
          continue;
        }

        // parse to camel-case
        if (!prop.startsWith('_') && !prop.startsWith('-')) {
          prop = prop.replace(/([\-_]\w)/g, (k) => k[1]?.toUpperCase() ?? '');
        }

        // apply "*" parser
        if (__cometta_parsers__['*'] instanceof Function) {
          Object.assign(result, __cometta_parsers__['*'](value, prop) || {});
          continue;
        }

        // custom parsers
        if (__cometta_parsers__[prop] instanceof Function) {
          Object.assign(result, __cometta_parsers__[prop](value, prop) || {});
          continue;
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

        // recursive object
        if (typeof value === 'object' && value) {
          result[prop] = prepare(value);
          continue;
        }

        const valueTrim = `${value ?? ''}`.trim();

        // resolve borders
        if (['border', 'borderTop', 'borderBottom', 'borderLeft', 'borderRight'].includes(prop)) {
          Object.assign(result, border(valueTrim, prop));
          continue;
        }

        // resolve padding/margin arrays
        if (['padding', 'margin'].includes(prop)) {
          Object.assign(result, spacing(valueTrim, prop));
          continue;
        }

        // set value when there is no parser
        if (prop && typeof value !== 'undefined') {
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

      // Resolve UNITS
      for (const [unitName, unitResolver] of Object.entries(__cometta_units__)) {
        const regex = new RegExp(`([+-]?([0-9]*[.])?[0-9]+)${unitName}`, 'gi');

        value = value.replace(regex, ($x, $1) => {
          const newValue = unitResolver($1, prop);
          return `${$x ? newValue : 0}px`;
        });
      }

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

      if (/^([+-]?([0-9]*[.])?[0-9]+)px$/gi.test(value)) {
        value = Number(value.replace(/px$/i, ''));
      }
    }

    if (prop && typeof value !== 'undefined') {
      result[prop] = value;
    }
  }

  return result;
}
