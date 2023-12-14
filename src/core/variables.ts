import { Variables } from '../types';
import { __cometta_variables__ } from '../constants';

export default function variables(vars: Variables) {
  Object.assign(__cometta_variables__, vars);
}
