import { __cometta_variables__ } from '../constants';
import type { Variables } from '../types';
import createStyleSheet from './createStyleSheet';

export default function variables(vars: Variables) {
  Object.assign(__cometta_variables__, vars);

  const cssVars = Object.entries(__cometta_variables__).map(([name, value]) => {
    // Double hyphen
    if (name.substring(0, 2) !== '--') name = `-${name}`;
    if (name.substring(0, 2) !== '--') name = `-${name}`;

    return `${name}: ${value};`;
  });

  const styles = `:root { ${cssVars.join(' ')} }`;

  createStyleSheet(styles, {
    uniqueId: 'cometta-variables',
    prepend: true,
  });
}
