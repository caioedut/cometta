import { notPxProps } from '../constants';
import { ComettaParam } from '../types';
import prepare from './prepare';

export default function css(...styles: (ComettaParam | ComettaParam[])[]) {
  const result: { [key: string]: any } = {};
  const resolvedStyle = prepare(...styles);

  for (let attr in resolvedStyle) {
    if (attr === '__className') {
      continue;
    }

    let value = resolvedStyle[attr];

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
      result[attr] = value;
    }
  }

  return Object.entries(result)
    .map(([attr, value]) => {
      // Parse to snake-case
      attr = attr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      return `${attr}: ${value};`;
    })
    .join(` `);
}
