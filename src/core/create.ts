import { ComettaStyle } from '../types';
import { isWeb } from '../constants';
import sheet from './sheet';

export default function create<T>(schema: T) {
  // @ts-expect-error
  const resolved: { [key in keyof T]: ComettaStyle } = {};

  for (const namespace in schema) {
    const styles = schema[namespace] as ComettaStyle;

    if (isWeb) {
      sheet(styles);
    }

    resolved[namespace] = styles;
  }

  return resolved;
}
