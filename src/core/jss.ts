import { ComettaStyle, Falsy } from '../types';
import { __cometta_polyfill__ } from '../constants';
import prepare from './prepare';

export default function jss(...styles: (ComettaStyle | string | Falsy)[]) {
  const result: { [key: string]: any } = {};
  const resolvedStyle = prepare(...styles);

  for (let attr in resolvedStyle) {
    let value = resolvedStyle[attr];

    // JSS doesn't support nested styles
    if (attr.startsWith('&')) {
      continue;
    }

    // JSS media queries (@media)
    if (attr.startsWith('@')) {
      const mediaQueries = prepare(
        Object.fromEntries(
          attr
            .replace('@media', '')
            .trim()
            .split('and')
            .map((item) => {
              const [attr, value] = item.trim().replace(/^\(/, '').replace(/\)$/, '').split(':');

              return [attr.trim(), value?.trim()] as const;
            }),
        ),
      );

      let mediaMatches = true;

      const screenWidth =
        __cometta_polyfill__.screenWidth instanceof Function
          ? __cometta_polyfill__.screenWidth()
          : __cometta_polyfill__.screenWidth || 0;

      const screenHeight =
        __cometta_polyfill__.screenHeight instanceof Function
          ? __cometta_polyfill__.screenHeight()
          : __cometta_polyfill__.screenHeight || 0;

      for (let mediaAttr in mediaQueries) {
        const mediaValue = mediaQueries[mediaAttr];

        if (typeof mediaValue !== 'number') {
          continue;
        }

        if (mediaAttr === 'minWidth' && screenWidth < mediaValue) {
          mediaMatches = false;
        }

        if (mediaAttr === 'maxWidth' && screenWidth > mediaValue) {
          mediaMatches = false;
        }

        if (mediaAttr === 'minHeight' && screenHeight < mediaValue) {
          mediaMatches = false;
        }

        if (mediaAttr === 'maxHeight' && screenHeight > mediaValue) {
          mediaMatches = false;
        }
      }

      if (mediaMatches) {
        Object.assign(result, value);
      }

      continue;
    }

    if (attr) {
      result[attr] = value;
    }
  }

  return result;
}
