import type { Locale, Localized } from '~/data/products'

// Alege textul în limba curentă dintr-o valoare din data/*.ts
export function useLocalized() {
  const { locale } = useI18n()
  return (value: string | Localized) =>
    typeof value === 'string' ? value : value[locale.value as Locale]
}
