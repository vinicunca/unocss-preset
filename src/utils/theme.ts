import { mergeDeep } from '@vinicunca/js-utilities';

import { APCAcontrast } from './apca';
import { colorToInt } from './colors';

export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

export interface ThemeDefinition {
  dark: boolean;
  colors: Record<string, string>;
  variables: Record<string, string | number>;
}

export interface ThemeOptions {
  defaultTheme: string;
  themes: Record<string, ThemeDefinition>;
}

export const defaultThemeOptions: ThemeOptions = {
  defaultTheme: 'light',
  themes: {
    light: {
      dark: false,
      colors: {},
      variables: {},
    },
  },
};

export function parseThemeOptions(options?: DeepPartial<ThemeOptions>): ThemeOptions {
  if (!options) {
    return defaultThemeOptions;
  }

  return mergeDeep(
    defaultThemeOptions,
    { ...options },
  ) as ThemeOptions;
}

export function parseTheme(_themes: Record<string, ThemeDefinition>) {
  const acc: Record<string, ThemeDefinition> = {};

  for (const [name, original] of Object.entries(_themes)) {
    const theme: ThemeDefinition = acc[name] = {
      ...original,
      colors: {
        ...original.colors,
      },
    };

    for (const color of Object.keys(theme.colors)) {
      const onColor = `on-${color}`;
      const colorValue = colorToInt(theme.colors[color]);

      const blackContrast = Math.abs(APCAcontrast(0, colorValue));
      const whiteContrast = Math.abs(APCAcontrast(0xFFFFFF, colorValue));
      // Prefer white text if both have an acceptable contrast ratio
      theme.colors[onColor] = whiteContrast > Math.min(blackContrast, 50) ? '#fff' : '#000';
    }
  }

  return acc;
}
