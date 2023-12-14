import { Falsy, TenizeStyle } from '../types';
import common from './common';
import nativeProps from '../resolver/nativeProps';
import aliasProps from '../resolver/aliasProps';
import { __tenize_aliases__ } from '../constants';

export default function jss(...styles: (TenizeStyle | string | Falsy)[]) {
  let result: TenizeStyle = {};

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
        let value = currentStyles[attr];

        // recursive object jss
        if (typeof value === 'object' && value) {
          result[attr] = jss(value);
          continue;
        }

        // Parse to camel-case
        attr = attr.replace(/([\-_]\w)/g, (k) => k[1]?.toUpperCase() ?? '');

        // extract alias
        attr = __tenize_aliases__[attr] ?? attr;
        // @ts-expect-error
        attr = aliasProps[attr] ?? attr;
        // @ts-expect-error
        attr = nativeProps[attr] ?? attr;

        // Common value resolve
        value = common(value);

        if (typeof value === 'string' && /^-?[\d.]+px$/.test(value)) {
          value = Number(value.replace(/px$/, ''));
        }

        if (attr) {
          // @ts-expect-error
          result[attr] = value;
        }
      }
    }
  }

  return result;
}
