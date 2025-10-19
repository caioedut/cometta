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

  test('must resolve prop outline', () => {
    const style = prepare('outline: 1px solid red');

    expect(style).toEqual({
      outlineWidth: 1,
      outlineColor: 'red',
      outlineStyle: 'solid',
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

  test('must resolve 2-value margin to each prop', () => {
    const style = prepare('margin: 10px 20px');

    expect(style).toEqual({
      marginTop: 10,
      marginRight: 20,
      marginBottom: 10,
      marginLeft: 20,
    });
  });

  test('must resolve 3-value margin to each prop', () => {
    const style = prepare('margin: 10px 20px 30px');

    expect(style).toEqual({
      marginTop: 10,
      marginRight: 20,
      marginBottom: 30,
      marginLeft: 20,
    });
  });

  test('must resolve 4-value margin to each prop', () => {
    const style = prepare('margin: 10px 20px 30px 40px');

    expect(style).toEqual({
      marginTop: 10,
      marginRight: 20,
      marginBottom: 30,
      marginLeft: 40,
    });
  });

  test('must resolve 2-value padding to each prop', () => {
    const style = prepare('padding: 10px 20px');

    expect(style).toEqual({
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 10,
      paddingLeft: 20,
    });
  });

  test('must resolve 3-value padding to each prop', () => {
    const style = prepare('padding: 10px 20px 30px');

    expect(style).toEqual({
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 30,
      paddingLeft: 20,
    });
  });

  test('must resolve 4-value padding to each prop', () => {
    const style = prepare('padding: 10px 20px 30px 40px');

    expect(style).toEqual({
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 30,
      paddingLeft: 40,
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
