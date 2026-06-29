export const defaultLocale = 'ar';
export const supportedLocales = ['ar', 'en', 'de', 'tr'];

export function getLocaleFromUrl(url: URL): string {
  const [, lang] = url.pathname.split('/');
  if (lang && supportedLocales.includes(lang)) {
    return lang;
  }
  return defaultLocale;
}

export function getLocalizedUrl(path: string, locale: string): string {
  const cleanPath = path.replace(/^\/(ar|en|de|tr)\/?/, '/').replace(/^\//, '');
  if (locale === defaultLocale) {
    return `/${cleanPath}`;
  }
  return `/${locale}/${cleanPath}`;
}

export function getDir(locale: string): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function getStaticLocalePaths() {
  return supportedLocales.filter(l => l !== defaultLocale).map(locale => ({
    params: { locale }
  }));
}
