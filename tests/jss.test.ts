import jss from '../src/core/jss';

describe('jss()', () => {
  test('must convert css string to jss object', () => {
    const style = jss('background-color: #000000; color: #FFFFFF;');

    expect(style).toEqual({
      backgroundColor: '#000000',
      color: '#FFFFFF',
    });
  });

  test('must ignore nested styles', () => {
    const style = jss({
      backgroundColor: 'amber',
      '&:hover': {
        backgroundColor: 'orange',
      },
    });

    expect(style).toEqual({
      backgroundColor: 'amber',
    });
  });
});
