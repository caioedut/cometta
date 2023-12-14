import jss from './core/jss';
import css from './core/css';
import sheet from './core/sheet';
import alias from './core/alias';
import variables from './core/variables';
import create from './core/create';
import normalize from './core/normalize';

const cometta = {
  alias,
  jss,
  css,
  create,
  sheet,
  variables,
  normalize,
};

// cometta.alias({
//   f: 'flex',
// });
//
// cometta.variables({
//   primary: '#f063f1',
// });

// console.log(
//   cometta.css({
//     padding: '15px 10px 5px 5px',
//   }),
// );

// console.log(
//   cometta.css(
//     {
//       bg: 'blue',
//       color: 'var(primary)',
//     },
//     {
//       bg: 'red',
//     },
//   ),
// );

export default cometta;
