import type { Alias, Parser, Polyfill, UnitParser, Variables } from './types';

export const isWeb = Boolean(typeof window !== 'undefined' && window.document);

export const isNative = typeof navigator !== 'undefined' && navigator?.product === 'ReactNative';

export const isServer = !isWeb && !isNative;

export const __cometta_aliases__: Alias = {};

export const __cometta_variables__: Variables = {};

export const __cometta_parsers__: Record<string, Parser> = {};

export const __cometta_units__: Record<string, UnitParser> = {};

export const __cometta_elements__: Record<string, HTMLStyleElement> = {};

export const __cometta_polyfill__: Polyfill = {
  colorScheme: 'light',
  fontSize: 16,
  screenWidth: () => (typeof window !== 'undefined' ? window.innerWidth : 0) || 0,
  screenHeight: () => (typeof window !== 'undefined' ? window.innerHeight : 0) || 0,
};

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
