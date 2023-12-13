import { __tenize_aliases__, notPxProps } from '../constants';
import { TenizeStyle } from '../types';
import jss from './jss';
import webProps from '../resolver/webProps';
import aliasProps from '../resolver/aliasProps';
import common from './common';

export default function css(...styles: (TenizeStyle | string)[]) {
  let resolved: { [key: string]: any } = {};

  for (let currentStyles of styles) {
    const stylesJss = jss(currentStyles);

    for (let attr in stylesJss) {
      let value = stylesJss[attr];

      if (attr.startsWith('&')) {
        continue;
      }

      // extract alias
      attr = __tenize_aliases__[attr] ?? attr;
      // @ts-expect-error
      attr = aliasProps[attr] ?? attr;
      // @ts-expect-error
      attr = webProps[attr] ?? attr;

      // Common value resolve
      value = common(value);

      // Insert PX on pixelable values
      if (typeof value === 'number' && !notPxProps.includes(attr as any)) {
        value = `${value}px`;
      }

      if (value === '0px') {
        value = 0;
      }

      if (attr) {
        resolved[attr] = value;
      }
    }
  }

  return Object.entries(resolved)
    .map(([attr, value]) => {
      // Parse to snake-case
      attr = attr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      return `${attr}: ${value};`;
    })
    .join(` `);
}
