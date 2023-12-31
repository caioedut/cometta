import { notPxProps } from '../constants';
import { ComettaStyle, Falsy } from '../types';
import prepare from './prepare';

export default function css(...styles: (ComettaStyle | string | Falsy)[]) {
  let resolved: { [key: string]: any } = {};

  for (let currentStyles of styles) {
    const currentStyle = prepare(currentStyles);

    for (let attr in currentStyle) {
      let value = currentStyle[attr];

      // Inline styles doesn't support nested css
      if (attr.startsWith('&')) {
        continue;
      }

      // Inline styles doesn't support @media queries
      if (attr.startsWith('@')) {
        continue;
      }

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
