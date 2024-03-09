import { ComettaParam } from '../types';
import media from './media';
import prepare from './prepare';

export default function jss(...styles: (ComettaParam | ComettaParam[])[]) {
  const result: { [key: string]: any } = {};
  const resolvedStyle = prepare(...styles);

  for (const attr in resolvedStyle) {
    if (attr === '__className') {
      continue;
    }

    const value = resolvedStyle[attr];

    // JSS doesn't support nested styles
    if (attr.startsWith('&')) {
      continue;
    }

    // JSS media queries (@media)
    if (attr.startsWith('@media')) {
      Object.assign(result, media(attr, value as any) || {});
      continue;
    }

    if (attr) {
      result[attr] = value;
    }
  }

  return result;
}
