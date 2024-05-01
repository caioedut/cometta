import { notPxProps } from '../constants';
import type { ComettaParam } from '../types';
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

    // Inline styles doesn't support @ queries
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
      // Parse to kebab-case
      attr = attr.replace(/([A-Z])/g, '-$1').toLowerCase();
      result[attr] = value;
    }
  }

  return Object.entries(result)
    .map(([attr, value]) => `${attr}: ${value};`)
    .join(' ');
}
