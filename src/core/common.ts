import { __tenize_variables__ } from '../constants';

export default function common(value: any) {
  // Resolve VARS
  if (typeof value === 'string') {
    value = value.replace(/var\((.+)\)+/g, (original: string, varName: string) => {
      return varName in __tenize_variables__ ? (__tenize_variables__[varName] as string) : original;
    });
  }

  return value;
}
