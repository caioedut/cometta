import css from '../src/core/css';
import prepare from '../src/core/prepare';

describe('css()', () => {
  test('must convert jss object to css string', () => {
    const style = css({
      backgroundColor: '#000000',
      color: '#FFFFFF',
    });

    expect(style).toEqual('background-color: #000000; color: #FFFFFF;');
  });

  test('must resolve numeric to "px" values', () => {
    const style = css({
      padding: 4,
    });

    expect(style).toEqual('padding: 4px;');
  });

  test('must resolve "Webkit", "Moz" and "O" into kebab-case', () => {
    const style = css({
      WebkitTransition: 'all 4s ease',
      MozTransition: 'all 4s ease',
      OTransition: 'all 4s ease',
    });

    expect(style).toEqual('-webkit-transition: all 4s ease; -moz-transition: all 4s ease; -o-transition: all 4s ease;');
  });
});
