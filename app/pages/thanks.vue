<script setup lang="ts">
const localePath = useLocalePath()

usePageSeo('thanks')
// Pagină de confirmare: nu are rost în Google
useHead({ meta: [{ name: 'robots', content: 'noindex, follow' }] })
</script>

<template>
  <section class="container-page py-24 text-center sm:py-32">
    <h1 class="text-3xl leading-tight font-semibold text-ink sm:text-4xl">{{ $t('thanks.title') }}</h1>
    <div class="mx-auto mt-4 h-1 w-14 rounded bg-brand" aria-hidden="true" />
    <p class="mt-6 text-lg text-muted">{{ $t('thanks.text') }}</p>
    <NuxtLink :to="localePath('/')" class="btn-primary mt-8">{{ $t('thanks.back') }}</NuxtLink>
  </section>
</template>
