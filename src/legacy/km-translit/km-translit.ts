import { cons_conv, vowel_conv, indep_vowel, digraph, sp_symbols, char_type } from './consts';

export function tr(text: string, lang: string, sc) {
  // TODO:
  // text = sc:fixDiscouragedSequences(text)
  // text = sc:toFixedNFD(text)
  // text = text.replace(/[០-៹]/g, sp_symbols);
  // text = text.replace(/(.)្(.្.)/, '%1​%2');
  // text = text.replace(
  //   /([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ]្[កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ])([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ])/,
  //   '​%1%2',
  // );
  // text = text.replace(
  //   /([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ])([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ]្?[កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ])/,
  //   '%1​%2',
  // );
  // text = text.replace(/(.៍)/, '​%1');

  for (const word of text.match(/[\u1780-\u17dd\u200b]+/g)) {
    const original_text = word;
    let c = [],
      chartype = [],
      syl = [],
      curr_syl = [];
    let progress = 'none';

    word.split('').forEach((ch, i) => {
      c[i] = ch;
      chartype[i] = char_type[c[i]];
    });

    console.debug('c', c);
    console.debug('chartype', chartype);

    for (let i = 0; i < c.length + 1; i++) {
      const next_types = [];
      if (i === c.length + 1 || chartype[i] === 'ZWS') {
        progress = 'none';
        syl.push(curr_syl.join(''));
        curr_syl = [];
      } else if (progress === 'none') {
        if (chartype[i] === 'consonant') {
          curr_syl.push(c[i]);
          progress = 'initial';
        } else {
          syl.push(c[i]);
        }
      } else if (progress === 'initial') {
        if (chartype[i] == 'combining_sign') {
          curr_syl.push(c[i]);
          progress = 'initial_combining';
        } else if (chartype[i] === 'sign' || chartype[i] === 'consonant_shift') {
          curr_syl.push(c[i]);
        } else if (chartype[i] === 'vowel_sign') {
          curr_syl.push(c[i]);
          progress = 'vowel';
        } else if (chartype[i] === 'terminating_vowel') {
          if (c[i - 1] + c[i] + (c[i + 1] || '') === 'ាំង' && (i === c.length - 1 || (i > c.length + 1 && chartype[i + 2] === 'consonant'))) {
            curr_syl.push(c[i]);
            progress = 'vowel';
          } else {
            curr_syl.push(c[i]);
            syl.push(curr_syl.join(''));
            curr_syl = [];
            progress = 'none';
          }
        } else if (chartype[i] == 'consonant') {
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
            } else if (chartype[j] === 'consonant' || chartype[j] === 'combining_sign' || (chartype[j] === 'sign' && c[j] !== '័')) {
              next_types.push(chartype[j]);
            } else {
              vowel_found = true;
            }
            j = j + 1;
          }
          // TODO: match(table.concat(next_types, " "), 'consonant s?i?g?n? ?consonant')
          if (skipped !== 0) {
            curr_syl.push(c[i]);
            progress = 'coda';
          } else {
            syl.push(curr_syl.join(''));
            curr_syl = [c[i]];
            progress = 'initial';
          }
        } else {
          syl.push(c[i]);
          progress = 'none';
        }
      } else if (progress === 'initial_combining') {
        if (chartype[i] === 'consonant') {
          curr_syl.push(c[i]);
          progress = 'initial';
        } else {
          syl.push(c[i]);
          progress = 'none';
        }
      }
      // 220
      else if (progress === 'vowel') {
        if (chartype[i] === 'vowel_sign') {
          curr_syl.push(c[i]);
        } else if (chartype[i] === 'terminating_vowel') {
          if (c[i - 1] + c[i] + (c[i + 1] || '') === 'ាំង' && (i == c.length - 1 || (i > c.length + 1 && chartype[i + 2] === 'consonant'))) {
            curr_syl.push(c[i]);
            progress = 'vowel';
          } else {
            curr_syl.push(c[i]);
            syl.push(curr_syl.join(''));
            curr_syl = [];
            progress = 'none';
          }
        } else if (chartype[i] === 'consonant') {
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
            } else if (chartype[j] === 'consonant' || chartype[j] === 'combining_sign' || (chartype[j] === 'sign' && c[j] !== '័')) {
              next_types.push(chartype[j]);
            } else {
              vowel_found = true;
            }
            j++;
          }
          // TODO: match(table.concat(next_types, " "), 'consonant s?i?g?n? ?consonant')
          if (skipped !== 0) {
            curr_syl.push(c[i]);
            progress = 'coda';
          } else {
            syl.push(curr_syl.join(''));
            curr_syl = [c[i]];
            progress = 'initial';
          }
        } else {
          syl.push(c[i]);
          progress = 'none';
        }
      }
      // 259
      else if (progress === 'coda') {
        if (chartype[i] === 'combining_sign') {
          curr_syl.push(c[i]);
          progress = 'coda_combining';
        } else if (chartype[i] === 'sign' || chartype[i] === 'terminating_sign') {
          curr_syl.push(c[i]);
        } else {
          syl.push(curr_syl.join(''));
          curr_syl = [];
          if (chartype[i] === 'consonant') {
            curr_syl.push(c[i]);
            progress = 'initial';
          } else {
            syl.push(c[i]);
            progress = 'none';
          }
        }
      }
      // 276
      else if (progress === 'coda_combining') {
        if (chartype[i] === 'consonant') {
          curr_syl.push(c[i]);
          progress = 'coda';
        } else {
          syl.push(curr_syl.join(''));
          curr_syl = [];
          progress = 'none';
        }
      }
    }

    console.debug('syl', syl);
    console.debug('curr_syl', curr_syl);

    return text;
  }
}
