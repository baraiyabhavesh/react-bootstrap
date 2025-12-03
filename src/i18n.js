import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale, requestLocale }) => {
  let resolvedLocale = locale;
  if (!resolvedLocale && requestLocale) {
    try {
      resolvedLocale = await requestLocale;
    } catch (error) {
    }
  }

  if (!resolvedLocale || !['en', 'de'].includes(resolvedLocale)) {
    resolvedLocale = 'en';
  }

  return {
    locale: resolvedLocale,
    messages: (
      await (resolvedLocale === 'en'
        ? import('./assets/localization/en.json')
        : import(`./assets/localization/${resolvedLocale}.json`))
    ).default,
  }
})
