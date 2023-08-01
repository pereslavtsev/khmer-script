export interface IScriptData {
  [index: number]: string;
  aliases?: string;
  canonicalName?: string;
  capitalized?: boolean;
  characters?: string;
  direction?: string;
  normalizationFixes?: {
    from: [string, string];
    to: [string, string];
  };
  parent?: string;
  sort_by_scraping?: boolean;
  spaces?: boolean;
  translit?: boolean;
  wikipedia_article?: string;
}
