import prepare from './prepare';
import { __cometta_polyfill__ } from '../constants';
import { ComettaParam } from '../types';

export default function media(query: string, style: ComettaParam | ComettaParam[]) {
  const mediaQueries = prepare(
    Object.fromEntries(
      query
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
    (__cometta_polyfill__.screenWidth instanceof Function
      ? __cometta_polyfill__.screenWidth()
      : __cometta_polyfill__.screenWidth) || 0;

  const screenHeight =
    (__cometta_polyfill__.screenHeight instanceof Function
      ? __cometta_polyfill__.screenHeight()
      : __cometta_polyfill__.screenHeight) || 0;

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

  return mediaMatches ? style : null;
}
