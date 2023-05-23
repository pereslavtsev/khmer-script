import type {Word} from "./word";

interface GraphemeContext {
  readonly word: Word;
}

export abstract class Grapheme {
  static readonly Code: number;

  protected constructor(readonly context: GraphemeContext) {

  }

  static get String(): string {
    return String.fromCodePoint(this.Code);
  }
}
