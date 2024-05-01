import prepare from '../src/core/prepare';
import variables from '../src/core/variables';

describe('prepare()', () => {
  test('must resolve variables', () => {
    variables({
      primary: '#9EA1D4',
    });

    const style = prepare('color: var(primary)');

    expect(style).toEqual({
      color: '#9EA1D4',
    });
  });

  test('must resolve "px" to numeric values', () => {
    const style = prepare('padding: 4px');

    expect(style).toEqual({
      padding: 4,
    });
  });

  test('must resolve prop border', () => {
    const style = prepare('border: 1px solid red');

    expect(style).toEqual({
      borderWidth: 1,
      borderColor: 'red',
      borderStyle: 'solid',
    });
  });

  test('must override prop border for single edge', () => {
    const style = prepare('border: 1px solid red; border-left: 0');

    expect(style).toEqual({
      borderWidth: 1,
      borderColor: 'red',
      borderStyle: 'solid',
      borderLeftWidth: 0,
    });
  });

  test('must resolve prefixes "-webkit-", "-moz-" and "-o-" into pascal-case', () => {
    const style = prepare({
      '-webkit-transition': 'all 4s ease',
      '-moz-transition': 'all 4s ease',
      '-o-transition': 'all 4s ease',
    });

    expect(style).toEqual({
      WebkitTransition: 'all 4s ease',
      MozTransition: 'all 4s ease',
      OTransition: 'all 4s ease',
    });
  });
});
