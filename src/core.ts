import { toKebabCase } from '@vinicunca/js-utilities';

export interface CoreOptions {
  prefix: string;
}

export const DEFAULT_PREFIX = 'vin-';

export class PresetCore {
  prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
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
}
