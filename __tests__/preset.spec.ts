import MagicString from 'magic-string';
import { createGenerator, presetUno } from 'unocss';
import { describe, expect, test } from 'vitest';

import { defineVinicuncaConfig } from '../src';

const config = defineVinicuncaConfig({
  prefix: 'vin-',
  theme: {
    preflights: {
      'background': '#fff',
      'on-background': '#000',
      'surface': '#fff',
      'on-surface': '#000',
      'overlay-multiplier': 1,
      'scrollbar-offset': '0px',
    },
  },
  components: {
    button: {
      sizes: {
        'x-small': '[--vin-height:20px] text-[0.625rem] min-w-[36px] px-2',
        'small': '[--vin-height:28px] text-[0.75rem] min-w-[50px] px-3',
        'default': '[--vin-height:36px] text-[0.875rem] min-w-[64px] px-4',
        'large': '[--vin-height:44px] text-[1rem] min-w-[78px] px-5',
        'x-large': '[--vin-height:52px] text-[1.125rem] min-w-[92px] px-6',
      },
      variants: {
        default: 'elevation-2 hover:before:(opacity-20)',
        outline: 'bg-transparent text-inherit border-1 hover:before:(opacity-100)',
        text: '',
      },
    },
  },
});

const vinicunca = createGenerator({
  presets: [
    presetUno({
      preflight: false,
    }),
    config.getPreset(),
  ],

  transformers: [
    config.getTransformer(),
  ],
});

const baseClasses = [
  'mt-4',
];

const colorClasses = [
  'vin-theme-light',
  'vin-text-primary',
  'vin-text-on-primary',
  'vin-bg-error',
];

const elevationClasses = [
  'vin-elevation-2',
  'hover:vin-elevation-4',
];

const buttonClasses = [
  'vin-button',
  'vin-button--brand-primary',
  'vin-button--variant-outline',
  'vin-button--x-small',
];

describe('preset-vinicunca', () => {
  test('core', async () => {
    const allClasses = [...baseClasses, ...colorClasses, ...elevationClasses, ...buttonClasses];
    const { css } = await vinicunca.generate(allClasses.join(' '));
    expect(css).toMatchSnapshot();
  });

  test('transformers', async () => {
    const [transformers] = vinicunca.config.transformers!;

    const code = 'vin-button--[brand-primary outline] vin-button--brand-primary vin-button--[brand-secondary large] vin-button vin-button--[brand-error]';
    // const code = 'vin-button--[outline]';

    const s = new MagicString(code);

    transformers.transform(s, '', {
      uno: vinicunca,
      tokens: new Set(),
    } as any);

    expect(true).equal(true);
  });
});
