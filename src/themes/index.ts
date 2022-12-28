import type { InternalThemeDefinition, InternalThemeOptions, ThemeOptions, ThemePreflight, ThemePreset } from './entity.theme';
import type { DeepPartial, Preflight, Rule } from '@unocss/core';
import type { CoreOptions } from '../core';

import { entriesToCss } from '@unocss/core';
import { mergeDeep } from '@vinicunca/js-utilities';

import { DEFAULT_THEME } from './entity.theme';
import { PresetCore } from '../core';
import { createCssSelector } from '../utils/css';
import { colorToInt, generateRGBs } from '../utils/colors';
import { APCAcontrast } from '../utils/apca';

export class Theme extends PresetCore {
  themes: InternalThemeOptions;
  preflights: DeepPartial<ThemePreflight>;
  colorKeys: string[] = [];

  constructor(options: ThemePreset & CoreOptions) {
    super(options.prefix);

    const parsedOptions = this.parseThemeOptions(options?.themes);
    this.themes = this.parseTheme(parsedOptions);
    this.preflights = options?.preflights ?? {};
  }

  getPreflight(): Preflight {
    return {
      layer: 'preflight',
      getCSS: () => {
        const lines: string[] = [];

        lines.push(createCssSelector({
          selector: 'root:',
          content: [
            entriesToCss(Object.entries(this.remapVariables({ tokens: this.preflights }))),
          ],
        }));

        return lines.join('');
      },
    };
  }

  getRules(): Rule[] {
    return [
      this.getVariablesRule(),
    ];
  }

  getColorKeys() {
    return Array.from(new Set(this.colorKeys));
  }

  private parseThemeOptions(options?: ThemeOptions): InternalThemeOptions {
    if (!options) {
      return DEFAULT_THEME as InternalThemeOptions;
    }

    return mergeDeep(
      DEFAULT_THEME,
      { ...options },
    ) as InternalThemeOptions;
  }

  private parseTheme(_themes: InternalThemeOptions) {
    const acc: Record<string, InternalThemeDefinition> = {};

    for (const [name, original] of Object.entries(_themes)) {
      const theme: InternalThemeDefinition = acc[name] = {
        ...original,
        colors: {
          ...original.colors,
        },
      };

      for (const color of Object.keys(theme.colors)) {
        if (/^on-[a-z]/.test(color) || theme.colors[`on-${color}`]) {
          continue;
        }

        const onColor = `on-${color}`;
        const colorValue = colorToInt(theme.colors[color]);

        const blackContrast = Math.abs(APCAcontrast(0, colorValue));
        const whiteContrast = Math.abs(APCAcontrast(0xFFFFFF, colorValue));
        // Prefer white text if both have an acceptable contrast ratio
        theme.colors[onColor] = whiteContrast > Math.min(blackContrast, 50) ? '#fff' : '#000';

        this.colorKeys.push(color);
      }
    }

    return acc;
  }

  private getVariablesRule(): Rule {
    return [
      new RegExp(`^theme-(?<name>${Object.keys(this.themes).join('|')})$`),
      ({ groups }) => {
        if (!groups?.name) {
          return {};
        }

        const themeName = this.themes[groups.name];

        const themeColors = (themeName.colors ?? {}) as Record<string, string>;

        const rgbs = generateRGBs(themeColors);

        return {
          'color-scheme': themeName.dark ? 'dark' : 'light',
          ...this.remapVariables({ tokens: rgbs, key: 'theme-' }),
          ...this.remapVariables({ tokens: themeName.variables }),
        };
      },
      { layer: 'vinicunca' },
    ];
  }
}
