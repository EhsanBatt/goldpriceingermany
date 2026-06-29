import ar from './ar.json';
import en from './en.json';
import de from './de.json';
import tr from './tr.json';

const dictionaries: Record<string, any> = { ar, en, de, tr };

export function getTranslations(locale: string) {
  return dictionaries[locale] || dictionaries.ar;
}
