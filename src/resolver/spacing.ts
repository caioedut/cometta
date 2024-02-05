const parseUnit = (value: any) => {
  return isNaN(value) ? value : Number(value);
};

export default function spacing(value: string, prop: string) {
  const valueSplit = value.split(/\s/g).filter((item: string) => item.trim());

  const [v1, v2, v3, v4] = valueSplit;

  if (valueSplit.length === 1) {
    return { [prop]: parseUnit(v1) };
  }

  return {
    [`${prop}Top`]: parseUnit(v1),
    [`${prop}Right`]: parseUnit(v2 ?? v1),
    [`${prop}Bottom`]: parseUnit(v3 ?? v1),
    [`${prop}Left`]: parseUnit(v4 ?? v2 ?? v1),
  };
}
