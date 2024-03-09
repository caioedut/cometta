import { __cometta_polyfill__ } from '../constants';
import { ComettaParam } from '../types';
import prepare from './prepare';

export default function media(query: string, style: ComettaParam | ComettaParam[]) {
  const mediaQueries = prepare(
    Object.fromEntries(
      query
        .replace('@media', '')
        .trim()
        .split(' and ')
        .map((item) => {
          const [attr, value] = item.trim().replace(/^\(/, '').replace(/\)$/, '').split(':');

          return [attr.trim(), value?.trim()] as const;
        }),
    ),
  );

  const mediaChecks: boolean[] = [];

  const colorScheme =
    (__cometta_polyfill__.colorScheme instanceof Function
      ? __cometta_polyfill__.colorScheme()
      : __cometta_polyfill__.colorScheme) || 'light';

  const screenWidth =
    (__cometta_polyfill__.screenWidth instanceof Function
      ? __cometta_polyfill__.screenWidth()
      : __cometta_polyfill__.screenWidth) || 0;

  const screenHeight =
    (__cometta_polyfill__.screenHeight instanceof Function
      ? __cometta_polyfill__.screenHeight()
      : __cometta_polyfill__.screenHeight) || 0;

  for (const mediaAttr in mediaQueries) {
    const mediaValue = mediaQueries[mediaAttr];

    let isValid = false;

    if (mediaAttr === 'prefersColorScheme') {
      isValid = colorScheme === mediaValue;
    }

    if (mediaAttr === 'orientation') {
      if (mediaValue === 'portrait') {
        isValid = screenHeight >= screenWidth;
      }

      if (mediaValue === 'landscape') {
        isValid = screenHeight < screenWidth;
      }
    }

    if (typeof mediaValue === 'number') {
      if (mediaAttr === 'width') {
        isValid = screenWidth === mediaValue;
      }

      if (mediaAttr === 'height') {
        isValid = screenHeight === mediaValue;
      }

      if (mediaAttr === 'minWidth') {
        isValid = screenWidth >= mediaValue;
      }

      if (mediaAttr === 'maxWidth') {
        isValid = screenWidth <= mediaValue;
      }

      if (mediaAttr === 'minHeight') {
        isValid = screenWidth >= mediaValue;
      }

      if (mediaAttr === 'maxHeight') {
        isValid = screenHeight <= mediaValue;
      }
    }

    mediaChecks.push(isValid);
  }

  return mediaChecks.every((item) => item) ? style : null;
}
