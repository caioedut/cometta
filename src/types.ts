import type { Properties } from 'csstype';

export type Falsy = undefined | null | false | 0 | -0 | 0n | '';

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
      ? RecursivePartial<T[P]>
      : T[P];
};

export type Alias = {
  [key: string]: string;
};

export type Variables = {
  [key: string]: string | number;
};

export type ComettaStyle = Properties<(string & {}) | (number & {})> & {
  [key: string]: string | number | ComettaStyle;
};

export type Polyfill = {
  fontSize: null | number | (() => number);
  screenWidth: null | number | (() => number);
  screenHeight: null | number | (() => number);
};
