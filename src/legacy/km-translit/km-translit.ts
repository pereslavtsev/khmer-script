import { cons_conv, vowel_conv, indep_vowel, digraph, sp_symbols, char_type } from './consts';
import * as table from './table';
import * as mw from '../mw';
import * as sc from '../sc';
// @ts-ignore
import debug from 'debug';

const libDebug = debug('km-translit');

const toNFC = mw.ustring.toNFC;
const gsub = mw.ustring.gsub;
const len = mw.ustring.len;
const match = mw.ustring.match;
const sub = mw.ustring.sub;

export function tr(text: string) {
  const trDebug = libDebug.extend(`${libDebug.namespace}:tr`);

  // TODO: if not sc then ...

  trDebug('original text: %s, length: %d', text, text.length);

  text = sc.fixDiscouragedSequences(text);
  text = sc.toFixedNFD(text);
  text = gsub(text, '[០-៹]', sp_symbols);
  text = gsub(text, '(.)្(.្.)', '%1​%2');
  text = gsub(
    text,
    '([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ]្[កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ])([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ])',
    '​%1%2',
  );
  text = gsub(
    text,
    '([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ])([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ]្?[កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ])',
    '%1​%2',
  );
  text = gsub(text, '(.៍)', '​%1');

  trDebug('filtered text: %s, length: %d', text, text.length);

  // 143
  for (let word of mw.ustring.gmatch(text, '[ក-៝​]+')) {
    const wordDebug = trDebug.extend(`word(${word})`);
    const original_text = word;
    let c = [],
      chartype = [],
      syl = [],
      curr_syl = [];
    let progress = 'none';

    for (let i = 0; i < len(word); i++) {
      c[i] = sub(word, i + 1, i + 1); // sub(word, i, i) in lua
      chartype[i] = char_type[c[i]];
    }

    wordDebug('characters: %o', Object.fromEntries(c.map((c, i) => [c, chartype[i]])));

    // i = 1, #c + 1 in lua
    for (let i = 0; i < c.length + 1; i++) {
      const itDebug = wordDebug.extend(i);
      itDebug('+'.repeat(20));
      itDebug('progress: %s', progress.toUpperCase());

      const next_types = [];
      if (i === c.length || chartype[i] === 'ZWS') {
        itDebug('if char is last or ZWS ...');
        progress = 'none';
        table.insert(syl, table.concat(curr_syl, ''));
        curr_syl = [];
      }
      // 159
      else if (progress === 'none') {
        itDebug('char type: %s', chartype[i].toUpperCase());
        if (chartype[i] === 'consonant') {
          itDebug('its consonant, set progress to initial');
          table.insert(curr_syl, c[i]);
          progress = 'initial';
        } else {
          itDebug('its NOT consonant, not change progress');
          table.insert(syl, c[i]);
        }
      }
      // 167
      else if (progress === 'initial') {
        itDebug('char type: %s', chartype[i].toUpperCase());
        if (chartype[i] === 'combining_sign') {
          table.insert(curr_syl, c[i]);
          progress = 'initial_combining';
        } else if (chartype[i] === 'sign' || chartype[i] === 'consonant_shift') {
          table.insert(curr_syl, c[i]);
        } else if (chartype[i] === 'vowel_sign') {
          table.insert(curr_syl, c[i]);
          progress = 'vowel';
        } else if (chartype[i] === 'terminating_vowel') {
          if (
            c[i - 1] + c[i] + (c[i + 1] || '') === 'ាំង' &&
            (i === c.length - 2 || (i > c.length && chartype[i + 2] === 'consonant'))
          ) {
            table.insert(curr_syl, c[i]);
            progress = 'vowel';
          } else {
            table.insert(curr_syl, c[i]);
            table.insert(syl, table.concat(curr_syl, ''));
            curr_syl = [];
            progress = 'none';
          }
        }
        // 186
        else if (chartype[i] === 'consonant') {
          itDebug('founding vowel...');
          let vowel_found = false;
          let j = i,
            skipped = 0;
          while (!vowel_found) {
            itDebug('j: %d, skipped: %d', j, skipped);
            if (
              !chartype[j] ||
              chartype[j] === 'punctuation' ||
              chartype[j] === 'indep_vowel' ||
              chartype[j] === 'terminating_sign' ||
              chartype[j] === 'ZWS'
            ) {
              skipped = 1;
              break;
            } else if (
              chartype[j] === 'consonant' ||
              chartype[j] === 'combining_sign' ||
              (chartype[j] === 'sign' && c[j] !== '័')
            ) {
              table.insert(next_types, chartype[j]);
            } else {
              vowel_found = true;
            }
            j = j + 1;
            itDebug('results: %o', { j, skipped, vowel_found });
          }
          // console.log(4444, !!match(table.concat(next_types, ' '), 'consonant (sign )?consonant'))
          if (skipped !== 0 || match(table.concat(next_types, ' '), 'consonant (sign )?consonant')) {
            table.insert(curr_syl, c[i]);
            progress = 'coda';
          } else {
            table.insert(curr_syl, c[i]);
            curr_syl = [c[i]];
            progress = 'initial';
          }
        } else {
          itDebug('if char type is NOT consonant ...');
          table.insert(syl, c[i]);
          progress = 'none';
        }
      }
      // 212
      else if (progress === 'initial_combining') {
        itDebug('char type: %s', chartype[i].toUpperCase());
        if (chartype[i] === 'consonant') {
          table.insert(curr_syl, c[i]);
          progress = 'initial';
        } else {
          table.insert(syl, c[i]);
          progress = 'none';
        }
      }
      // 220
      else if (progress === 'vowel') {
        itDebug('char type: %s', chartype[i].toUpperCase());
        if (chartype[i] === 'vowel_sign') {
          table.insert(curr_syl, c[i]);
        } else if (chartype[i] === 'terminating_vowel') {
          if (
            c[i - 1] + c[i] + (c[i + 1] || '') === 'ាំង' &&
            (i === c.length - 2 || (i > c.length && chartype[i + 2] === 'consonant'))
          ) {
            table.insert(curr_syl, c[i]);
            progress = 'vowel';
          } else {
            table.insert(curr_syl, c[i]);
            table.insert(syl, table.concat(curr_syl, ''));
            curr_syl = [];
            progress = 'none';
          }
        } else if (chartype[i] === 'consonant') {
          let vowel_found = false;
          let j = i,
            skipped = 0;
          while (!vowel_found) {
            if (
              !chartype[j] ||
              chartype[j] === 'punctuation' ||
              chartype[j] === 'indep_vowel' ||
              chartype[j] === 'terminating_sign' ||
              chartype[j] === 'ZWS'
            ) {
              skipped = 1;
              break;
            } else if (
              chartype[j] === 'consonant' ||
              chartype[j] === 'combining_sign' ||
              (chartype[j] === 'sign' && c[j] !== '័')
            ) {
              table.insert(next_types, chartype[j]);
            } else {
              vowel_found = true;
            }
            j++;
          }
          if (skipped !== 0 || match(table.concat(next_types, ' '), 'consonant (sign )?consonant')) {
            table.insert(curr_syl, c[i]);
            progress = 'coda';
          } else {
            table.insert(syl, table.concat(curr_syl, ''));
            curr_syl = [c[i]];
            progress = 'initial';
          }
        } else {
          table.insert(syl, c[i]);
          progress = 'none';
        }
      }
      // 259
      else if (progress === 'coda') {
        itDebug('char type: %s', chartype[i].toUpperCase());
        if (chartype[i] === 'combining_sign') {
          table.insert(curr_syl, c[i]);
          progress = 'coda_combining';
        } else if (chartype[i] === 'sign' || chartype[i] === 'terminating_sign') {
          table.insert(curr_syl, c[i]);
        } else {
          table.insert(syl, table.concat(curr_syl, ''));
          curr_syl = [];
          if (chartype[i] === 'consonant') {
            table.insert(curr_syl, c[i]);
            progress = 'initial';
          } else {
            table.insert(syl, c[i]);
            progress = 'none';
          }
        }
      }
      // 276
      else if (progress === 'coda_combining') {
        if (chartype[i] === 'consonant') {
          table.insert(curr_syl, c[i]);
          progress = 'coda';
        } else {
          table.insert(syl, table.concat(curr_syl, ''));
          curr_syl = [];
          progress = 'none';
        }
      }
      itDebug('changed: %o', { progress, curr_syl, syl, next_types });
    }
    const replacingDebug = wordDebug.extend('replacing');
    replacingDebug('before', { syl });
    // 287
    for (let i = 0; i < syl.length; i++) {
      if (match(syl[i], '៍')) {
        syl[i] =
          '<small><del>' +
          gsub(syl[i], '.', (consonant) => {
            if (cons_conv[consonant]) {
              return cons_conv[consonant][0]; // cons_conv[consonant][1] in lua
            }
          }) +
          '</del></small>';
        break;
      }
      syl[i] = gsub(syl[i], '់$', '');
      // 297
      syl[i] = gsub(
        syl[i],
        '^([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ])្?([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ]?)([៉៊]?)([ិីឹឺុូួើឿៀេែៃោៅា័]?[ំះៈ]?)([៉៊]?)([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ]?៉?)្?([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ]?)(៖?)$',
        (...args) => {
          let [, initial_a, initial_b, cons_shifter_a, vowel, cons_shifter_b, coda_a, coda_b, optional_sign] = args;
          replacingDebug('replacer args: %o', {
            initial_a,
            initial_b,
            cons_shifter_a,
            vowel,
            cons_shifter_b,
            coda_a,
            coda_b,
            optional_sign,
          });
          if (
            cons_shifter_a + cons_shifter_b + vowel + coda_a + coda_b === '' &&
            initial_b !== '' &&
            !match(syl[i], '្')
          ) {
            coda_a = initial_b;
            initial_b = '';
          }
          let base = initial_a;
          if (initial_b !== '' && !match(initial_b, '[ងញនមយរលវ]')) {
            base = initial_b;
          }
          if (vowel + coda_a + coda_b === 'ាំង') {
            vowel = 'ាំង';
            coda_a = '';
            coda_b = '';
          }
          optional_sign = gsub(optional_sign, '៖', 'ː');
          // 311
          replacingDebug('detecting vowel class: %o', { syl_i: syl[i], cons_shifter_a, cons_shifter_b });
          let cons_shifter = cons_shifter_a + cons_shifter_b;
          let vowel_class: string;
          if (cons_shifter === '' && cons_conv[base]) {
            vowel_class = cons_conv[base][1]; // cons_conv[base][2] in lua
          } else if (cons_shifter === '៉') {
            vowel_class = 'a';
          } else if (cons_shifter === '៊') {
            vowel_class = 'o';
          } else {
            return initial_a + initial_b + cons_shifter + vowel + coda_a + coda_b + optional_sign;
          }
          replacingDebug('vowel class: %s', vowel_class.toUpperCase());
          // 322
          if (
            digraph[initial_a + '្' + initial_b] &&
            (digraph[coda_a + '្' + coda_b] || (cons_conv[coda_a] && cons_conv[coda_b])) &&
            vowel_conv[vowel]
          ) {
            return (
              digraph[initial_a + '្' + initial_b] +
              vowel_conv[vowel][vowel_class] +
              (digraph[coda_a + '្' + coda_b] + cons_conv[coda_a][0] + cons_conv[coda_b][0]) +
              optional_sign
            );
          } else if (
            cons_conv[initial_a] +
            cons_conv[initial_b] +
            vowel_conv[vowel] +
            cons_conv[coda_a] +
            cons_conv[coda_b]
          ) {
            return (
              cons_conv[initial_a][0] +
              cons_conv[initial_b][0] +
              vowel_conv[vowel][vowel_class] +
              cons_conv[coda_a][0] +
              cons_conv[coda_b][0] +
              optional_sign
            );
          }
        },
      );
      // syl[i] == 'ៗ' and i > 1 in lua
      if (syl[i] === 'ៗ' && i > 0) {
        syl[i] = syl[i - 1];
      }
    }
    word = table.concat(syl, '');
    text = gsub(text, original_text, word);
    replacingDebug('replaced: %o', { syl, word, text });
  }
  // 337
  text = gsub(text, '.', indep_vowel);
  text = gsub(text, '([^ ]*) ៗ', '%1 %1');
  trDebug('final text: %s', text);

  return toNFC(text);
}
