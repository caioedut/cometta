import { __cometta_elements__ } from '../constants';

export default function createStyleSheet(css: string, options: { uniqueId?: string | number; prepend?: boolean }) {
  if (typeof document !== 'undefined') {
    const { uniqueId, prepend } = options;

    let tag;

    if (uniqueId) {
      tag = __cometta_elements__[uniqueId] ?? document.createElement('style');
      __cometta_elements__[uniqueId] = tag;
    } else {
      tag = document.createElement('style');
    }

    tag.setAttribute('data-cometta', `${uniqueId ?? ''}`);
    tag.setAttribute('type', 'text/css');
    tag.textContent = css;

    const head = document.head || document.getElementsByTagName('head')[0];

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
  }
}
