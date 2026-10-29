import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-29',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@nuxt/image', '@nuxtjs/sitemap'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  site: {
    url: 'https://www.adinprod.ro',
    name: 'Adin Prod',
  },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/images/logo.png' }],
    },
  },

  i18n: {
    defaultLocale: 'ro',
    strategy: 'prefix_except_default',
    baseUrl: 'https://www.adinprod.ro',
    detectBrowserLanguage: false,
    locales: [
      { code: 'ro', language: 'ro-RO', name: 'Română', file: 'ro.json' },
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
    ],
  },

  image: {
    format: ['webp'],
    quality: 80,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      // Paginile de categorie, generate și dacă nu sunt încă legate din meniu
      routes: [
        '/',
        '/produse/folii-protectie',
        '/produse/folii-stretch',
        '/produse/benzi-adezive',
      ],
    },
  },
})
