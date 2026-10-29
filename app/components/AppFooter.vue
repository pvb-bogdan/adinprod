<script setup lang="ts">
import { company, telHref } from '~~/data/company'

const tr = useLocalized()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-footer text-sm text-white/75">
    <div class="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <img src="/images/logo.png" alt="Adin Prod" width="183" height="125" class="h-14 w-auto rounded bg-white p-1.5" loading="lazy" />
        <p class="mt-4 font-semibold text-white">{{ company.name }}</p>
      </div>

      <div>
        <h2 class="mb-3 text-xs font-semibold tracking-wider text-white uppercase">{{ $t('footer.contact') }}</h2>
        <address class="space-y-2 not-italic">
          <p>{{ tr(company.address) }}</p>
          <p>
            <template v-for="(email, i) in company.emails" :key="email">
              <span v-if="i" aria-hidden="true"> · </span>
              <a :href="`mailto:${email}`" class="hover:text-white">{{ email }}</a>
            </template>
          </p>
          <p>
            <template v-for="(phone, i) in company.phones" :key="phone">
              <span v-if="i" aria-hidden="true"> · </span>
              <a :href="telHref(phone)" class="whitespace-nowrap hover:text-white">{{ phone }}</a>
            </template>
          </p>
        </address>
      </div>

      <div>
        <h2 class="mb-3 text-xs font-semibold tracking-wider text-white uppercase">{{ $t('footer.followUs') }}</h2>
        <a :href="company.facebook" target="_blank" rel="noopener" class="inline-flex items-center gap-2 hover:text-white">
          <img src="/images/facebook.png" alt="" width="40" height="40" class="size-6" loading="lazy" />
          {{ $t('footer.facebook') }}
        </a>
      </div>
    </div>

    <div class="border-t border-white/10">
      <p class="container-page py-5 pr-20 text-xs text-white/60">
        © {{ year }} {{ company.name }}. {{ $t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>
