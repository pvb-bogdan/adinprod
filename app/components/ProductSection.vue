<script setup lang="ts">
import type { ProductItem } from '~~/data/products'

defineProps<{
  item: ProductItem
  // Pe desktop, imaginea alternează stânga/dreapta
  reversed?: boolean
}>()

const tr = useLocalized()
</script>

<template>
  <article :id="item.slug" class="grid items-center gap-8 md:grid-cols-2 md:gap-16">
    <NuxtImg
      :src="`/images/${item.image}`"
      :alt="tr(item.title)"
      width="560"
      height="380"
      sizes="xs:100vw md:50vw lg:560px"
      format="webp"
      loading="lazy"
      class="aspect-[56/38] w-full rounded-xl border border-line object-cover"
      :class="reversed ? 'md:order-2' : ''"
    />
    <div>
      <h3 class="text-2xl font-semibold text-ink">{{ tr(item.title) }}</h3>
      <p class="mt-4 leading-relaxed text-muted">{{ tr(item.text) }}</p>
      <div class="mt-8">
        <SpecList :specs="item.specs" tone="white" />
      </div>
    </div>
  </article>
</template>
