import tenize from '../src';

describe('css()', () => {
  test('must convert jss to css string', () => {
    const style = tenize.css({
      backgroundColor: '#000000',
      color: '#FFFFFF',
    });

    expect(style).toEqual(`background-color: #000000; color: #FFFFFF;`);
  });

  test('must resolve variables', () => {
    tenize.variables({
      primary: '#9EA1D4',
    });

    const style = tenize.css({
      color: 'var(primary)',
    });

    expect(style).toEqual(`color: #9EA1D4;`);
  });

  test('must resolve numeric values to px', () => {
    const style = tenize.css({
      padding: 4,
    });

    expect(style).toEqual(`padding: 4px;`);
  });
});
