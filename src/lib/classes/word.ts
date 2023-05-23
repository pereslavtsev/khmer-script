import {makeGrapheme} from "../utils/make-grapheme";

export class Word {
  constructor(readonly raw: string) {
  }

  get graphemes() {
    const characters = this.raw.split('')
    const graphemes = [];
    for (const character of characters) {
      try {
        graphemes.push(makeGrapheme(character, { word: this }));
      } catch (e) {
        console.log(e)
      }
    }
    return graphemes;
  }
}
