import { makeGrapheme } from '../utils/make-grapheme';
import { TextFragment } from './text-fragment';
import { Syllable } from './syllable';
import type { Grapheme } from './grapheme';
import { Consonant } from './consonant';

export class Word extends TextFragment {
  get characters() {
    return this.raw.split('');
  }

  protected makeGrapheme(character: string) {
    return makeGrapheme(character, { word: this });
  }

  get graphemes(): Grapheme[] {
    const graphemes = [];
    for (const character of this.characters) {
      try {
        graphemes.push(this.makeGrapheme(character));
      } catch (e) {
        console.log(e);
      }
    }
    return graphemes;
  }

  get syllables(): Syllable[] {
    const syllables = [];
    this.graphemes.forEach((grapheme, index) => {
      if (grapheme instanceof Consonant) {
        console.log(grapheme)
      }
    });
    return syllables;
  }
}
