import type { IConfigVinicunca } from './entity';
import type { Preset, Rule, Shortcut, SourceCodeTransformer } from '@unocss/core';

import { Color } from './base/color';
import { Elevation } from './base/elevation';
import { Theme } from './themes';
import { Button } from './components';
import { DEFAULT_PREFIX } from './core';

export class VincuncaConfig {
  private rules: Rule[];
  private shortcuts: Shortcut[];
  private prefix: string;

  private theme: Theme;

  // base
  private color: Color;
  private elevation: Elevation;

  // components
  private button: Button;

  constructor(options: IConfigVinicunca) {
    const { prefix, components, theme } = options;

    this.prefix = prefix ?? DEFAULT_PREFIX;

    this.theme = new Theme({
      prefix: this.prefix,
      ...theme,
    });

    const colorKeys = this.theme.getColorKeys();

    // init base
    this.color = new Color({
      prefix: this.prefix,
      colorKeys,
    });
    this.elevation = new Elevation();

    // init components
    this.button = new Button({
      prefix: this.prefix,
      colorKeys,
      ...components?.button,
    });

    this.rules = this.defineRules();

    this.shortcuts = this.defineShortcuts();
  }

  getPreset(): Preset {
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

  getTransformer(): SourceCodeTransformer {
    return {
      name: 'vinicunca-transformers',
      enforce: 'pre',
      transform: (str) => {
        let content = str.toString();

        content = this.button.transformClass(content);

        str.overwrite(0, str.length(), content);
      },
    };
  }

  private defineRules(): Rule[] {
    return [
      this.theme.getRules(),
      this.color.getRules(),
      this.elevation.getRules(),
      this.button.getRules(),
    ].flat(1);
  }

  private defineShortcuts(): Shortcut[] {
    return [
      ...this.button.getShortcuts(),
    ];
  }
}

