class LuaRegExp extends RegExp {
  constructor(pattern: string, flags?: string) {
    super(pattern.replace('%', '\\'), flags);
  }
}

export function gsub(
  text: string,
  pattern: string,
  replaceValue: string | Record<string, string> | ((...args: string[]) => string),
  limit?: number,
): string {
  // TODO: limit
  const regexp = new LuaRegExp(pattern, 'g');
  switch (typeof replaceValue) {
    case 'function': {
      return text.replace(regexp, (substring, ...args) => {
        if (!replaceValue(substring, ...args)) {
          return substring;
        }
        return replaceValue(substring, ...args);
      });
    }
    case 'object': {
      return text.replace(regexp, (substring) => {
        if (!replaceValue[substring]) {
          return substring;
        }
        return replaceValue[substring];
      });
    }
    case 'string':
    default: {
      return text.replace(regexp, replaceValue.replace(/%/g, '$'));
    }
  }
}

export function gmatch(text: string, pattern: string) {
  return text.match(new LuaRegExp(pattern, 'g'));
}

export function match(text: string, pattern: string) {
  return text.match(new LuaRegExp(pattern));
}

export function len(text: string): number {
  return text.length;
}

export function sub(text: string, start: number, end: number): string {
  if (end < 0) {
    return text.slice(start - 1, end + 1);
  }
  return text.slice(start - 1, end);
}

export function toNFC(text: string): string {
  return text.normalize('NFC');
}
