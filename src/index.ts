import jss from './core/jss';
import css from './core/css';
import sheet from './core/sheet';
import alias from './core/alias';
import variables from './core/variables';
import create from './core/create';
import normalize from './core/normalize';
import polyfill from './core/polyfill';
import parser from './core/parser';
import unit from './core/unit';
import createStyleSheet from './core/createStyleSheet';

const cometta = {
  jss,
  css,
  create,
  sheet,
  alias,
  parser,
  unit,
  variables,
  normalize,
  polyfill,
  createStyleSheet,
};

export { jss, css, create, sheet, alias, parser, unit, variables, normalize, polyfill, createStyleSheet };

export * from './types';

export default cometta;
