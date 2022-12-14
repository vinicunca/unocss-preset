import type { CSSObject, Rule } from '@unocss/core';

import { colorOpacityToString, colorToString, parseColor } from '@unocss/preset-mini/utils';

export const button: Rule[] = [
  [
    /^v-button-(.+)$/,
    ([_, body], { theme }) => {
      const parsed = parseColor(body, theme);

      if (!parsed) {
        return;
      }
      console.log('🚀 ~ parsed', parsed);

      const { cssColor } = parsed;

      const css: CSSObject = {};

      if (cssColor) {
        css['--un-bg-opacity'] = colorOpacityToString(cssColor);
        css['background-color'] = colorToString(cssColor, 'var(--un-bg-opacity)');
      }

      return css;
    },
  ],
];
