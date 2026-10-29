// Title, description și Open Graph dintr-o secțiune "seo.*" din i18n/locales/*.json
export function usePageSeo(seoKey: string, image = '/images/logo.png') {
  const { t, locale, locales } = useI18n()
  const siteUrl = useSiteConfig().url

  const currentLocale = computed(() => locales.value.find((entry) => entry.code === locale.value))

  useSeoMeta({
    title: () => t(`seo.${seoKey}.title`),
    description: () => t(`seo.${seoKey}.description`),
    ogTitle: () => t(`seo.${seoKey}.title`),
    ogDescription: () => t(`seo.${seoKey}.description`),
    ogImage: `${siteUrl}${image}`,
    ogType: 'website',
    ogSiteName: () => t('seo.siteName'),
    // og:locale folosește underscore (ro_RO), nu cratimă ca atributul lang
    ogLocale: () => (currentLocale.value?.language ?? 'ro-RO').replace('-', '_'),
  })
}
