<script setup lang="ts">
import { categories } from '~~/data/products'

usePageSeo('products')
</script>

<template>
  <div>
    <PageHeader :title="$t('products.title')" />

    <section class="container-page grid gap-8 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-3">
      <CategoryCard v-for="category in categories" :key="category.slug" :category="category" :heading-level="2" />
    </section>
  </div>
</template>
