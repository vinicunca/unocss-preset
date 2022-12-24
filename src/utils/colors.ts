import { parseColor } from '@unocss/preset-mini';
import { toCamelCase } from '@vinicunca/js-utilities';

export function generateRGBs(colors: Record<string, string>) {
  const theme: any = {};

  for (const color of Object.keys(colors as object)) {
    let colorKey = color;

    if (/^on-[a-z]/.test(color)) {
      colorKey = toCamelCase(color);
    }

    const data = parseColor(color, {
      colors: {
        [colorKey]: colors[color],
      },
    });

    if (data?.cssColor?.components) {
      const colorValue = data.cssColor.components.join(',');
      theme[color] = colorValue;
    }
  }

  return theme;
}

type Color = string | number | {};

export function colorToInt(color: Color): number {
  let rgb;

  if (typeof color === 'number') {
    rgb = color;
  } else if (typeof color === 'string') {
    let c = color.startsWith('#') ? color.substring(1) : color;
    if (c.length === 3) {
      c = c.split('').map((char) => char + char).join('');
    }
    if (c.length !== 6 && c.length !== 8) {
      console.warn(`'${color}' is not a valid rgb color`);
    }
    rgb = parseInt(c, 16);
  } else {
    throw new TypeError(`Colors can only be numbers or strings, recieved ${color == null ? color : color.constructor.name} instead`);
  }

  if (rgb < 0) {
    console.warn(`Colors cannot be negative: '${color}'`);
    rgb = 0;
  } else if (rgb > 0xFFFFFFFF || isNaN(rgb)) {
    console.warn(`'${color}' is not a valid rgb color`);
    rgb = 0xFFFFFF;
  }

  return rgb;
}
