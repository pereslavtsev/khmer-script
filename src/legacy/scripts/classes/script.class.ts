import * as mw from '../../mw';

export class Script {
  private readonly _type: string;
  private readonly _systemCodes: any[];

  constructor(private readonly _code: string, private readonly _rawData: Record<string, any>) {}

  /**
   * Returns the script code of the language.
   * Example: {{code|lua|"Cyrl"}} for Cyrillic.
   */
  getCode() {
    return this._code;
  }
  /**
   * Returns the canonical name of the script.
   * This is the name used to represent that script on Wiktionary.
   * Example: {{code|lua|"Cyrillic"}} for Cyrillic.
   */
  getCanonicalName() {
    return this._rawData[0] ?? this._rawData.canonicalName;
  }
  /**
   * Returns the display form of the script.
   * For scripts, this is the same as the value returned by <code>:getCategoryName("nocap")</code>,
   * i.e. it reads "NAME script" (e.g. {{code|lua|"Arabic script"}}).
   * For regular and etymology languages, this is the same as the canonical name,
   * and for families, it reads "NAME languages" (e.g. {{code|lua|"Indo-Iranian languages"}}).
   * The displayed text used in <code>:makeCategoryLink</code> is always the same as the display form.
   */
  getDisplayForm() {
    return this.getCategoryName('nocap');
  }

  getOtherNames(onlyOtherNames) {}

  getAliases() {
    return this._rawData.aliases ?? [];
  }

  getVarieties() {}

  /**
   * Returns the parent of the script.
   * Example: {{code|lua|"Latn"}} for {{code|lua|"Latnx"}} and {{code|lua|"Arab"}} for {{code|lua|"fa-Arab"}}.
   * It returns {{code|lua|"top"}} for scripts without a parent, like {{code|lua|"Latn"}}, {{code|lua|"Grek"}}, etc.]
   */
  getParent() {
    return this._rawData.parent;
  }

  getSystemCodes() {
    if (!this._systemCodes) {
    }
    return this._systemCodes;
  }

  getSystems() {
    // return this._systemObjects;
  }

  // getAllNames() {
  //
  // }

  hasType() {}

  getCategoryName() {}

  makeCategoryLink() {}

  getWikipediaArticle() {}

  getCharacters() {}

  countCharacters() {}

  hasCapitalization() {}

  hasSpaces() {
    return this._rawData.spaces !== false;
  }

  isTransliterated() {
    return this._rawData.translit !== false;
  }

  /**
   * Returns true if the script is (sometimes) sorted by scraping page content,
   * meaning that it is sensitive to changes in capitalization during sorting.
   */
  sortByScraping(): boolean {
    return !!this._rawData.sort_by_scraping;
  }

  /**
   * Returns the text direction, if any. Currently, left-to-right scripts are unmarked,
   * while most right-to-left scripts have direction specified as {{code|lua|"rtl"}} and Mongolian as {{code|lua|"down"}}.]
   */
  getDirection() {
    return this._rawData.direction;
  }

  getRawData() {
    return this._rawData;
  }

  /**
   * Returns {{code|lua|true}} if the script contains characters that require fixes to Unicode normalization under certain circumstances, {{code|lua|false}} if it doesn't.
   */
  hasNormalizationFixes(): boolean {
    return !!this._rawData.normalizationFixes;
  }

  /**
   * Corrects discouraged sequences of Unicode characters to the encouraged equivalents.
   * @param text
   */
  fixDiscouragedSequences(text: string) {
    if (this.hasNormalizationFixes() && this._rawData.normalizationFixes.from) {
      const gsub = require('Module:string utilities').gsub;
      for (const [i, from] of ipairs(this._rawData.normalizationFixes.from)) {
        text = gsub(text, from, this._rawData.normalizationFixes.to[i] ?? '');
      }
    }
    return text;
  }

  toFixedNFC(text: string) {
    return fixNormalization(mw.ustring.toNFC(text), this);
  }

  toFixedNFD(text: string) {
    return fixNormalization(mw.ustring.toNFD(text), this);
  }

  toFixedNFKC(text: string) {
    return fixNormalization(mw.ustring.toNFKC(text), this);
  }

  toFixedNFKD(text: string) {
    return fixNormalization(mw.ustring.toNFKD(text), this);
  }

  toJSON(): string {
    if (!this._type) {
      this.hasType();
    }
    const types: string[] = [];
    // for type in pairs(self._type) do
    //   table.insert(types, type)
    //   end

    const ret = {
      canonicalName: this.getCanonicalName(),
      categoryName: this.getCategoryName('nocap'),
      code: this.getCode(),
      otherNames: this.getOtherNames(true),
      aliases: this.getAliases(),
      varieties: this.getVarieties(),
      type: types,
      direction: this.getDirection(),
      characters: this.getCharacters(),
      parent: this.getParent(),
      systems: this.getSystemCodes(),
      wikipediaArticle: this._rawData.wikipedia_article,
    };

    return JSON.stringify(ret);
  }
}

/**
 * Implements a modified form of Unicode normalization for instances where there are identified deficiencies in the default Unicode combining classes.
 * @param text
 * @param self
 */
function fixNormalization(text, self: Script) {}
