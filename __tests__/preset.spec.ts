import { createGenerator, presetUno } from 'unocss';
import { describe, expect, test } from 'vitest';

import { presetVinicunca } from '../src';

const vinicunca = createGenerator({
  presets: [
    presetUno({
      preflight: false,
    }),
    presetVinicunca({
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
          blackContrast: '#000',
          whiteContrast: '#fff',
          sizes: {
            'x-small': '[--vin-height:20px] text-tiny min-w-[36px] px-2',
            'small': '[--vin-height:28px] text-xs min-w-[50px] px-3',
            'DEFAULT': '[--vin-height:36px] text-[0.875rem] min-w-[64px] px-4',
            'large': '[--vin-height:44px] text-base min-w-[78px] px-5',
            'x-large': '[--vin-height:52px] text-lg min-w-[92px] px-6',
          },
        },
      },
    }),
  ],
});

const baseClasses = [
  'mt-4',
];

const colorClasses = [
  'vin-theme-light',
  'vin-text-primary',
  'vin-bg-error',
];

const elevationClasses = [
  'vin-elevation-2',
  'hover:vin-elevation-4',
];

const buttonClasses = [
  // 'vin-button-[outline]-[large]-[brand-primary]',
  'vin-button',
  // 'vin-button-[brand-primary--outline--large]',
  // 'vin-button-[blue-500]',
  // 'vin-button-[yellow-500--small]',
  // 'vin-button-[red-500--link]',
  // 'vin-button-[x-large]',
  // 'vin-button-[circle]',
  // 'vin-button--large',
  // 'vin-button-blue-500',
  // 'vin-button-outline-red-100',
];

describe('preset-vinicunca', () => {
  test('core', async () => {
    const allClasses = [...baseClasses, ...colorClasses, ...elevationClasses, ...buttonClasses];
    const { css } = await vinicunca.generate(allClasses.join(' '));
    expect(css).toMatchSnapshot();
  });
});
