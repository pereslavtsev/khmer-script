import { graphemes } from '../graphemes';
import type { Grapheme } from '../classes';
import { UnknownGrapheme } from '../exceptions';

const graphemeMap = new Map<(typeof Grapheme)['Code'], any>(
  Object.values(graphemes).map((graphemeCls) => [
    graphemeCls.Code,
    graphemeCls,
  ]),
);

export const getGraphemeClass = graphemeMap.get.bind(graphemeMap);

export function makeGrapheme(
  code: number | string,
  options: Grapheme['context'],
) {
  const cls = getGraphemeClass(
    typeof code === 'string' ? code.charCodeAt(0) : code,
  );
  if (!cls) {
    throw new UnknownGrapheme();
  }
  return new cls(options);
}
