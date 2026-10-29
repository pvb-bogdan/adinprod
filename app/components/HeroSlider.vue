<script setup lang="ts">
import { heroSlides } from '~~/data/hero'

const localePath = useLocalePath()

const AUTOPLAY_INTERVAL_MS = 6000

// Swipe: mișcare minimă înainte să decidem că e gest, și rata de decelerare a proiecției (ca la scroll)
const DRAG_START_THRESHOLD_PX = 10
const DECELERATION_RATE = 0.998
const VELOCITY_WINDOW_MS = 100
const COMMIT_DISTANCE_RATIO = 0.25

const activeIndex = ref(0)
const isPaused = ref(false)
const isDragging = ref(false)
// Oprit de vizitator din butonul de pauză (sau implicit, dacă a cerut mișcare redusă)
const isManuallyPaused = ref(false)
const dragOffset = ref(0)
const sectionElement = ref<HTMLElement>()

let isTrackingPointer = false
let dragStartX = 0
let pointerSamples: { x: number; time: number }[] = []
let autoplayTimer: ReturnType<typeof setInterval> | undefined

function goTo(index: number) {
  // Modulo dublu, ca să funcționeze și pentru -1 (butonul "înapoi" de la primul slide)
  activeIndex.value = (index + heroSlides.length) % heroSlides.length
}

function stopAutoplay() {
  clearInterval(autoplayTimer)
  autoplayTimer = undefined
}

function startAutoplay() {
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    if (!isPaused.value && !isManuallyPaused.value && !isDragging.value) goTo(activeIndex.value + 1)
  }, AUTOPLAY_INTERVAL_MS)
}

// Cu cât tragi mai mult peste limită, cu atât textul urmărește mai puțin degetul
function rubberband(distance: number, dimension: number, constant = 0.55) {
  return (distance * dimension * constant) / (dimension + constant * Math.abs(distance))
}

// Locul în care ar ajunge gestul dacă ar continua să decelereze (formula din Designing Fluid Interfaces)
function projectDistance(velocityPxPerSecond: number) {
  return ((velocityPxPerSecond / 1000) * DECELERATION_RATE) / (1 - DECELERATION_RATE)
}

function resetDrag() {
  isTrackingPointer = false
  isDragging.value = false
  dragOffset.value = 0
  pointerSamples = []
}

function onPointerDown(event: PointerEvent) {
  if (event.pointerType === 'mouse' && event.button !== 0) return
  // Butoanele și linkurile își fac singure treaba; gestul pornește doar de pe fundal și text
  if ((event.target as HTMLElement).closest('a, button')) return
  isTrackingPointer = true
  dragStartX = event.clientX
  pointerSamples = [{ x: event.clientX, time: event.timeStamp }]
}

function onPointerMove(event: PointerEvent) {
  if (!isTrackingPointer) return
  const distance = event.clientX - dragStartX
  pointerSamples.push({ x: event.clientX, time: event.timeStamp })

  if (!isDragging.value) {
    if (Math.abs(distance) < DRAG_START_THRESHOLD_PX) return
    isDragging.value = true
    sectionElement.value?.setPointerCapture(event.pointerId)
  }
  dragOffset.value = rubberband(distance, 300)
}

function onPointerUp(event: PointerEvent) {
  if (!isTrackingPointer) return
  const wasDragging = isDragging.value
  const distance = event.clientX - dragStartX

  if (wasDragging) {
    // Viteza se măsoară pe ultimele ~100 ms, nu pe tot gestul
    const recentSamples = pointerSamples.filter((sample) => event.timeStamp - sample.time <= VELOCITY_WINDOW_MS)
    const oldestSample = recentSamples[0]
    const elapsedMs = oldestSample ? event.timeStamp - oldestSample.time : 0
    const velocity = oldestSample && elapsedMs > 0 ? ((event.clientX - oldestSample.x) / elapsedMs) * 1000 : 0

    const projectedDistance = distance + projectDistance(velocity)
    const commitDistance = (sectionElement.value?.clientWidth ?? 0) * COMMIT_DISTANCE_RATIO
    if (Math.abs(projectedDistance) > commitDistance) goTo(activeIndex.value + (projectedDistance < 0 ? 1 : -1))
  }
  resetDrag()
}

onMounted(() => {
  // Cine a cerut mișcare redusă primește slider fără schimbare automată
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  isManuallyPaused.value = prefersReducedMotion
  startAutoplay()
})

onBeforeUnmount(stopAutoplay)
</script>

<template>
  <section
    ref="sectionElement"
    class="relative isolate touch-pan-y overflow-hidden bg-footer text-white select-none"
    aria-roledescription="carousel"
    :aria-label="$t('home.hero.title')"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
    @focusin="isPaused = true"
    @focusout="isPaused = false"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="resetDrag"
  >
    <div class="relative h-[26rem] sm:h-[30rem] lg:h-[34rem]">
      <NuxtImg
        v-for="(slideImage, index) in heroSlides"
        :key="slideImage"
        :src="`/images/${slideImage}`"
        alt=""
        width="1120"
        height="400"
        sizes="xs:100vw lg:1120px"
        format="webp"
        :loading="index === 0 ? 'eager' : 'lazy'"
        :fetchpriority="index === 0 ? 'high' : 'auto'"
        :aria-hidden="index !== activeIndex"
        class="absolute inset-0 -z-20 size-full object-cover transition-opacity duration-700 ease-out motion-reduce:duration-200"
        :class="index === activeIndex ? 'opacity-100' : 'opacity-0'"
      />
      <!-- Imaginile sunt deschise și încărcate; stratul închis păstrează textul alb lizibil -->
      <div class="absolute inset-0 -z-10 bg-linear-to-r from-footer/90 via-footer/70 to-footer/30" aria-hidden="true" />

      <!-- Textul urmărește degetul 1:1 în timpul gestului și revine lin la eliberare -->
      <div
        class="container-page flex h-full flex-col justify-center pb-10 ease-settle motion-reduce:transition-none"
        :class="isDragging ? '' : 'transition-[transform,opacity] duration-300'"
        :style="{ transform: `translateX(${dragOffset}px)`, opacity: 1 - Math.abs(dragOffset) / 400 }"
      >
        <h1 class="max-w-2xl text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
          {{ $t('home.hero.title') }}
        </h1>
        <p class="mt-4 max-w-xl text-base text-white/85 sm:text-lg">{{ $t('home.hero.subtitle') }}</p>
        <NuxtLink :to="localePath('/produse')" class="btn-primary mt-8 self-start">
          {{ $t('home.hero.cta') }}
        </NuxtLink>
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3">
      <button
        type="button"
        class="rounded-full p-2.5 text-white/80 transition-transform duration-100 hover:text-white focus-visible:outline-2 focus-visible:outline-white active:scale-90 motion-reduce:active:scale-100"
        :aria-label="$t('home.hero.prev')"
        @click="goTo(activeIndex - 1)"
      >
        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <button
        v-for="(slideImage, index) in heroSlides"
        :key="slideImage"
        type="button"
        class="relative size-2.5 rounded-full border border-white transition-colors after:absolute after:-inset-2 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        :class="index === activeIndex ? 'bg-white' : 'bg-transparent hover:bg-white/50'"
        :aria-label="$t('home.hero.goTo', { n: index + 1 })"
        :aria-current="index === activeIndex ? 'true' : undefined"
        @click="goTo(index)"
      />

      <button
        type="button"
        class="rounded-full p-2.5 text-white/80 transition-transform duration-100 hover:text-white focus-visible:outline-2 focus-visible:outline-white active:scale-90 motion-reduce:active:scale-100"
        :aria-label="$t('home.hero.next')"
        @click="goTo(activeIndex + 1)"
      >
        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <button
        type="button"
        class="ml-2 rounded-full p-2.5 text-white/80 transition-transform duration-100 hover:text-white focus-visible:outline-2 focus-visible:outline-white active:scale-90 motion-reduce:active:scale-100"
        :aria-label="isManuallyPaused ? $t('home.hero.play') : $t('home.hero.pause')"
        @click="isManuallyPaused = !isManuallyPaused"
      >
        <svg v-if="isManuallyPaused" class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
        </svg>
        <svg v-else class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      </button>
    </div>
  </section>
</template>
