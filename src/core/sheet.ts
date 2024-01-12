import encrypt from '../encrypt';
import { ComettaParam } from '../types';
import css from './css';
import prepare from './prepare';
import createStyleSheet from './createStyleSheet';

export default function sheet(...styles: (ComettaParam | ComettaParam[])[]) {
  const currentStyle = prepare(...styles);

  const cssClass = currentStyle?.__className || `c${encrypt(JSON.stringify(currentStyle))}`;

  let cssMedia = '';
  let cssText = `.${cssClass} { ${css(currentStyle)} }`;

  for (let attr in currentStyle) {
    let value = currentStyle[attr];

    if (value && typeof value === 'object') {
      // Nested
      if (attr.startsWith('&')) {
        attr = attr.substring(1);
        cssText += `\n.${cssClass}${attr} { ${css(value)} }`;
      }

      // Media query
      if (attr.startsWith('@')) {
        cssMedia += `${attr} { .${cssClass} { ${css(value)} } }`;
      }
    }
  }

  createStyleSheet(`${cssText}\n${cssMedia}`, { uniqueId: cssClass });

  return cssClass;
}
