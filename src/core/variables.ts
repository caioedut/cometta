import { Variables } from '../types';
import { __tenize_variables__ } from '../constants';

export default function variables(vars: Variables) {
  Object.assign(__tenize_variables__, vars);
}
