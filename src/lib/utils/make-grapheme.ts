import * as graphemes from '../graphemes'
import type {Grapheme} from "../classes";

const graphemeMap = new Map<typeof Grapheme["Code"], any>(Object.values(graphemes).map(graphemeCls => [graphemeCls.Code, graphemeCls]))

export const getGraphemeClass = graphemeMap.get;

export function makeGrapheme(code: number) {
  const cls = getGraphemeClass(code);
  return new cls();
}
