<script setup lang="ts">
interface Crumb {
  label: string
  to: string
}

defineProps<{
  title: string
  crumbs?: Crumb[]
}>()
</script>

<template>
  <div class="border-b border-line bg-surface">
    <div class="container-page py-12 sm:py-16">
      <nav v-if="crumbs?.length" :aria-label="$t('nav.breadcrumb')" class="mb-4 text-sm text-muted">
        <ol class="flex flex-wrap items-center gap-x-2">
          <li v-for="crumb in crumbs" :key="crumb.to" class="flex items-center gap-2">
            <NuxtLink :to="crumb.to" class="hover:text-brand">{{ crumb.label }}</NuxtLink>
            <span aria-hidden="true">/</span>
          </li>
          <li aria-current="page" class="text-ink">{{ title }}</li>
        </ol>
      </nav>
      <h1 class="text-3xl leading-tight font-semibold text-ink sm:text-4xl">{{ title }}</h1>
      <div class="mt-5 h-1 w-14 rounded bg-brand" aria-hidden="true" />
    </div>
  </div>
</template>
