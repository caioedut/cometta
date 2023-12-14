import { __cometta_aliases__, __cometta_classes__, __cometta_variables__ } from '../constants';

export default function reset() {
  __cometta_classes__.splice(0, __cometta_classes__.length);

  for (const key in __cometta_aliases__) {
    delete __cometta_aliases__[key];
  }

  for (const key in __cometta_variables__) {
    delete __cometta_variables__[key];
  }
}
