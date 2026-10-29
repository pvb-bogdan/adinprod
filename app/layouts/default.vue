<script setup lang="ts">
const { locale } = useI18n()
// hreflang/alternate se adaugă când versiunea EN e gata (useLocaleHead)
useHead({ htmlAttrs: { lang: locale } })
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded focus:bg-white focus:px-3 focus:py-2"
    >
      {{ $t('nav.skip') }}
    </a>
    <AppHeader />
    <main id="main" class="flex-1 pt-18">
      <slot />
    </main>
    <AppFooter />
    <WhatsAppButton />
  </div>
</template>
