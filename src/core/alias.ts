import { __tenize_aliases__ } from '../constants';
import { Alias } from '../types';

export default function alias(aliases: Alias) {
  Object.assign(__tenize_aliases__, aliases);
}
