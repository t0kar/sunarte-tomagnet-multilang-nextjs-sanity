import { defaultLanguage } from './i18n/languages'

export function getPostUrl(slug: string, language?: string) {
  const lang = language || defaultLanguage?.id || 'en'
  return `/${lang}/posts/${slug}`
}