import {
  __cometta_aliases__,
  __cometta_elements__,
  __cometta_parsers__,
  __cometta_units__,
  __cometta_variables__,
} from '../constants';

export default function reset() {
  for (const key in __cometta_aliases__) {
    delete __cometta_aliases__[key];
  }

  for (const key in __cometta_variables__) {
    delete __cometta_variables__[key];
  }

  for (const key in __cometta_parsers__) {
    delete __cometta_parsers__[key];
  }

  for (const key in __cometta_units__) {
    delete __cometta_units__[key];
  }

  for (const key in __cometta_elements__) {
    if (typeof document !== 'undefined') {
      __cometta_elements__[key]?.remove?.();
    }

    delete __cometta_elements__[key];
  }
}
