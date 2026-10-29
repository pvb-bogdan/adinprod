<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()
const open = ref(false)

const links = computed(() => [
  { to: localePath('/'), label: 'nav.home' },
  { to: localePath('/despre-noi'), label: 'nav.about' },
  { to: localePath('/produse'), label: 'nav.products' },
  { to: localePath('/contact'), label: 'nav.contact' },
])

// Acasă e activ doar pe pagina principală; restul și pe subpagini (ex. /produse/folii-stretch)
function isActive(to: string) {
  const home = localePath('/')
  return to === home ? route.path === home : route.path.startsWith(to)
}

watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
    <div class="container-page flex h-18 items-center justify-between gap-6">
      <NuxtLink :to="localePath('/')" class="shrink-0" aria-label="Adin Prod">
        <img src="/images/logo.png" alt="Adin Prod" width="183" height="125" class="h-12 w-auto" />
      </NuxtLink>

      <nav class="hidden md:block" :aria-label="$t('nav.menu')">
        <ul class="flex items-center gap-1">
          <li v-for="link in links" :key="link.label">
            <NuxtLink
              :to="link.to"
              class="relative px-3 py-2 text-sm font-medium transition-colors"
              :class="isActive(link.to) ? 'text-brand' : 'text-ink hover:text-brand'"
              :aria-current="isActive(link.to) ? 'page' : undefined"
            >
              {{ $t(link.label) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <LangSwitcher />
        <button
          type="button"
          class="-mr-2 rounded p-2 text-ink md:hidden"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? $t('nav.close') : $t('nav.menu')"
          @click="open = !open"
        >
          <svg v-if="!open" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <nav v-show="open" id="mobile-menu" class="border-t border-line bg-white md:hidden" :aria-label="$t('nav.menu')">
      <ul class="container-page py-2">
        <li v-for="link in links" :key="link.label">
          <NuxtLink
            :to="link.to"
            class="block border-b border-line py-3 text-base font-medium last:border-0"
            :class="isActive(link.to) ? 'text-brand' : 'text-ink'"
            :aria-current="isActive(link.to) ? 'page' : undefined"
          >
            {{ $t(link.label) }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
