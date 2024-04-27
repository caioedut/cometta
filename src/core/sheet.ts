import encrypt from '../encrypt';
import type { ComettaParam } from '../types';
import createStyleSheet from './createStyleSheet';
import css from './css';
import prepare from './prepare';

export default function sheet(...styles: (ComettaParam | ComettaParam[])[]) {
  const resolvedStyle = prepare(...styles);

  const cssClass = resolvedStyle?.__className || `c${encrypt(JSON.stringify(resolvedStyle))}`;

  const cssText = (function nested(selector: string, ...styles: (ComettaParam | ComettaParam[])[]): string {
    const resolvedStyle = prepare(...styles);
    const cssStyle = css(resolvedStyle);

    const cssMediaLines = [];
    const cssStyleLines = cssStyle ? [`${selector} { ${css(resolvedStyle)} }`] : [];

    for (let attr in resolvedStyle) {
      const value = resolvedStyle[attr];

      if (value && typeof value === 'object') {
        // Nested and children
        if (attr.startsWith('&')) {
          attr = attr.substring(1);
          cssStyleLines.push(`${nested(`${selector}${attr}`, value)}`);
        }

        // Media query
        if (attr.startsWith('@media')) {
          cssMediaLines.push(`${attr} {\n${nested(`${selector}`, value)}\n}`);
        }
      }
    }

    return [...cssStyleLines, ...cssMediaLines].join('\n');
  })(`.${cssClass}`, resolvedStyle);

  createStyleSheet(cssText, { uniqueId: cssClass });

  return cssClass;
}
