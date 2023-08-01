import { IScriptData } from './interfaces';

/**
 * When adding new scripts to this file, please don't forget to add
 * style definitions for the script in [[MediaWiki:Common.css]].
 */

const m: Record<string, IScriptData> = {};

m['Khmr'] = {
  0: 'Khmer',
  1: 'abugida',
  characters: 'ក-៝០-៩៰-៹᧠-᧿',
  spaces: false,
  normalizationFixes: {
    from: ['ឣ', 'ឤ'],
    to: ['អ', 'អា'],
  },
};

// TODO: add scripts

export default m;
