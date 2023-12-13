import type { Properties } from 'csstype';

export type Alias = {
  [key: string]: string;
};

export type Variables = {
  [key: string]: string | number;
};

export type TenizeStyle = Properties & {
  [key: string]: any;
};

export type TenizeStyleWeb = Properties;
