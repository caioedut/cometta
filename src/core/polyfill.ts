import { Polyfill, RecursivePartial } from '../types';
import { __cometta_polyfill__ } from '../constants';

export default function polyfill(options?: RecursivePartial<Polyfill>) {
  // TODO: dynamic deep assign

  Object.assign(__cometta_polyfill__.units, options?.units || {});
}
