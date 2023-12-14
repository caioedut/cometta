import { ComettaStyle } from '../types';
import jss from './jss';
import { isWeb } from '../constants';
import sheet from './sheet';

export default function create(schema: { [key: string]: ComettaStyle | string }) {
  return Object.fromEntries(
    Object.entries(schema).map(([key, styles]) => {
      if (isWeb) {
        sheet(styles);
      }

      return [key, jss(styles)];
    }),
  );
}
