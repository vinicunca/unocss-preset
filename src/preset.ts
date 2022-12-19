import type { IPresetVinicunca } from './entity';
import type { Rule, Shortcut } from '@unocss/core';

import { DEFAULT_PREFIX } from './entity';
import { Button } from './components';
import { PresetPrefix } from './prefix';

export class PresetVinicunca extends PresetPrefix {
  options: IPresetVinicunca;
  rules: Rule[];
  shortcuts: Shortcut[];

  // components
  button: Button;

  constructor(options: IPresetVinicunca) {
    super(options.prefix ?? DEFAULT_PREFIX);

    this.options = options;

    // init components
    this.button = new Button({
      prefix: this.prefix,
      ...options.components?.button,
    });

    this.rules = this.defineRules();

    this.shortcuts = this.defineShortcuts();
  }

  private defineRules(): Rule[] {
    return [
      this.button.getRules(),
    ].flat(1);
  }

  private defineShortcuts(): Shortcut[] {
    return [
      ...this.button.getShortcuts(),
    ];
  }

  getPresetConfigs() {
    return {
      name: 'unocss-preset-vinicunca',
      layers: {
        vinicunca: -1,
        variants: 1,
      },
      prefix: this.prefix,
      rules: this.rules,
      shortcuts: this.shortcuts,
    };
  }
}

