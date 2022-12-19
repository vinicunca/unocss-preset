import type { Preset, UserConfig } from '@unocss/core';

import { PRESET_NAME } from './entity';

export function getPrefix(userConfig: UserConfig) {
  const vinicuncaPreset = userConfig.presets?.find((preset) => {
    if (Array.isArray(preset)) {
      return undefined;
    }

    return preset.name === PRESET_NAME;
  }) as Preset;

  return vinicuncaPreset?.prefix ?? '';
}
