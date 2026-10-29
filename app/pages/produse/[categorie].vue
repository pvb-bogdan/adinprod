<script setup lang="ts">
import { getCategory } from '~~/data/products'

const route = useRoute()
const tr = useLocalized()
const category = getCategory(route.params.categorie as string)
if (!category) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
</script>

<template>
  <section v-if="category" class="container-page py-16">
    <h1 class="text-3xl font-semibold">{{ tr(category.title) }}</h1>
  </section>
</template>
