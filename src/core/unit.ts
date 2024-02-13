import { __cometta_units__ } from '../constants';
import { UnitParser } from '../types';

export default function unit(unit: string, resolver: UnitParser) {
  Object.assign(__cometta_units__, {
    [unit]: resolver,
  });
}
