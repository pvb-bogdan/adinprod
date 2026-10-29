<script setup lang="ts">
import { getCategory } from '~~/data/products'

const route = useRoute()
const localePath = useLocalePath()
const tr = useLocalized()

const category = getCategory(route.params.categorie as string)
if (!category) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

usePageSeo(category.seoKey, `/images/${category.image ?? category.card.image}`)

const { t } = useI18n()
const crumbs = computed(() => [{ label: t('nav.products'), to: localePath('/produse') }])
</script>

<template>
  <div v-if="category">
    <PageHeader :title="tr(category.title)" :crumbs="crumbs" />

    <section class="container-page grid items-center gap-10 py-16 sm:py-20" :class="category.image ? 'md:grid-cols-2 md:gap-16' : ''">
      <NuxtImg
        v-if="category.image"
        :src="`/images/${category.image}`"
        :alt="tr(category.title)"
        width="560"
        height="380"
        sizes="xs:100vw md:50vw lg:560px"
        format="webp"
        class="aspect-[56/38] w-full rounded-xl border border-line object-cover md:order-2"
      />

      <div>
        <div class="space-y-5 leading-relaxed text-muted">
          <p v-for="(paragraph, index) in category.intro" :key="index">{{ tr(paragraph) }}</p>
        </div>

        <div v-if="category.surfaces" class="mt-10">
          <h2 class="text-lg font-semibold text-ink">{{ $t('products.surfacesTitle') }}</h2>
          <p class="mt-2 leading-relaxed text-muted">{{ tr(category.surfaces) }}</p>
        </div>
        <p v-if="category.note" class="mt-5 font-medium text-ink">{{ tr(category.note) }}</p>

        <div v-if="category.specs" class="mt-10">
          <h2 class="mb-4 text-lg font-semibold text-ink">
            {{ category.specsTitle === 'commonSpecs' ? $t('products.commonSpecs') : $t('common.specs') }}
          </h2>
          <SpecList :specs="category.specs" />
        </div>
      </div>
    </section>

    <section v-if="category.items" class="bg-surface py-16 sm:py-24">
      <div class="container-page space-y-20 sm:space-y-28">
        <ProductSection v-for="(item, index) in category.items" :key="item.slug" :item="item" :reversed="index % 2 === 1" />
      </div>
    </section>
  </div>
</template>
