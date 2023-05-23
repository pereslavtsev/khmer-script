export abstract class Grapheme {
  static readonly Code: number;

  static get String(): string {
    return String.fromCodePoint(this.Code);
  }
}
