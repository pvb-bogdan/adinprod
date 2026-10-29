<script setup lang="ts">
import { whatsappUrl } from '~~/data/company'
</script>

<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener"
    :aria-label="$t('whatsapp.floating')"
    :title="$t('whatsapp.floating')"
    class="fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform duration-100 ease-out hover:scale-105 active:scale-95 motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp sm:right-6 sm:bottom-6"
  >
    <IconWhatsApp class="size-7" />
  </a>
</template>
