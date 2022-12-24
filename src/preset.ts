import type { IPresetVinicunca } from './entity';
import type { Preset, Rule, Shortcut } from '@unocss/core';

import { Theme } from './themes';
import { Button } from './components';
import { DEFAULT_PREFIX, PresetPrefix } from './prefix';

export class PresetVinicunca extends PresetPrefix {
  rules: Rule[];
  shortcuts: Shortcut[];

  theme: Theme;

  // components
  button: Button;

  constructor(options: IPresetVinicunca) {
    const { prefix, components, theme } = options;

    super(prefix ?? DEFAULT_PREFIX);

    this.theme = new Theme({
      prefix: this.prefix,
      ...theme,
    });

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
        vinicunca: -1,
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

