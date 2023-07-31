import { gsub, match, sub } from './ustring';

describe('ustring', () => {
  it('sub', () => {
    expect(gsub('Lua is good', 'good', 'great')).toBe('Lua is great');
    expect(gsub('hello lii', 'l', 'x')).toBe('hexxo xii');
    expect(gsub('Lua is good', 'ok', 'great')).toBe('Lua is good');
    // TODO: !
    // expect(gsub('lua is lua and lua', 'lua', 'he', 2)).toBe('he is he and lua');
    // function argument
    expect(
      gsub('hello world', '[^%s]+', (str: string) => {
        if (str.slice(0, 1).toLowerCase() === 'h') {
          return str;
        } else {
          return 'no_h';
        }
      }),
    ).toBe('hello no_h');
  });

  it('sub', () => {
    expect(sub('hello world', 1, 5)).toBe('hello');
    expect(sub('hello world', 7, 10)).toBe('worl');
    expect(sub('[in code]', 2, -2)).toBe('in code');
  });

  it('match', () => {
    expect(match('consonant sign consonant', 'consonant (sign )?consonant')).toBeTruthy();
    expect(match('consonant consonant', 'consonant (sign )?consonant')).toBeTruthy();
  });
});
