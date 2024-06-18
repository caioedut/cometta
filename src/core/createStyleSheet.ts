import { __cometta_elements__ } from '../constants';
import variables from './variables';

export default function createStyleSheet(css: string, options: { uniqueId?: string | number; prepend?: boolean }) {
  if (typeof globalThis.document !== 'undefined') {
    const { uniqueId, prepend } = options;

    let tag: HTMLStyleElement;

    if (uniqueId) {
      tag = __cometta_elements__[uniqueId] ?? globalThis.document.createElement('style');
      __cometta_elements__[uniqueId] = tag;
    } else {
      tag = globalThis.document.createElement('style');
    }

    tag.setAttribute('data-cometta', `${uniqueId ?? ''}`);
    tag.setAttribute('type', 'text/css');
    tag.textContent = css;

    const head = globalThis.document.head || globalThis.document.getElementsByTagName('head')[0];

    if (tag.parentElement !== head) {
      if (prepend) {
        tag.setAttribute('data-prepend', '');

        const last = Array.from(head.querySelectorAll('[data-cometta][data-prepend]')).at(-1);

        if (last) {
          last.after(tag);
        } else {
          head.prepend(tag);
        }
      } else {
        head.append(tag);
      }
    }

    // Insert variables on DOM
    if (!globalThis.document.querySelector('[data-cometta="cometta-variables"]')) {
      variables({});
    }
  }
}
