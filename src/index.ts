import alias from './core/alias';
import create from './core/create';
import createStyleSheet from './core/createStyleSheet';
import css from './core/css';
import jss from './core/jss';
import normalize from './core/normalize';
import parser from './core/parser';
import polyfill from './core/polyfill';
import sheet from './core/sheet';
import unit from './core/unit';
import variables from './core/variables';

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
