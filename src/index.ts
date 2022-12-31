import type { IConfigVinicunca } from './entity';

import { VincuncaConfig } from './config';

/**
 * Vinicunca Config
 *
 * @example
 * // unocss.config.ts
 * import { presetUno } from 'unocss'
 * import { defineVinicuncaConfig } from '@vinicunca/unocss-preset'
 *
 * const config = defineVinicuncaConfig()
 * export default defineConfig({
 *   presets: [
 *     presetUno(),
 *     config.getPreset(),
 *   ],
 *
 *  transformers: [
 *   config.getTransformer()
 *  ]
 * })
 */
export function defineVinicuncaConfig(options: IConfigVinicunca = {}) {
  return new VincuncaConfig(options);
}
