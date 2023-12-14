import { Alias, Variables } from './types';

export const __cometta_classes__: string[] = [];

export const __cometta_aliases__: Alias = {};

export const __cometta_variables__: Variables = {};

export const isWeb = Boolean(typeof window !== 'undefined' && window.document);

export const isNative = typeof navigator !== 'undefined' && navigator?.product === 'ReactNative';

export const isServer = !isWeb && !isNative;

export const remInPixel = Number(
  isWeb ? getComputedStyle(document.documentElement).fontSize.replace(/[a-zA-Z]*$/, '') : 16,
);

// See https://react-cn.github.io/react/tips/style-props-value-px.html
export const notPxProps = [
  'animationIterationCount',
  'boxFlex',
  'boxFlexGroup',
  'boxOrdinalGroup',
  'columnCount',
  'fillOpacity',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'flexOrder',
  'fontWeight',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'scale',
  'stopOpacity',
  'strokeDashoffset',
  'strokeOpacity',
  'strokeWidth',
  'tabSize',
  'transform',
  'widows',
  'zIndex',
  'zoom',
] as const;
