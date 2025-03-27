export const languages = [
  { id: 'hr', title: 'Hrvatski', isDefault: true },
  { id: 'en', title: 'English' },
  { id: 'es', title: 'Español' },
  { id: 'fr', title: 'Français' },
]

export const defaultLanguage = languages.find((l) => l.isDefault)

export function getLanguageTitle(id: string) {
  const language = languages.find((l) => l.id === id)
  return language ? language.title : id
}