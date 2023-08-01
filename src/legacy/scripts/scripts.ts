import { Script } from './classes/script.class';

export function makeObject(code, data, useRequire) {}

export function fixDiscouragedSequences(text: string): string {
  // TODO:
  return text;
}

export function toFixedNFD(text: string): string {
  // TODO:
  return text;
}

/**
 * Finds the script whose code matches the one provided.
 * If it exists, it returns a {{code|lua|Script}} object representing the script.
 * Otherwise, it returns {{code|lua|nil}}, unless <span class="n">paramForError</span> is given, in which case an error is generated.
 * If <code class="n">paramForError</code> is {{code|lua|true}}, a generic error message mentioning the bad code is generated;
 * otherwise <code class="n">paramForError</code> should be a string or number specifying the parameter that the code came from,
 * and this parameter will be mentioned in the error message along with the bad code.
 *
 * @param code
 * @param paramForError
 * @param disallowNil
 * @param useRequire
 */
export function getByCode(code: string, paramForError: number, disallowNil: string, useRequire) {
  if (!code && !disallowNil) {
    return null;
  }
  // if (scriptsToTrack[code]) {
  //   require("Module:debug/track")("scripts/"..code)
  // }
  // code = scriptAliases[code] ?? code;

  let data: any;

  const retval = makeObject(code, data, useRequire);
}
