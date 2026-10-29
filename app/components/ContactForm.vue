<script setup lang="ts">
import { company } from '~~/data/company'

// Numele câmpurilor rămân cele din formularul vechi (yourname, telefon etc.).
// Formularul face un POST clasic; contact-handler.php se adaugă într-un pas următor.
const fields = [
  { name: 'yourname', type: 'text', autocomplete: 'name', required: true },
  { name: 'email', type: 'email', autocomplete: 'email', required: true },
  { name: 'telefon', type: 'tel', autocomplete: 'tel', required: false },
  { name: 'company', type: 'text', autocomplete: 'organization', required: false },
  { name: 'subject', type: 'text', autocomplete: 'off', required: true },
] as const

const route = useRoute()
// După submit, butonul se blochează ca mesajul să nu fie trimis de două ori
const isSubmitting = ref(false)
// Handler-ul redirecționează înapoi la /contact?error=1 când trimiterea eșuează
const hasError = computed(() => route.query.error === '1')

const inputClasses =
  'mt-1 block w-full rounded-md border border-field bg-white px-3 py-2.5 text-base text-ink focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-brand'
</script>

<template>
  <form method="post" :action="company.contactHandler" class="space-y-6" @submit="isSubmitting = true">
    <p v-if="hasError" role="alert" class="rounded-md bg-brand-soft px-4 py-3 text-sm text-brand-dark">
      {{ $t('contact.form.error') }}
    </p>

    <div v-for="field in fields" :key="field.name">
      <label :for="`contact-${field.name}`" class="block text-sm font-medium text-ink">
        {{ $t(`contact.form.${field.name}`) }}
        <span v-if="field.required" class="text-brand" aria-hidden="true">*</span>
        <span v-if="field.required" class="sr-only">({{ $t('contact.form.required') }})</span>
      </label>
      <input
        :id="`contact-${field.name}`"
        :name="field.name"
        :type="field.type"
        :autocomplete="field.autocomplete"
        :required="field.required"
        :class="inputClasses"
      />
    </div>

    <div>
      <label for="contact-comments" class="block text-sm font-medium text-ink">
        {{ $t('contact.form.comments') }}
        <span class="text-brand" aria-hidden="true">*</span>
        <span class="sr-only">({{ $t('contact.form.required') }})</span>
      </label>
      <textarea id="contact-comments" name="comments" rows="6" required :class="inputClasses" />
    </div>

    <!-- Honeypot anti-spam: ascuns vizual și pentru cititoare de ecran; boții îl completează, oamenii nu -->
    <div class="absolute -left-[9999px]" aria-hidden="true">
      <label for="contact-website">Website</label>
      <input id="contact-website" name="website" type="text" tabindex="-1" autocomplete="off" />
    </div>

    <p class="text-xs text-muted"><span class="text-brand">*</span> {{ $t('contact.form.required') }}</p>

    <button type="submit" class="btn-primary disabled:cursor-wait disabled:opacity-60" :disabled="isSubmitting">
      {{ isSubmitting ? $t('contact.form.sending') : $t('contact.form.submit') }}
    </button>
  </form>
</template>
