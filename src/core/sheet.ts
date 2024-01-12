import encrypt from '../encrypt';
import { __cometta_elements__ } from '../constants';
import { ComettaParam } from '../types';
import css from './css';
import prepare from './prepare';

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

  if (typeof document !== 'undefined') {
    const tag = __cometta_elements__[cssClass] ?? document.createElement('style');
    __cometta_elements__[cssClass] = tag;

    tag.setAttribute('type', 'text/css');
    tag.setAttribute('data-cometta', cssClass);
    tag.textContent = `${cssText}\n${cssMedia}`;

    (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
  }

  return cssClass;
}
