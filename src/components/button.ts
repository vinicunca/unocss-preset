import type { CSSObject, ParsedColorValue, Rule, Shortcut, VariantMatchedResult } from '@unocss/core';
import type { PrefixOptions } from '../prefix';

import { TinyColor } from '@ctrl/tinycolor';
import { colorOpacityToString, colorToString, parseColor } from '@unocss/preset-mini/utils';
import { calcAPCA } from 'apca-w3';

import { PresetPrefix } from '../prefix';

export const DEFAULT_WHITE_CONTRAST = '#fff';
export const DEFAULT_BLACK_CONTRAST = '#000';

export interface ButtonOptions {
  blackContrast?: string;
  whiteContrast?: string;
  sizes?: Record<string, string>;
}

export class Button extends PresetPrefix {
  private whiteContrast: string;
  private blackContrast: string;
  private sizes: Record<string, string>;

  constructor(options: ButtonOptions & PrefixOptions) {
    super(options.prefix);
    this.prefix = options.prefix;

    this.whiteContrast = options.whiteContrast ?? DEFAULT_WHITE_CONTRAST;
    this.blackContrast = options.blackContrast ?? DEFAULT_BLACK_CONTRAST;
    this.sizes = options.sizes ?? {};
  }

  getRules(): Rule[] {
    return [
      this.getColorsRule(),
    ];
  }

  private getVariable(key = '') {
    return `--${this.prefix}${key}color`;
  }

  private getColorsRule(): Rule {
    return [
      /^button(?:-(?<variants>(?:outline|plain)))?(?:-(?<colors>.+))?$/,
      ({ groups }, { theme, variantMatch }) => {
        const { colors = '', variants } = groups!;
        const parsed = parseColor(colors, theme);

        const css: CSSObject = {
          [this.getVariable('border-')]: this.whiteContrast,
        };

        if (!parsed) {
          return css;
        }

        const { color, cssColor } = parsed;

        if (cssColor) {
          const isDark = this.hasDark(variantMatch);
          const tinyColor = new TinyColor(color);

          const activeBgColor = isDark
            ? tinyColor.tint(20).toString()
            : this.darken(tinyColor, 20);

          if (variants === 'outline') {
            css[this.getVariable()] = color;
            css[this.getVariable('border-')] = color;
            css[this.getVariable('hover-')] = '#fff';
            css[this.getVariable('hover-bg-')] = color;
            css[this.getVariable('hover-border-')] = color;
            css[this.getVariable('active-')] = '#fff';
            css[this.getVariable('active-bg-')] = activeBgColor;
            css[this.getVariable('active-border-')] = activeBgColor;
            css[this.getVariable('disable-')] = tinyColor.tint(50).toString();
            css[this.getVariable('disable-border-')] = tinyColor.tint(80).toString();
          } else {
            const hoverBgColor = isDark
              ? this.darken(tinyColor, 30)
              : tinyColor.tint(30).toString();

            const disabledColor = isDark
              ? this.darken(tinyColor, 50)
              : tinyColor.tint(50).toString();

            const textColor = this.getTextColor(parsed);

            css['--un-bg-opacity'] = colorOpacityToString(cssColor);
            css[this.getVariable()] = textColor;
            css[this.getVariable('bg-')] = colorToString(cssColor, 'var(--un-bg-opacity)');
            css[this.getVariable('border-')] = color;
            css[this.getVariable('hover-')] = '#fff';
            css[this.getVariable('hover-bg-')] = hoverBgColor;
            css[this.getVariable('hover-border-')] = hoverBgColor;
            css[this.getVariable('active-bg-')] = activeBgColor;
            css[this.getVariable('active-border-')] = activeBgColor;
            css[this.getVariable('disable-')] = textColor;
            css[this.getVariable('disable-bg-')] = disabledColor;
            css[this.getVariable('disable-border-')] = disabledColor;
          }
        }

        return css;
      },
      { layer: 'vinicunca' },
    ];
  }

  getShortcuts(): Shortcut[] {
    return [
      this.getSizesShortcut(),
    ];
  }

  private getSizesShortcut(): Shortcut {
    return [
      new RegExp(`^button--(?<size>${Object.keys(this.sizes).join('|')})$`),
      ({ groups }) => {
        if (groups?.size) {
          return this.sizes[groups.size];
        }

        return '';
      },
      { layer: 'variants' },
    ];
  }

  private darken(color: TinyColor, amount = 20) {
    return color.mix('#141414', amount).toString();
  }

  private getTextColor(parsed: ParsedColorValue) {
    const colorValue = colorToString(parsed.cssColor!, parsed.alpha ?? 1);
    const blackContrast = Math.abs(calcAPCA(0, colorValue) as number);
    const whiteContrast = Math.abs(calcAPCA(0xFFFFFF, colorValue) as number);

    return whiteContrast > Math.min(blackContrast, 50) ? this.whiteContrast : this.blackContrast;
  }

  private hasDark(variantMatch: VariantMatchedResult) {
    const [,,, matches] = variantMatch;
    const [variant] = matches;
    return variant?.name === 'dark';
  }
}
