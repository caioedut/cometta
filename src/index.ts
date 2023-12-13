import jss from './core/jss';
import css from './core/css';
import sheet from './core/sheet';
import alias from './core/alias';
import variables from './core/variables';

const tenize = {
  alias,
  jss,
  css,
  sheet,
  variables,
};

tenize.alias({
  f: 'flex',
});

tenize.variables({
  primary: '#f063f1',
});

console.log(
  tenize.css(
    {
      bg: 'blue',
      color: 'var(primary)',
    },
    {
      bg: 'red',
    },
  ),
);

export default tenize;
