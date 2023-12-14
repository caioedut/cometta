import { TenizeStyle } from '../types';
import jss from './jss';

export default function create(schema: { [key: string]: TenizeStyle | string }) {
  return Object.fromEntries(
    Object.entries(schema).map(([key, styles]) => {
      return [key, jss(styles)];
    }),
  );
}
