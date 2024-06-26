import { __cometta_parsers__ } from '../constants';
import type { Parser } from '../types';

export default function parser(prop: '*' | string, resolver: Parser) {
  Object.assign(__cometta_parsers__, {
    [prop]: resolver,
  });
}
