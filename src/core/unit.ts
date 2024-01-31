import { UnitParser } from '../types';
import { __cometta_units__ } from '../constants';

export default function unit(unit: string, resolver: UnitParser) {
  Object.assign(__cometta_units__, {
    [unit]: resolver,
  });
}
