<script setup lang="ts">
usePageSeo('about')
</script>

<template>
  <div>
    <PageHeader :title="$t('about.title')" />

    <section class="container-page grid items-center gap-10 py-16 sm:py-20 md:grid-cols-2 md:gap-16">
      <div class="space-y-5 leading-relaxed text-muted">
        <p>{{ $t('about.p1') }}</p>
        <p>{{ $t('about.p2') }}</p>
        <p>{{ $t('about.p3') }}</p>
      </div>

      <!-- Imaginea oficiu.jpg nu există încă; până o primim, rămâne un spațiu marcat -->
      <div
        role="img"
        :aria-label="$t('about.imageAlt')"
        class="flex aspect-[4/3] items-center justify-center rounded-md border border-dashed border-line bg-surface text-sm font-medium text-muted"
      >
        [PLACEHOLDER]
      </div>
    </section>
  </div>
</template>
