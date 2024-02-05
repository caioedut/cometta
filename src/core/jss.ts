import { ComettaParam } from '../types';
import prepare from './prepare';
import media from './media';

export default function jss(...styles: (ComettaParam | ComettaParam[])[]) {
  const result: { [key: string]: any } = {};
  const resolvedStyle = prepare(...styles);

  for (let attr in resolvedStyle) {
    if (attr === '__className') {
      continue;
    }

    let value = resolvedStyle[attr];

    // JSS doesn't support nested styles
    if (attr.startsWith('&')) {
      continue;
    }

    // JSS media queries (@media)
    if (attr.startsWith('@')) {
      Object.assign(result, media(attr, value as any) || {});
      continue;
    }

    if (attr) {
      result[attr] = value;
    }
  }

  return result;
}
