<script setup lang="ts">
import type { Category } from '~~/data/products'

// h2 pe /produse (sub h1), h3 pe pagina principală (sub h2-ul introducerii)
const props = withDefaults(defineProps<{ category: Category; headingLevel?: 2 | 3 }>(), { headingLevel: 3 })
const headingTag = computed(() => `h${props.headingLevel}`)

const localePath = useLocalePath()
const tr = useLocalized()
</script>

<template>
  <article
    class="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-[box-shadow,transform] duration-300 ease-settle hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
  >
    <div class="overflow-hidden">
      <NuxtImg
        :src="`/images/${category.card.image}`"
        alt=""
        width="370"
        height="200"
        sizes="xs:100vw sm:50vw lg:370px"
        format="webp"
        loading="lazy"
        class="aspect-[37/20] w-full object-cover transition-transform duration-500 ease-settle group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </div>
    <div class="flex flex-1 flex-col p-7">
      <component :is="headingTag" class="text-xl font-semibold text-ink">{{ tr(category.title) }}</component>
      <p class="mt-3 flex-1 text-sm leading-relaxed text-muted">{{ tr(category.card.text) }}</p>
      <NuxtLink :to="localePath(`/produse/${category.slug}`)" class="btn-primary mt-8 self-start">
        {{ $t('common.seeProduct') }}
        <span class="sr-only">: {{ tr(category.title) }}</span>
      </NuxtLink>
    </div>
  </article>
</template>
