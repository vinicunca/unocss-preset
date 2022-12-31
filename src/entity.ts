import type { ButtonOptions } from './components';
import type { ThemePreset } from './themes/entity.theme';

export interface IConfigVinicunca {
  prefix?: string;

  theme?: ThemePreset;

  components?: {
    button?: ButtonOptions;
  };
}
