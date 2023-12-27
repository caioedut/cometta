import { Polyfill } from '../types';
import { __cometta_polyfill__ } from '../constants';

export default function polyfill(options?: Partial<Polyfill>) {
  Object.assign(__cometta_polyfill__, options || {});
}
