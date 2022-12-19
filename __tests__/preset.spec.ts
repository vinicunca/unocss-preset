import { createGenerator, presetUno } from 'unocss';
import { describe, expect, test } from 'vitest';

import { presetVinicunca } from '../src';

const vinicunca = createGenerator({
  presets: [
    presetUno({
      preflight: false,
    }),
    presetVinicunca({
      components: {
        button: {
          blackContrast: '#000',
          whiteContrast: '#fff',
          sizes: {
            'x-small': '[--vin-height:20px] text-tiny min-w-[36px] px-2',
            'small': '[--vin-height:28px] text-xs min-w-[50px] px-3',
            'large': '[--vin-height:44px] text-base min-w-[78px] px-5',
            'x-large': '[--vin-height:52px] text-lg min-w-[92px] px-6',
          },
        },
      },
    }),
  ],
});

const classes = [
  'mt-4',
  'vin-button',
  'vin-button--large',
  'vin-button-blue-500',
  'vin-button-outline-red-100',
];

describe('preset-vinicunca', () => {
  test('core', async () => {
    const { css } = await vinicunca.generate(classes.join(' '));
    expect(css).toMatchSnapshot();
  });
});
