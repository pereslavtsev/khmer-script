export interface IScriptData {
  [index: number]: string;
  aliases?: string;
  capitalized?: boolean;
  characters?: string;
  direction?: string;
  normalizationFixes?: {
    from: [string, string];
    to: [string, string];
  };
  spaces?: boolean;
}
