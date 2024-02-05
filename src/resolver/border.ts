export default function border(value: string, prop: string) {
  if (['0', 'none'].includes(value)) {
    return { borderWidth: 0 };
  }

  const valueSplit = value.split(/\s/g).filter((item: string) => item.trim());

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

  const styleIndex = valueSplit.findIndex((item: string) => types.includes(item));
  const borderStyle = styleIndex >= 0 ? valueSplit.splice(styleIndex, 1).shift() : 'solid';

  const sizeIndex = valueSplit.findIndex((item: string) => /^\d\w*$/.test(item));
  const borderWidth = sizeIndex >= 0 ? Number(valueSplit.splice(sizeIndex, 1).shift()?.replace(/\D/g, '') ?? 1) : 1;

  const color = valueSplit?.shift()?.replace(/undefined|null|false|true/g, '');
  const borderColor = color || '#000000';

  return {
    [`${preffix}Width`]: borderWidth,
    [`${preffix}Style`]: borderStyle,
    [`${preffix}Color`]: borderColor,
  };
}
