import { __cometta_variables__ } from '../constants';
import { Variables } from '../types';

export default function variables(vars: Variables) {
  Object.assign(__cometta_variables__, vars);
}
