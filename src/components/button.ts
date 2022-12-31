import type { Rule, Shortcut } from '@unocss/core';
import type { CoreOptions } from '../core';

import { PresetCore } from '../core';

export interface ButtonOptions {
  sizes?: Record<string, string>;
  variants?: Record<string, string>;
}

export class Button extends PresetCore {
  sizes: Record<string, string>;
  variants: Record<string, string>;

  constructor(options: ButtonOptions & CoreOptions) {
    super(options);

    this.sizes = options.sizes ?? {};
    this.variants = options.variants ?? {};
  }

  transformClass(content: string): string {
    const reSize = new RegExp(`(${Object.keys(this.sizes).join('|')})`);

    return content.replace(
      new RegExp(`(${this.prefix}button)(?:--\\[((?:[\\w\\s-])+?)\\])`, 'gm'),
      (_from, pre: string, props = '') => {
        const results: string[] = [];

        const [size] = props.match(reSize) ?? [];
        const [variant] = props.match(/outline|text|circle/) ?? [];
        const [, color] = props.match(/brand-(\w+)/) ?? [];

        results.push(pre + `--size-${size ?? 'default'}`);

        const variants = variant ?? 'default';
        results.push(pre + `--variant-${variants}`);

        const hasVariants = variants !== 'default';

        if (color) {
          if (hasVariants) {
            results.push(`${this.prefix}text-${color}`);
            results.push(`hover:${this.prefix}text-on-${color}`);
            results.push(`hover:before:${this.prefix}bg-${color}`);
          } else {
            results.push(`${this.prefix}bg-${color}`);
          }
        } else if (hasVariants) {
          results.push(`hover:${this.prefix}text-on-invert`);
          results.push(`hover:before:${this.prefix}bg-invert`);
        }

        return results.join(' ');
      },
    );
  }

  getRules(): Rule[] {
    return [
    ];
  }

  getShortcuts(): Shortcut[] {
    return [
      [
        /^button$/,
        () => {
          const size = this.sizes.default ?? '';
          const variant = this.variants.default ?? '';

          return `${size} ${variant}`;
        },
        { layer: 'vinicunca' },
      ],
      [
        new RegExp(`^button--size-(?<size>${Object.keys(this.sizes).join('|')})?$`),
        ({ groups }) => {
          const size = groups?.size || 'default';
          return this.sizes[size] ?? '';
        },
        { layer: 'vinicunca' },
      ],
      [
        new RegExp(`^button--variant-(?<variant>${Object.keys(this.variants).join('|')})?$`),
        ({ groups }) => {
          const variant = groups?.variant || 'elevated';
          return this.variants[variant] ?? '';
        },
        { layer: 'variants' },
      ],
    ];
  }
}
