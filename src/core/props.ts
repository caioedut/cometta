import { TenizeStyle } from '../types';
import sheet from './sheet';
import jss from './jss';

export default function props(...styles: (TenizeStyle | string)[]) {
  const props: any = {
    style: jss(...styles),
  };

  props.className = sheet(...styles);

  // if (isServer) {
  //   prop = 'style';
  //   value = css(...styles);
  // }

  return props;
}
