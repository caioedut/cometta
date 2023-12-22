import { ComettaStyle } from '../types';
import { isWeb } from '../constants';
import sheet from './sheet';
import prepare from './prepare';

export default function create(schema: { [key: string]: ComettaStyle | string }) {
  return Object.fromEntries(
    Object.entries(schema).map(([key, styles]) => {
      if (isWeb) {
        sheet(styles);
      }

      return [key, prepare(styles)];
    }),
  );
}
