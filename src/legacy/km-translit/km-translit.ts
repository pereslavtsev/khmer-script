import { cons_conv, vowel_conv, indep_vowel, digraph, sp_symbols, char_type } from './consts';
import * as table from './table';
import * as mw from '../mw';
import * as sc from '../sc';

const toNFC = mw.ustring.toNFC;
const gsub = mw.ustring.gsub;
const len = mw.ustring.len;
const match = mw.ustring.match;
const sub = mw.ustring.sub;

export function tr(text: string) {
  // TODO: if not sc then ...

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
  // 143
  for (let word of mw.ustring.gmatch(text, '[ក-៝​]+')) {
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

    console.log(1111, c);
    console.log(1111, chartype);

    // i = 1, #c + 1 in lua
    for (let i = 0; i < c.length; i++) {
      const next_types = [];
      if (i === c.length - 1 || chartype[i] === 'ZWS') {
        console.log('if ending ...');
        progress = 'none';
        table.insert(syl, table.concat(curr_syl, ''));
        curr_syl = [];
      }
      // 159
      else if (progress === 'none') {
        console.log('if no progress ...');
        if (chartype[i] === 'consonant') {
          table.insert(curr_syl, c[i]);
          progress = 'initial';
        } else {
          table.insert(syl, c[i]);
        }
      }
      // 167
      else if (progress === 'initial') {
        console.log('if progress init ...');
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
            (i === c.length - 1 || (i > c.length && chartype[i + 2] === 'consonant'))
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
          console.log('if char type is consonant ...');
          let vowel_found = false;
          let j = i,
            skipped = 0;
          while (!vowel_found) {
            if (
              !(
                chartype[j] ||
                chartype[j] === 'punctuation' ||
                chartype[j] === 'indep_vowel' ||
                chartype[j] === 'terminating_sign' ||
                chartype[j] === 'ZWS'
              )
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
          }
          console.log('next_types', next_types);
          if (skipped !== 0 || match(table.concat(next_types, ' '), 'consonant s?i?g?n? ?consonant')) {
            table.insert(curr_syl, c[i]);
            progress = 'coda';
          } else {
            table.insert(curr_syl, c[i]);
            curr_syl = [c[i]];
            progress = 'initial';
          }
        } else {
          console.log('if char type is not consonant ...');
          table.insert(syl, c[i]);
          progress = 'none';
        }
      }
      // 212
      else if (progress === 'initial_combining') {
        console.log('if progress is initial_combining ...');
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
        console.log('if progress is vowel ...');
        if (chartype[i] === 'vowel_sign') {
          table.insert(curr_syl, c[i]);
        } else if (chartype[i] === 'terminating_vowel') {
          if (
            c[i - 1] + c[i] + (c[i + 1] || '') === 'ាំង' &&
            (i === c.length - 1 || (i > c.length && chartype[i + 2] === 'consonant'))
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
          console.log('if char type is consonant ...');
          let vowel_found = false;
          let j = i,
            skipped = 0;
          while (!vowel_found) {
            if (
              !(
                chartype[j] ||
                chartype[j] === 'punctuation' ||
                chartype[j] === 'indep_vowel' ||
                chartype[j] === 'terminating_sign' ||
                chartype[j] === 'ZWS'
              )
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
          console.log('190 next_types', next_types);
          if (skipped !== 0 || match(table.concat(next_types, ' '), 'consonant s?i?g?n? ?consonant')) {
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
        console.log('if coda ...');
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
        console.log('if coda_combining ...');
        if (chartype[i] === 'consonant') {
          table.insert(curr_syl, c[i]);
          progress = 'coda';
        } else {
          table.insert(syl, table.concat(curr_syl, ''));
          curr_syl = [];
          progress = 'none';
        }
      }
    }
    console.log('syl', syl);
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
          console.log('args', args);
          let [initial_a, initial_b, cons_shifter_a, vowel, cons_shifter_b, coda_a, coda_b, optional_sign] = args;
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
          let cons_shifter = cons_shifter_a + cons_shifter_b;
          let vowel_class;
          if (cons_shifter === '' && cons_conv[base]) {
            vowel_class = cons_conv[base][1]; // cons_conv[base][2] in lua
          } else if (cons_shifter === '៉') {
            vowel_class = 'a';
          } else if (cons_shifter === '៊') {
            vowel_class = 'o';
          } else {
            console.log('c', initial_a + initial_b + cons_shifter + vowel + coda_a + coda_b + optional_sign);
            return initial_a + initial_b + cons_shifter + vowel + coda_a + coda_b + optional_sign;
          }
          // 322
          if (
            digraph[initial_a + '្' + initial_b] &&
            (digraph[coda_a + '្' + coda_b] || (cons_conv[coda_a] && cons_conv[coda_b])) &&
            vowel_conv[vowel]
          ) {
            console.log('a')
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
            console.log('b')
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
    console.log('syl', syl);
    word = table.concat(syl, '');
    text = gsub(text, original_text, word);
    console.log('text 11', text);
  }
  // 337
  text = gsub(text, '.', indep_vowel);
  text = gsub(text, '([^ ]*) ៗ', '%1 %1');

  return toNFC(text);
}
