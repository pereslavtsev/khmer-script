export const cons_conv = {
  ក: ['k', 'a'],
  ខ: ['kh', 'a'],
  គ: ['k', 'o'],
  ឃ: ['kh', 'o'],
  ង: ['ng', 'o'],
  ច: ['ch', 'a'],
  ឆ: ['chh', 'a'],
  ជ: ['ch', 'o'],
  ឈ: ['chh', 'o'],
  ញ: ['nh', 'o'],
  ដ: ['d', 'a'],
  ឋ: ['th', 'a'],
  ឌ: ['d', 'o'],
  ឍ: ['th', 'o'],
  ណ: ['n', 'a'],
  ត: ['t', 'a'],
  ថ: ['th', 'a'],
  ទ: ['t', 'o'],
  ធ: ['th', 'o'],
  ន: ['n', 'o'],
  ប: ['b', 'a'],
  ផ: ['ph', 'a'],
  ព: ['p', 'o'],
  ភ: ['ph', 'o'],
  ម: ['m', 'o'],
  យ: ['y', 'o'],
  រ: ['r', 'o'],
  ល: ['l', 'o'],
  វ: ['v', 'o'],
  ឝ: ['sh', 'a'],
  ឞ: ['ss', 'o'],
  ស: ['s', 'a'],
  ហ: ['h', 'a'],
  ឡ: ['l', 'a'],
  អ: ['ʼ', 'a'],
  '': ['', ''],

  ប៉: ['p', 'a'],
};

export const digraph = {
  ហ្គ: 'g',
  ហ្ន: 'n',
  ហ្ម: 'm',
  ហ្ល: 'l',
  ហ្វ: 'f',
  ហ្ស: 'z',
};

export const indep_vowel = {
  ឥ: 'ʼĕ',
  ឦ: 'ʼei',
  ឧ: 'ʼŏ',
  ឨ: 'ʼŏk',
  ឩ: 'ʼŭ',
  ឪ: 'ʼŏu',
  ឫ: 'rœ̆',
  ឬ: 'rœ',
  ឭ: 'lœ̆',
  ឮ: 'lœ',
  ឯ: 'ʼé',
  ឰ: 'ʼai',
  ឱ: 'ʼaô',
  ឲ: 'ʼaô',
  ឳ: 'ʼâu',
};

export const vowel_conv = {
  '': { a: 'â', o: 'ô' },
  'ា': { a: 'a', o: 'éa' },
  'ិ': { a: 'ĕ', o: 'ĭ' },
  'ី': { a: 'ei', o: 'i' },
  'ឹ': { a: 'œ̆', o: 'œ̆' },
  'ឺ': { a: 'œ', o: 'œ' },
  'ុ': { a: 'ŏ', o: 'ŭ' },
  'ូ': { a: 'o', o: 'u' },
  'ួ': { a: 'uŏ', o: 'uŏ' },
  'ើ': { a: 'aeu', o: 'eu' },
  'ឿ': { a: 'eua', o: 'eua' },
  'ៀ': { a: 'iĕ', o: 'iĕ' },
  'េ': { a: 'é', o: 'é' },
  'ែ': { a: 'ê', o: 'ê' },
  'ៃ': { a: 'ai', o: 'ey' },
  'ោ': { a: 'aô', o: 'oŭ' },
  'ៅ': { a: 'au', o: 'ŏu' },
  'ុំ': { a: 'om', o: 'ŭm' },
  'ំ': { a: 'âm', o: 'um' },
  'ាំ': { a: 'ăm', o: 'ŏâm' },
  'ាំង': { a: 'ăng', o: 'eăng' },
  'ះ': { a: 'ăh', o: 'eăh' },
  'ុះ': { a: 'ŏh', o: 'uh' },
  'េះ': { a: 'éh', o: 'éh' },
  'ោះ': { a: 'aŏh', o: 'uŏh' },
  'ឹះ': { a: 'ĕh', o: 'ĭh' },
  'ិះ': { a: 'ĕh', o: 'ĭh' },
  'ៈ': { a: 'aʼ', o: 'éaʼ' },
  '័': {
    a: '<span style:"font-color:#DCDCDC">â</span>',
    o: '<span style:"font-color:#DCDCDC">ô</span>',
  },
};

export const char_type = {
  ក: 'consonant',
  ខ: 'consonant',
  គ: 'consonant',
  ឃ: 'consonant',
  ង: 'consonant',
  ច: 'consonant',
  ឆ: 'consonant',
  ជ: 'consonant',
  ឈ: 'consonant',
  ញ: 'consonant',
  ដ: 'consonant',
  ឋ: 'consonant',
  ឌ: 'consonant',
  ឍ: 'consonant',
  ណ: 'consonant',
  ត: 'consonant',
  ថ: 'consonant',
  ទ: 'consonant',
  ធ: 'consonant',
  ន: 'consonant',
  ប: 'consonant',
  ផ: 'consonant',
  ព: 'consonant',
  ភ: 'consonant',
  ម: 'consonant',
  យ: 'consonant',
  រ: 'consonant',
  ល: 'consonant',
  វ: 'consonant',
  ឝ: 'consonant',
  ឞ: 'consonant',
  ស: 'consonant',
  ហ: 'consonant',
  ឡ: 'consonant',
  អ: 'consonant',
  ឥ: 'indep_vowel',
  ឦ: 'indep_vowel',
  ឧ: 'indep_vowel',
  ឨ: 'indep_vowel',
  ឩ: 'indep_vowel',
  ឪ: 'indep_vowel',
  ឫ: 'indep_vowel',
  ឬ: 'indep_vowel',
  ឭ: 'indep_vowel',
  ឮ: 'indep_vowel',
  ឯ: 'indep_vowel',
  ឰ: 'indep_vowel',
  ឱ: 'indep_vowel',
  ឲ: 'indep_vowel',
  ឳ: 'indep_vowel',
  'ា': 'vowel_sign',
  'ិ': 'vowel_sign',
  'ី': 'vowel_sign',
  'ឹ': 'vowel_sign',
  'ឺ': 'vowel_sign',
  'ុ': 'vowel_sign',
  'ូ': 'vowel_sign',
  'ួ': 'vowel_sign',
  'ើ': 'vowel_sign',
  'ឿ': 'vowel_sign',
  'ៀ': 'vowel_sign',
  'េ': 'vowel_sign',
  'ែ': 'vowel_sign',
  'ៃ': 'terminating_vowel',
  'ោ': 'vowel_sign',
  'ៅ': 'vowel_sign',
  'ំ': 'terminating_vowel',
  'ះ': 'terminating_vowel',
  'ៈ': 'terminating_vowel',
  '៉': 'consonant_shift',
  '៊': 'consonant_shift',
  '់': 'terminating_sign',
  '៌': 'sign',
  '៍': 'sign',
  '៎': 'sign',
  '៏': 'sign',
  '័': 'sign',
  '៑': 'sign',
  '្': 'combining_sign',
  '៓': 'sign',
  '។': 'punctuation',
  '៕': 'punctuation',
  '៖': 'sign',
  ៗ: 'punctuation',
  '៘': 'punctuation',
  '៙': 'punctuation',
  '៚': 'punctuation',
  '៛': 'punctuation',
  ៜ: 'sign',
  '៝': 'sign',
  '​': 'ZWS',
};

export const sp_symbols = {
  '០': '0',
  '១': '1',
  '២': '2',
  '៣': '3',
  '៤': '4',
  '៥': '5',
  '៦': '6',
  '៧': '7',
  '៨': '8',
  '៩': '9',
  '៰': '0',
  '៱': '1',
  '៲': '2',
  '៳': '3',
  '៴': '4',
  '៵': '5',
  '៶': '6',
  '៷': '7',
  '៸': '8',
  '៹': '9',
};
