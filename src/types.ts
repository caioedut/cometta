import type { Properties } from 'csstype';

export type Falsy = undefined | null | false | 0 | -0 | 0n | '';

export type Alias = {
  [key: string]: string;
};

export type Variables = {
  [key: string]: string | number;
};

export type TenizeStyle = Properties & {
  [key: string]: string | number | TenizeStyle;
};
