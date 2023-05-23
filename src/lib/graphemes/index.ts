import * as consonants from './consonants';
import * as digits from './digits';
import * as vowels from './vowels';

export {
  consonants,
  digits,
  vowels,
}

export const graphemes = [consonants, digits, vowels].flatMap(range => Object.values(range));

export * from './consonants';
export * from './digits';
export * from './vowels';
