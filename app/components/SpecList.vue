<script setup lang="ts">
import type { Spec } from '~~/data/products'

// 'surface' = fundal gri, pentru folosire pe fundal alb; 'white' = fundal alb, pentru folosire pe benzi gri
withDefaults(defineProps<{ specs: Spec[]; tone?: 'surface' | 'white' }>(), { tone: 'surface' })

const tr = useLocalized()
</script>

<template>
  <dl
    class="divide-y divide-line overflow-hidden rounded-xl border border-line text-sm"
    :class="tone === 'white' ? 'bg-white' : 'bg-surface'"
  >
    <div v-for="spec in specs" :key="spec.key" class="grid grid-cols-[8rem_1fr] gap-3 px-5 py-3.5 sm:grid-cols-[10rem_1fr]">
      <dt class="text-muted">{{ $t(`specs.${spec.key}`) }}</dt>
      <dd class="font-medium text-ink">{{ tr(spec.value) }}</dd>
    </div>
  </dl>
</template>
