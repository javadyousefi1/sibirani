export type Language = {
  code: string;
  label: string;
  dir: "ltr" | "rtl";
};

export type Keyword = {
  id: string;
  key: string;
  translations: Record<string, string>;
};

export type AppState = {
  keywords: Keyword[];
  activeLanguage: string;
};
