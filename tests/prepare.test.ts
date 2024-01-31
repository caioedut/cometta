import prepare from '../src/core/prepare';
import variables from '../src/core/variables';

describe('prepare()', () => {
  test('must resolve variables', () => {
    variables({
      primary: '#9EA1D4',
    });

    const style = prepare(`color: var(primary)`);

    expect(style).toEqual({
      color: '#9EA1D4',
    });
  });

  test('must resolve "px" to numeric values', () => {
    const style = prepare(`padding: 4px`);

    expect(style).toEqual({
      padding: 4,
    });
  });

  test('must resolve prop border', () => {
    const style = prepare(`border: 1px solid red`);

    expect(style).toEqual({
      borderWidth: 1,
      borderColor: 'red',
      borderStyle: 'solid',
    });
  });
});
