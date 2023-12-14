import tenize from '../src';

describe('jss()', () => {
  test('must convert css string to jss', () => {
    const style = tenize.jss(`backgroundColor: #000000; color: #FFFFFF;`);

    expect(style).toEqual({
      backgroundColor: '#000000',
      color: '#FFFFFF',
    });
  });

  test('must resolve variables', () => {
    tenize.variables({
      primary: '#9EA1D4',
    });

    const style = tenize.jss(`color: var(primary)`);

    expect(style).toEqual({
      color: '#9EA1D4',
    });
  });

  test('must resolve px values to numeric', () => {
    const style = tenize.jss(`padding: 4px`);

    expect(style).toEqual({
      padding: 4,
    });
  });

  test('must resolve prop border', () => {
    const style = tenize.jss(`border: 1px solid red`);

    expect(style).toEqual({
      borderWidth: 1,
      borderColor: 'red',
      borderStyle: 'solid',
    });
  });
});
