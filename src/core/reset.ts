import { __tenize_aliases__, __tenize_classes__, __tenize_variables__ } from '../constants';

export default function reset() {
  __tenize_classes__.splice(0, __tenize_classes__.length);

  for (const key in __tenize_aliases__) {
    delete __tenize_aliases__[key];
  }

  for (const key in __tenize_variables__) {
    delete __tenize_variables__[key];
  }
}
