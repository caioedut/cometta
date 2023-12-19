import encrypt from '../encrypt';
import { __cometta_classes__ } from '../constants';
import { Falsy, ComettaStyle } from '../types';
import jss from './jss';
import css from './css';

export default function sheet(...styles: (ComettaStyle | string | Falsy)[]) {
  const stylesJss = jss(...styles);

  const cssClass = `t${encrypt(JSON.stringify(stylesJss))}`;

  let cssMedia = '';
  let cssText = `.${cssClass} { ${css(stylesJss)} }`;

  for (let attr in stylesJss) {
    let value = stylesJss[attr];

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

  if (!__cometta_classes__.includes(cssClass)) {
    __cometta_classes__.push(cssClass);

    if (typeof document !== 'undefined') {
      const tag = document.createElement('style');
      tag.setAttribute('type', 'text/css');
      tag.setAttribute('data-cometta', cssClass);
      tag.textContent = `${cssText}\n${cssMedia}`;

      (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
    }
  }

  return cssClass;
}
