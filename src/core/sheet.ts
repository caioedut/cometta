import encrypt from '../encrypt';
import { ComettaParam } from '../types';
import createStyleSheet from './createStyleSheet';
import css from './css';
import prepare from './prepare';

export default function sheet(...styles: (ComettaParam | ComettaParam[])[]) {
  const resolvedStyle = prepare(...styles);

  const cssClass = resolvedStyle?.__className || `c${encrypt(JSON.stringify(resolvedStyle))}`;

  let cssMedia = '';
  let cssText = `.${cssClass} { ${css(resolvedStyle)} }`;

  for (let attr in resolvedStyle) {
    const value = resolvedStyle[attr];

    if (value && typeof value === 'object') {
      // Nested
      if (attr.startsWith('&')) {
        attr = attr.substring(1);
        cssText += `\n.${cssClass}${attr} { ${css(value)} }`;
      }

      // Media query
      if (attr.startsWith('@media')) {
        cssMedia += `${attr} { .${cssClass} { ${css(value)} } }`;
      }
    }
  }

  createStyleSheet(`${cssText}\n${cssMedia}`, { uniqueId: cssClass });

  return cssClass;
}
