import { Falsy, ComettaStyle } from '../types';
import nativeProps from '../resolver/nativeProps';
import aliasProps from '../resolver/aliasProps';
import { __cometta_aliases__, __cometta_variables__ } from '../constants';

export default function jss(...styles: (ComettaStyle | string | Falsy)[]) {
  let result: ComettaStyle = {};

  for (let currentStyles of styles) {
    if (!currentStyles) {
      continue;
    }

    if (typeof currentStyles === 'string') {
      const rules = currentStyles
        .split(';')
        .filter((item) => item.trim())
        .map((item) => {
          const split = item.split(':');
          const attr = (split.shift() ?? '').trim();
          const value = split.join(':').trim();

          return [attr, value] as const;
        });

      currentStyles = Object.fromEntries(rules);
    }

    if (typeof currentStyles === 'object' && currentStyles) {
      for (let attr in currentStyles) {
        let prop: string | null = attr;
        let value = currentStyles[prop];

        // recursive object jss
        if (typeof value === 'object' && value) {
          result[prop] = jss(value);
          continue;
        }

        // Parse to camel-case
        prop = prop.replace(/([\-_]\w)/g, (k) => k[1]?.toUpperCase() ?? '');

        // extract alias
        prop = __cometta_aliases__[prop] ?? prop;
        // @ts-expect-error
        prop = aliasProps[prop] ?? prop;
        // @ts-expect-error
        prop = nativeProps[prop] ?? prop;

        if (!prop) {
          continue;
        }

        // Resolve VARS
        if (typeof value === 'string') {
          value = value.replace(/var\(([\w\-\_]+)\)+/g, (original: string, varName: string) => {
            return varName in __cometta_variables__ ? (__cometta_variables__[varName] as string) : original;
          });
        }

        if (typeof value === 'string' && /^-?[\d.]+px$/.test(value)) {
          value = Number(value.replace(/px$/, ''));
        }

        if (['border', 'borderTop', 'borderBottom', 'borderLeft', 'borderRight'].includes(prop)) {
          if (value) {
            const preffix = prop;
            const types = [
              'none',
              'hidden',
              'dotted',
              'dashed',
              'solid',
              'double',
              'groove',
              'ridge',
              'inset',
              'outset',
              'initial',
              'inherit',
            ];

            const valueTrim = `${value ?? ''}`.trim();
            const valueSplit = valueTrim.split(/\s/g).filter((item: string) => item.trim());

            const styleIndex = valueSplit.findIndex((item: string) => types.includes(item));
            const borderStyle = styleIndex >= 0 ? valueSplit.splice(styleIndex, 1).shift() : 'solid';

            const sizeIndex = valueSplit.findIndex((item: string) => /^\d\w*$/.test(item));
            const borderWidth =
              sizeIndex >= 0 ? Number(valueSplit.splice(sizeIndex, 1).shift()?.replace(/\D/g, '') ?? 1) : 1;

            const color = valueSplit?.shift()?.replace(/undefined|null|false|true/g, '');
            const borderColor = color || '#000000';

            Object.assign(result, {
              [`${preffix}Width`]: borderWidth,
              [`${preffix}Style`]: borderStyle,
              [`${preffix}Color`]: borderColor,
            });

            prop = null;
          }
        }

        if (prop) {
          result[prop] = value;
        }
      }
    }
  }

  return result;
}
