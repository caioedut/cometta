import jss from './core/jss';
import css from './core/css';
import sheet from './core/sheet';
import alias from './core/alias';
import variables from './core/variables';
import create from './core/create';

const cometta = {
  alias,
  jss,
  css,
  create,
  sheet,
  variables,
};

cometta.alias({
  f: 'flex',
});

cometta.variables({
  primary: '#f063f1',
});

// console.log(
//   cometta.jss({
//     borderTop: '1px solid red',
//     borderLeft: 'solid red 1px',
//     borderRight: 'red 1px solid',
//     borderBottom: 'red solid 1px',
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
