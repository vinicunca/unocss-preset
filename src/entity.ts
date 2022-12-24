import type { ButtonOptions } from './components';
import type { ThemePreset } from './themes/entity.theme';

export interface IPresetVinicunca {
  prefix?: string;

  theme?: ThemePreset;

  components?: {
    button?: ButtonOptions;
  };
}
