import encrypt from '../encrypt';
import { __cometta_classes__ } from '../constants';
import { Falsy, ComettaStyle } from '../types';
import jss from './jss';
import css from './css';

export default function sheet(...styles: (ComettaStyle | string | Falsy)[]) {
  const stylesJss = jss(...styles);

  const cssClass = `t${encrypt(JSON.stringify(stylesJss))}`;

  let cssText = `.${cssClass} { ${css(stylesJss)} }`;

  for (let attr in stylesJss) {
    let value = stylesJss[attr];

    if (typeof value === 'object' && value && attr.startsWith('&')) {
      attr = attr.substring(1);
      cssText += `\n.${cssClass}${attr} { ${css(value)} }`;
    }
  }

  if (!__cometta_classes__.includes(cssClass)) {
    __cometta_classes__.push(cssClass);

    if (typeof document !== 'undefined') {
      const head = document.head || document.getElementsByTagName('head')[0];
      const tag = document.createElement('style');

      tag.setAttribute('type', 'text/css');
      tag.setAttribute('data-cometta', 'true');
      tag.innerHTML = cssText;

      head.appendChild(tag);
    }
  }

  return cssClass;
}
