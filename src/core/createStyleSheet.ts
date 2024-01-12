import { __cometta_elements__ } from '../constants';

export default function createStyleSheet(css: string, uniqueId?: string | number) {
  if (typeof document !== 'undefined') {
    let tag = document.createElement('style');

    if (uniqueId) {
      tag = __cometta_elements__[uniqueId] ?? tag;
      __cometta_elements__[uniqueId] = tag;

      tag.setAttribute('data-cometta', `${uniqueId}`);
    }

    tag.setAttribute('type', 'text/css');
    tag.textContent = css;

    const head = document.head || document.getElementsByTagName('head')[0];

    if (tag.parentElement !== head) {
      head.appendChild(tag);
    }
  }
}
