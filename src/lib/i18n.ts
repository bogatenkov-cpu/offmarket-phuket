export type Locale = "en" | "ru";
export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "ru"];

const dictionaries: Record<Locale, () => Promise<Record<string, any>>> = {
  en: () => import("@/data/dictionaries/en.json").then((m) => m.default),
  ru: () => import("@/data/dictionaries/ru.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
