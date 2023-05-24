import {makeGrapheme} from "../utils/make-grapheme";

export class Word {
  constructor(readonly raw: string) {
  }

  get characters() {
    return this.raw.split('');
  }

  get graphemes() {
    const graphemes = [];
    for (const character of this.characters) {
      try {
        graphemes.push(makeGrapheme(character, { word: this }));
      } catch (e) {
        console.log(e)
      }
    }
    return graphemes;
  }
}
