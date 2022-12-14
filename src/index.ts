import type { Preset } from '@unocss/core';

// import { theme } from './theme';
import { rules } from './rules';
// import { shortcuts } from './shortcuts';
// import { variants } from './variants';

/**
 * DueCSS Preset
 *
 * @example
 * // unocss.config.ts
 * import { presetUno } from 'unocss'
 * import { presetVinicunca } from '@vinicunca/unocss-preset'
 *
 * export default defineConfig({
 *   presets: [
 *     presetUno(),
 *     presetVinicunca()
 *   ]
 * })
 */
export function presetVinicunca(): Preset {
  return {
    name: 'unocss-preset-vinicunca',
    layers: {
      vinicunca: -1,
    },
    // theme,
    rules,
    // shortcuts,
    // variants,
  };
}
