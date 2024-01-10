import jss from './core/jss';
import css from './core/css';
import sheet from './core/sheet';
import alias from './core/alias';
import variables from './core/variables';
import create from './core/create';
import normalize from './core/normalize';
import polyfill from './core/polyfill';
import parser from './core/parser';

const cometta = {
  jss,
  css,
  create,
  sheet,
  alias: (...args: Parameters<typeof alias>) => {
    alias(...args);
    return cometta;
  },
  parser: (...args: Parameters<typeof parser>) => {
    parser(...args);
    return cometta;
  },
  variables: (...args: Parameters<typeof variables>) => {
    variables(...args);
    return cometta;
  },
  normalize: (...args: Parameters<typeof normalize>) => {
    normalize(...args);
    return cometta;
  },
  polyfill: (...args: Parameters<typeof polyfill>) => {
    polyfill(...args);
    return cometta;
  },
};

export default cometta;
