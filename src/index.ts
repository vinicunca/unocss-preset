import type { Preset } from '@unocss/core';
import type { IPresetVinicunca } from './entity';

import { PresetVinicunca } from './preset';

/**
 * Vinicunca Preset
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
export function presetVinicunca(options: IPresetVinicunca = {}): Preset {
  const preset = new PresetVinicunca(options);

  return preset.getPresetConfigs();
}
