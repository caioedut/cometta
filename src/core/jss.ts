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
      const { dimensions } = __cometta_polyfill__;

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

      for (let mediaAttr in mediaQueries) {
        const mediaValue = mediaQueries[mediaAttr];

        if (typeof mediaValue !== 'number') {
          continue;
        }

        if (mediaAttr === 'minWidth' && dimensions.width() < mediaValue) {
          mediaMatches = false;
        }

        if (mediaAttr === 'maxWidth' && dimensions.width() > mediaValue) {
          mediaMatches = false;
        }

        if (mediaAttr === 'minHeight' && dimensions.height() < mediaValue) {
          mediaMatches = false;
        }

        if (mediaAttr === 'maxHeight' && dimensions.height() > mediaValue) {
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
