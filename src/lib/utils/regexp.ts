import { consonants, Zero, Nine } from '../graphemes';

export const DIGIT_REGEX = new RegExp(`[${Zero.String}-${Nine.String}]`);
export const CONSONANT_REGEX = new RegExp(
  `[${Object.values(consonants)
    .sort((a, b) => a - b)
    .map((cls) => cls.String)
    .join('')}]`,
);
