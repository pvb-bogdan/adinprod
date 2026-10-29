<script setup lang="ts">
import { categories } from '~~/data/products'

usePageSeo('home', '/images/slider-1.png')
</script>

<template>
  <div>
    <HeroSlider />

    <section class="container-page py-16 text-center sm:py-24">
      <h2 class="mx-auto max-w-2xl text-2xl font-semibold text-ink sm:text-3xl">{{ $t('home.intro.title') }}</h2>
      <div class="mx-auto mt-5 h-1 w-14 rounded bg-brand" aria-hidden="true" />
      <p class="mx-auto mt-8 max-w-3xl leading-relaxed text-muted">{{ $t('home.intro.text') }}</p>
    </section>

    <section class="bg-surface py-16 sm:py-24" :aria-label="$t('nav.products')">
      <div class="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <CategoryCard v-for="category in categories" :key="category.slug" :category="category" />
      </div>
    </section>
  </div>
</template>
