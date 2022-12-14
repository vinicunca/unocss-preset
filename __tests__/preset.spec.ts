import { createGenerator, presetUno } from 'unocss';
import { describe, expect, test } from 'vitest';

import { presetVinicunca } from '../src';

const vinicunca = createGenerator({
  presets: [
    presetUno({
      preflight: false,
    }),
    presetVinicunca(),
  ],
});

const classes = [
  'bg-red-500',
  'v-button-blue-500',
];

describe('preset-vinicunca', () => {
  test('core', async () => {
    const { css } = await vinicunca.generate(classes.join(' '));
    expect(css).toMatchSnapshot();
  });
});
