import type { Rule } from '@unocss/core';
import type { CoreOptions } from '../core';

import { PresetCore } from '../core';

interface ColorOptions {
  colorKeys: string[];
}

export class Color extends PresetCore {
  colorKeys: string[];

  constructor(options: ColorOptions & CoreOptions) {
    super(options.prefix);
    this.colorKeys = options.colorKeys;
  }

  getRules(): Rule[] {
    return [
      this.getTextRule(),
      this.getBgRule(),
    ];
  }

  private getTextRule(): Rule {
    return [
      /^text-(.+)$/,
      ([, body]) => {
        if (!this.colorKeys.includes(body)) {
          return;
        }

        const colorVar = this.genVariable(`theme-${body}`);

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
