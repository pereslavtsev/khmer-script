import * as consonants from './consonants';
import * as digits from './digits';
import * as signs from './signs';
import * as vowels from './vowels';

export {
  consonants,
  digits,
  signs,
  vowels,
}

export const graphemes = [consonants, digits, vowels, signs].flatMap(range => Object.values(range));

export * from './consonants';
export * from './digits';
export * from './signs';
export * from './vowels';
