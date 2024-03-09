import type { Properties } from 'csstype';

export type Falsy = undefined | null | false | 0 | -0 | 0n | '';

export type Parser = (value: any, prop: string) => ComettaStyle | Falsy;

export type UnitParser = (value: any, prop: string) => number | string | Falsy;

export type Alias = {
  [key: string]: string;
};

export type Variables = {
  [key: string]: string | number;
};

export type Polyfill = {
  colorScheme: 'light' | 'dark' | (() => 'light' | 'dark');
  fontSize: null | number | (() => number);
  screenWidth: null | number | (() => number);
  screenHeight: null | number | (() => number);
};

export type ComettaStyle = Properties<(string & {}) | (number & {})> & {
  [key: string]: string | number | ComettaStyle;
} & { __className?: string };

export type ComettaParam = ComettaStyle | string | Falsy;
