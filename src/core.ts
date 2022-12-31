import { toKebabCase } from '@vinicunca/js-utilities';

export interface CoreOptions {
  prefix?: string;
  colorKeys?: string[];
}

export const DEFAULT_PREFIX = 'vin-';

export class PresetCore {
  prefix: string;
  colorKeys: string[];

  constructor(options: CoreOptions) {
    this.prefix = options.prefix ?? '';
    this.colorKeys = options.colorKeys ?? [];
  }

  genVariable(key = '') {
    return `--${this.prefix}${key}`;
  }

  remapVariables({ tokens, key = '' }: { tokens: Record<string, string | number>; key?: string }) {
    return Object.keys(tokens).reduce<any>((prev, acc) => {
      const _key = `${this.genVariable(key)}${toKebabCase(acc)}`;
      prev[_key] = tokens[acc];
      return prev;
    }, {});
  }

  getColorKeys() {
    return Array.from(new Set(this.colorKeys));
  }
}
