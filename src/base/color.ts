import type { Rule } from '@unocss/core';
import type { CoreOptions } from '../core';

import { PresetCore } from '../core';

export class Color extends PresetCore {
  constructor(options: CoreOptions) {
    super(options);
  }

  getRules(): Rule[] {
    return [
      this.getTextRule(),
      this.getBgRule(),
    ];
  }

  private getTextRule(): Rule {
    return [
      /^text-(?<body>(?:on-)?(?<color>.+))/,
      ({ groups }) => {
        const { body, color } = groups!;

        if (!this.getColorKeys().includes(color)) {
          return;
        }

        const colorBody = /^on-[a-z]/.test(body) ? `on-${color}` : color;
        const colorVar = this.genVariable(`theme-${colorBody}`);

        return {
          '--un-color-opacity': 1,
          'color': `rgba(var(${colorVar}), var(--un-color-opacity))`,
        };
      },
      { layer: 'vinicunca' },
    ];
  }

  private getBgRule(): Rule {
    return [
      /^bg-(.+)$/,
      ([, body]) => {
        if (!this.colorKeys.includes(body)) {
          return;
        }

        const bgColorVar = this.genVariable(`theme-${body}`);
        const colorVar = this.genVariable(`theme-on-${body}`);

        return {
          '--un-color-opacity': 1,
          '--un-bg-opacity': 1,
          'background-color': `rgba(var(${bgColorVar}),var(--un-bg-opacity))`,
          'color': `rgba(var(${colorVar}), var(--un-color-opacity))`,
        };
      },
      { layer: 'vinicunca' },
    ];
  }
}
