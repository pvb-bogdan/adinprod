<script setup lang="ts">
import { company, telHref, whatsappUrl } from '~~/data/company'

usePageSeo('contact')

const tr = useLocalized()
</script>

<template>
  <div>
    <PageHeader :title="$t('contact.title')" />

    <section class="container-page py-16 sm:py-20">
      <p class="max-w-2xl leading-relaxed text-muted">{{ $t('contact.intro') }}</p>

      <div class="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 class="text-xl font-semibold text-ink">{{ $t('contact.detailsTitle') }}</h2>
          <address class="mt-5 space-y-5 text-ink not-italic">
            <p>{{ tr(company.address) }}</p>
            <p>
              <template v-for="(email, index) in company.emails" :key="email">
                <span v-if="index" aria-hidden="true"> | </span>
                <a :href="`mailto:${email}`" class="hover:text-brand">{{ email }}</a>
              </template>
            </p>
            <p>
              <template v-for="(phone, index) in company.phones" :key="phone">
                <span v-if="index" aria-hidden="true"> | </span>
                <a :href="telHref(phone)" class="whitespace-nowrap hover:text-brand">{{ phone }}</a>
              </template>
            </p>
          </address>

          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener"
            class="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
          >
            <IconWhatsApp class="size-5" />
            {{ $t('whatsapp.label') }}
          </a>
        </div>

        <div>
          <h2 class="mb-6 text-xl font-semibold text-ink">{{ $t('contact.formTitle') }}</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>
