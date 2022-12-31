import type { DeepPartial } from '@unocss/core';

/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
interface Colors extends BaseColors, OnColors {
  [key: string]: string;
}

interface BaseColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface OnColors {
  'on-background': string;
  'on-surface': string;
  'on-primary': string;
  'on-secondary': string;
  'on-success': string;
  'on-warning': string;
  'on-error': string;
  'on-info': string;
}

export interface InternalThemeDefinition {
  dark: boolean;
  colors: Colors;
  variables: Record<string, string | number>;
}

type ThemeDefinition = DeepPartial<InternalThemeDefinition>;

export type ThemeOptions = Record<string, ThemeDefinition>;
export type InternalThemeOptions = Record<string, InternalThemeDefinition>;

export const DEFAULT_THEME: ThemeOptions = {
  light: {
    dark: false,
    colors: {
      'background': '#FFFFFF',
      'invert': '#000000',
      'surface': '#FFFFFF',
      'surface-variant': '#424242',
      'on-surface-variant': '#EEEEEE',
      'primary': '#1976D2',
      'secondary': '#9c27b0',
      'error': '#d32f2f',
      'info': '#0288d1',
      'success': '#2e7d32',
      'warning': '#ed6c02',
    },
    variables: {
      'border-color': '#000000',
      'border-opacity': 0.12,
      'high-emphasis-opacity': 0.87,
      'medium-emphasis-opacity': 0.60,
      'disabled-opacity': 0.38,
      'idle-opacity': 0.04,
      'hover-opacity': 0.04,
      'focus-opacity': 0.12,
      'selected-opacity': 0.08,
      'activated-opacity': 0.12,
      'pressed-opacity': 0.12,
      'dragged-opacity': 0.08,
    },
  },
  dark: {
    dark: true,
    colors: {
      'background': '#121212',
      'invert': '#FFFFFF',
      'surface': '#212121',
      'surface-variant': '#BDBDBD',
      'on-surface-variant': '#424242',
      'primary': '#1565C0',
      'secondary': '#7b1fa2',
      'error': '#c62828',
      'info': '#01579b',
      'success': '#1b5e20',
      'warning': '#e65100',
    },
    variables: {
      'border-color': '#FFFFFF',
      'border-opacity': 0.12,
      'high-emphasis-opacity': 0.87,
      'medium-emphasis-opacity': 0.60,
      'disabled-opacity': 0.38,
      'idle-opacity': 0.10,
      'hover-opacity': 0.04,
      'focus-opacity': 0.12,
      'selected-opacity': 0.08,
      'activated-opacity': 0.12,
      'pressed-opacity': 0.16,
      'dragged-opacity': 0.08,
    },
  },
};

export interface ThemePreflight {
  background: string;
  'on-background': string;
  surface: string;
  'on-surface': string;
  'overlay-multiplier': number;
  'scrollbar-offset': string;
}

export interface ThemePreset {
  themes?: ThemeOptions;
  preflights?: DeepPartial<ThemePreflight>;
}
