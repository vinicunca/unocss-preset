export function createCssSelector({ selector, content }: { selector: string; content: string[] }) {
  return `${selector} { ${content.join(' ')} }`;
}

