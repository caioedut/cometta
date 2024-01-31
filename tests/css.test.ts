import css from '../src/core/css';

describe('css()', () => {
  test('must convert jss object to css string', () => {
    const style = css({
      backgroundColor: '#000000',
      color: '#FFFFFF',
    });

    expect(style).toEqual(`background-color: #000000; color: #FFFFFF;`);
  });

  test('must resolve numeric to "px" values', () => {
    const style = css({
      padding: 4,
    });

    expect(style).toEqual(`padding: 4px;`);
  });
});
