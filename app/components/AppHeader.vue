<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()
const open = ref(false)
// Bordura apare doar când conținutul trece pe sub header (în loc de o linie fixă)
const isScrolled = ref(false)

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

function updateScrolled() {
  isScrolled.value = window.scrollY > 4
}

onMounted(() => {
  updateScrolled()
  window.addEventListener('scroll', updateScrolled, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', updateScrolled))

watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <header
    class="glass fixed inset-x-0 top-0 z-50 border-b transition-[border-color,box-shadow] duration-200"
    :class="isScrolled || open ? 'border-line shadow-sm' : 'border-transparent'"
  >
    <div class="container-page flex h-18 items-center justify-between gap-6">
      <NuxtLink :to="localePath('/')" class="shrink-0" aria-label="Adin Prod">
        <img src="/images/logo.png" alt="Adin Prod" width="183" height="125" class="h-12 w-auto" />
      </NuxtLink>

      <nav class="hidden md:block" :aria-label="$t('nav.menu')">
        <ul class="flex items-center gap-1">
          <li v-for="link in links" :key="link.label">
            <NuxtLink
              :to="link.to"
              class="relative block rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-100"
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
        <!-- 44 × 44 px: dimensiunea minimă confortabilă pentru atingere -->
        <button
          type="button"
          class="-mr-2.5 rounded-md p-2.5 text-ink transition-transform duration-100 ease-out active:scale-90 motion-reduce:active:scale-100 md:hidden"
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

    <!-- Meniul se deschide din butonul care l-a deschis (colțul dreapta sus) și se închide pe același drum -->
    <Transition name="menu">
      <nav v-show="open" id="mobile-menu" class="border-t border-line md:hidden" :aria-label="$t('nav.menu')">
        <ul class="container-page py-2">
          <li v-for="link in links" :key="link.label">
            <NuxtLink
              :to="link.to"
              class="block border-b border-line py-3.5 text-base font-medium transition-colors duration-100 last:border-0"
              :class="isActive(link.to) ? 'text-brand' : 'text-ink active:text-brand'"
              :aria-current="isActive(link.to) ? 'page' : undefined"
            >
              {{ $t(link.label) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transform-origin: top right;
  transition:
    opacity 0.2s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

/* Mișcare redusă: doar fade, fără deplasare */
@media (prefers-reduced-motion: reduce) {
  .menu-enter-from,
  .menu-leave-to {
    transform: none;
  }
}
</style>
