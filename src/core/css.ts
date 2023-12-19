import { __cometta_aliases__, notPxProps } from '../constants';
import { Falsy, ComettaStyle } from '../types';
import jss from './jss';
import webProps from '../resolver/webProps';
import aliasProps from '../resolver/aliasProps';

export default function css(...styles: (ComettaStyle | string | Falsy)[]) {
  let resolved: { [key: string]: any } = {};

  for (let currentStyles of styles) {
    const stylesJss = jss(currentStyles);

    for (let attr in stylesJss) {
      let value = stylesJss[attr];

      if (attr.startsWith('&')) {
        continue;
      }

      if (attr.startsWith('@')) {
        continue;
      }

      // extract alias
      attr = __cometta_aliases__[attr] ?? attr;
      // @ts-expect-error
      attr = aliasProps[attr] ?? attr;
      // @ts-expect-error
      attr = webProps[attr] ?? attr;

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
