import { error } from '../utils';

export function exists(frame): string {
  const args = frame.args;
  let sc = args[0] ?? error('Script code has not been specified. Please pass parameter 1 to the module invocation.');

  sc = require('./scripts').getByCode(sc);

  if (sc) {
    return '1';
  } else {
    return '';
  }
}

export function getByCode(frame) {
  const args = frame.args;
  const sc = require('./scripts').getByCode(args[0], 1, 'disallow nil');

  return require('Module:language-like').templateGetByCode(sc, args, (itemname) => {
    if (itemname == 'countCharacters') {
      const text = args[3] ?? '';
      return sc.countCharacters(text);
    }
  });
}

export function getByCanonicalName(frame) {
  const args = frame.args;
  let sc = args[0] ?? error('Script name (parameter 1) has not been specified.');

  sc = require('Module:scripts').getByCanonicalName(sc);

  if (sc) {
    return sc.getCode();
  } else {
    return 'None';
  }
}

export function findBestScript(frame) {
  const args = frame.args;
  const text = args[0] ?? error('Text to analyse (parameter 1) has not been specified.');
  const lang = args[1] ?? error('Language code (parameter 2) has not been specified.');
  let force_detect = args.force_detect;
  if (force_detect === '') {
    force_detect = null;
  }
  const getCanonicalName = args[2] === 'getCanonicalName';

  const sc = require('./scripts').getByCode(lang, true).findBestScript(text, force_detect);

  if (getCanonicalName) {
    return sc.getCanonicalName();
  } else {
    return sc.getCode();
  }
}
