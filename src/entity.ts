import type { ButtonOptions } from './components';

export const DEFAULT_PREFIX = 'vin-';

export interface IPresetVinicunca {
  prefix?: string;

  components?: {
    button?: ButtonOptions;
  };
}
