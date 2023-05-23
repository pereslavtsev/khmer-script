import {
  cons_conv,
  vowel_conv,
  indep_vowel,
  digraph,
  sp_symbols,
  char_type,
} from './consts';

export function tr(text: string, lang: string, sc) {
  // TODO:
  // text = sc:fixDiscouragedSequences(text)
  // text = sc:toFixedNFD(text)
  // text = text.replace(/[០-៹]/g, sp_symbols);
  text = text.replace(/(.)្(.្.)/, '%1​%2');
  text = text.replace(
    /([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ]្[កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ])([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ])/,
    '​%1%2',
  );
  text = text.replace(
    /([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ])([កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ]្?[កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវឝឞសហឡអ])/,
    '%1​%2',
  );
  text = text.replace(/(.៍)/, '​%1');

  for (const word of text.match(/[ក-៝​]+/g)) {
    const original_text = word;
    let c = [],
      chartype = [],
      syl = [],
      curr_syl = [];
    let progress = 'none';

    for (let i = 0; word.length; i++) {
      c[i] = word.slice(i, i);
      chartype[i] = char_type[c[i]];
    }

    for (let i = 0; c.length + 1; i++) {
      const next_types = [];
      if (i == c.length + 1 || chartype[i] == 'ZWS') {
        progress = 'none';
        // table.insert(syl, table.concat(curr_syl, ""))
        curr_syl = [];
      } else if (progress === 'none') {
        if (chartype[i] === 'consonant') {
          // table.insert(curr_syl, c[i])
          progress = 'initial';
        } else {
          // table.insert(syl, c[i])
        }
      } else if (progress === 'initial') {
        if (chartype[i] == 'combining_sign') {
          // table.insert(curr_syl, c[i])
          progress = 'initial_combining';
        } else if (
          chartype[i] === 'sign' ||
          chartype[i] === 'consonant_shift'
        ) {
          // table.insert(curr_syl, c[i])
        } else if (chartype[i] === 'vowel_sign') {
          // table.insert(curr_syl, c[i])
          progress = 'vowel';
        } else if (chartype[i] === 'terminating_vowel') {
          if (
            c[i - 1] + c[i] + (c[i + 1] || '') == 'ាំង' &&
            (i === c.length - 1 ||
              (i > c.length + 1 && chartype[i + 2] == 'consonant'))
          ) {
            // table.insert(curr_syl, c[i])
            progress = 'vowel';
          } else {
            // table.insert(curr_syl, c[i])
            // table.insert(syl, table.concat(curr_syl, ""))
            curr_syl = [];
            progress = 'none';
          }
        } else if (chartype[i] == 'consonant') {
          let vowel_found = false
          let j, skipped = i;
        }
      }

      console.log(word);
    }
  }
}
