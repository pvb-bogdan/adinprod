<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <nav :aria-label="$t('nav.language')" class="flex items-center gap-1">
    <NuxtLink
      v-for="l in locales"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      :hreflang="l.language"
      :title="l.name"
      :aria-current="l.code === locale ? 'true' : undefined"
      class="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-semibold uppercase transition-colors"
      :class="l.code === locale ? 'text-ink' : 'text-muted hover:text-ink'"
    >
      <img :src="`/images/flag-${l.code}.png`" alt="" width="20" height="14" class="h-3.5 w-5 object-cover" />
      {{ l.code }}
    </NuxtLink>
  </nav>
</template>
