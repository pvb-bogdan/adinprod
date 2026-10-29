<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// Poziția butonului alb: prima limbă la stânga, a doua la dreapta
const activeIndex = computed(() => Math.max(0, locales.value.findIndex((entry) => entry.code === locale.value)))
</script>

<template>
  <nav :aria-label="$t('nav.language')">
    <ul class="relative flex rounded-full border border-line bg-surface p-0.5 text-[0.6875rem] leading-none font-semibold">
      <!-- Butonul alb alunecă între limbi; se animă doar transform, deci poate fi întrerupt oricând -->
      <li
        class="absolute inset-y-0.5 left-0.5 w-[calc(50%-0.125rem)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-settle motion-reduce:transition-none"
        :style="{ transform: `translateX(${activeIndex * 100}%)` }"
        aria-hidden="true"
      />
      <li v-for="entry in locales" :key="entry.code" class="relative z-10">
        <NuxtLink
          :to="switchLocalePath(entry.code)"
          :hreflang="entry.language"
          :title="entry.name"
          :aria-current="entry.code === locale ? 'true' : undefined"
          class="relative block w-8 rounded-full py-1.5 text-center uppercase transition-colors duration-100 after:absolute after:-inset-y-2.5 after:inset-x-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand"
          :class="entry.code === locale ? 'text-ink' : 'text-muted hover:text-ink'"
        >
          {{ entry.code }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
