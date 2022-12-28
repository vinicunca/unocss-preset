import type { IPresetVinicunca } from './entity';
import type { Preset, Rule, Shortcut } from '@unocss/core';

import { Color } from './base/color';
import { Elevation } from './base/elevation';
import { Theme } from './themes';
import { Button } from './components';
import { DEFAULT_PREFIX, PresetCore } from './core';

export class PresetVinicunca extends PresetCore {
  rules: Rule[];
  shortcuts: Shortcut[];

  theme: Theme;

  // base
  color: Color;
  elevation: Elevation;

  // components
  button: Button;

  constructor(options: IPresetVinicunca) {
    const { prefix, components, theme } = options;

    super(prefix ?? DEFAULT_PREFIX);

    this.theme = new Theme({
      prefix: this.prefix,
      ...theme,
    });

    // init base
    this.color = new Color({
      prefix: this.prefix,
      colorKeys: this.theme.getColorKeys(),
    });
    this.elevation = new Elevation();

    // init components
    this.button = new Button({
      prefix: this.prefix,
      ...components?.button,
    });

    this.rules = this.defineRules();

    this.shortcuts = this.defineShortcuts();
  }

  private defineRules(): Rule[] {
    return [
      this.color.getRules(),
      this.elevation.getRules(),
      this.button.getRules(),
      this.theme.getRules(),
    ].flat(1);
  }

  private defineShortcuts(): Shortcut[] {
    return [
      ...this.button.getShortcuts(),
    ];
  }

  getPresetConfigs(): Preset {
    return {
      name: 'unocss-preset-vinicunca',
      layers: {
        vinicunca: -2,
        preflight: -1,
        default: 0,
        variants: 1,
      },
      prefix: this.prefix,
      preflights: [
        this.theme.getPreflight(),
      ],
      rules: this.rules,
      shortcuts: this.shortcuts,
    };
  }
}

