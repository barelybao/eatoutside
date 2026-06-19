<script setup lang="ts">
import type { Food } from '../types/food';
import { getFoodCount, recordMeal } from '../utils/api';

const props = defineProps<{
  food: Food;
}>();

const { t, locale } = useI18n();
const { getFoodImagePath } = useFood();

const imagePath = computed(() => getFoodImagePath(props.food.slug));
const foodName = computed(() => t(`foods.${props.food.slug}.name`));
const foodTip = computed(() => t(`foods.${props.food.slug}.tip`));

// Counter state
const counterCount = ref<number>(0);
const isLoading = ref<boolean>(true);
const isIncrementing = ref<boolean>(false);
const hasIncremented = ref<boolean>(false);
const fetchError = ref<string | null>(null);
const incrementError = ref<string | null>(null);

// Fetch initial count from API
onMounted(async () => {
  try {
    const response = await getFoodCount(props.food.slug);
    counterCount.value = response.count;
  } catch (error) {
    console.error('Failed to fetch counter:', error);
    fetchError.value = t('ui.counter.fetchError');
    counterCount.value = 0;
  } finally {
    isLoading.value = false;
  }
});

// Increment counter via API
const incrementCounter = async () => {
  if (hasIncremented.value || isIncrementing.value) return;

  isIncrementing.value = true;
  try {
    const response = await recordMeal(props.food.slug);
    counterCount.value = response.count;
    hasIncremented.value = true;
  } catch (error) {
    console.error('Failed to record meal:', error);
    incrementError.value = t('ui.counter.incrementError');
  } finally {
    isIncrementing.value = false;
  }
};

// Counter text based on count and loading state
const counterText = computed(() => {
  if (isLoading.value) {
    return t('ui.counter.loading');
  }
  if (counterCount.value === 0) {
    return t('ui.counter.beFirst');
  }
  return t('ui.counter.peopleAte', { count: counterCount.value });
});

// Sticky title bar: show compact title once the title card scrolls past the top
const stickyTitleRef = ref<HTMLElement | null>(null);
const isStuck = ref(false);
let stickyScrollHandler: (() => void) | null = null;

onMounted(() => {
  const el = stickyTitleRef.value;
  if (!el) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    // The sticky wrapper pins at top:0 once the title card has scrolled off
    isStuck.value = el.getBoundingClientRect().top <= 0;
  };
  stickyScrollHandler = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', stickyScrollHandler, { passive: true });
  update();
});

onUnmounted(() => {
  if (stickyScrollHandler) window.removeEventListener('scroll', stickyScrollHandler);
});
</script>

<template>
  <div class="food-detail" :class="{ 'locale-zh': locale === 'zh' }">
    <!-- Yellow Title Card - Title at TOP, Image BELOW -->
    <div class="food-title-card">
      <h1 class="food-title">{{ foodName }}</h1>
      <img :src="imagePath" :alt="foodName" class="title-image" />
      <ShareButton :slug="food.slug" :food-name="foodName" compact />
    </div>

    <!-- Sticky compact title bar (title only) — appears when the title card scrolls out of view -->
    <div ref="stickyTitleRef" class="sticky-title" :class="{ visible: isStuck }">
      <div class="sticky-title-bar">
        <h2 class="sticky-title-text">{{ foodName }}</h2>
        <ShareButton :slug="food.slug" :food-name="foodName" compact />
      </div>
    </div>

    <div class="detail-content">
      <p class="reassurance">{{ $t('ui.reassurance') }}</p>

      <!-- Option Cards -->
      <OptionCard
        level="safer"
        :slug="food.slug"
      />
      <OptionCard
        level="sometimes"
        :slug="food.slug"
      />
      <OptionCard
        level="better-not"
        :slug="food.slug"
      />

      <!-- Tips Section -->
      <div class="guidance">
        <div class="guidance-title">{{ $t('ui.portionTip') }}</div>
        <div class="guidance-text">{{ t(`foods.${food.slug}.portionTip`) }}</div>
      </div>

      <div class="guidance">
        <div class="guidance-title">{{ $t('ui.sauceTip') }}</div>
        <div class="guidance-text">{{ t(`foods.${food.slug}.sauceTip`) }}</div>
      </div>

      <!-- Counter Section -->
      <div class="counter-section">
        <p class="counter-text">{{ counterText }}</p>
        <button
          @click="incrementCounter"
          :disabled="hasIncremented || isIncrementing || isLoading"
          class="me-too-btn"
        >
          {{ isIncrementing ? t('ui.counter.loading') : t('ui.counter.iAteThis') }}
        </button>
        <p v-if="fetchError" class="error-message">{{ fetchError }}</p>
        <p v-if="incrementError" class="error-message">{{ incrementError }}</p>
      </div>

      <!-- Randomizer Card at bottom -->
      <div class="randomizer-footer">
        <RandomizerCard />
      </div>

      <BackButton />
    </div>
  </div>
</template>

<style scoped>
.food-detail {
  padding-top: var(--spacing-md);
  position: relative;
}

/* Yellow Title Card - Title at TOP, Image BELOW */
.food-title-card {
  position: relative;
  background: #FFC800;
  border: 4px solid #000000;
  border-radius: var(--radius-card);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  text-align: center;
  box-shadow: 4px 4px 0px 0px #000000;
  overflow: hidden;
}

.food-title {
  font-family: 'DynaPuff', 'ZCOOL KuaiLe', cursive;
  font-size: var(--font-size-massive);
  color: #000000;
  margin: 0 0 var(--spacing-md) 0;
  font-weight: 500;
  line-height: 1.1;
}

.title-image {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #000000;
  display: block;
  margin: 0 auto;
  box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.3);
}

.detail-content {
  padding: 0 var(--spacing-md);
}

.reassurance {
  font-family: 'Lato', 'ZCOOL KuaiLe', sans-serif;
  font-size: var(--font-size-base);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: var(--color-text);
  text-align: left;
}

/* Guidance/Tips Section */
.guidance {
  margin-top: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
  padding-top: var(--spacing-xs);
  padding-bottom: var(--spacing-xs);
}

.guidance-title {
  font-family: 'DynaPuff', 'ZCOOL KuaiLe', cursive;
  font-size: 1.82rem;
  color: var(--color-purple);
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
}

.guidance-text {
  font-family: 'Lato', 'ZCOOL KuaiLe', sans-serif;
  font-size: var(--font-size-base);
  color: var(--color-text);
  line-height: 1.5;
  white-space: pre-line;
}

/* Counter Section */
.counter-section {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 2px solid var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.counter-text {
  margin: 0;
  color: var(--color-text);
  font-size: var(--font-size-base);
  text-align: center;
  font-family: 'Lato', 'ZCOOL KuaiLe', sans-serif;
}

.me-too-btn {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--color-white);
  color: var(--color-black);
  border: 4px solid var(--color-black);
  border-radius: var(--radius-button);
  font-family: 'Lato', 'ZCOOL KuaiLe', sans-serif;
  font-size: var(--font-size-button);
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  transition: all 0.1s ease;
  box-shadow: 3px 3px 0px 0px #000000;
}

.me-too-btn:hover:not(:disabled) {
  background: var(--color-yellow);
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px 0px #000000;
}

.me-too-btn:active:not(:disabled) {
  transform: translate(0, 0);
  box-shadow: 1px 1px 0px 0px #000000;
}

.me-too-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  margin: var(--spacing-sm) 0 0 0;
  color: var(--color-better-not);
  font-size: var(--font-size-small);
  text-align: center;
}

.randomizer-footer {
  margin-top: var(--spacing-xl);
}

/* Sticky compact title bar — title only, shown when title card scrolls away */
.sticky-title {
  position: sticky;
  top: 0;
  height: 0;
  z-index: 50;
}

.sticky-title-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background: #FFC800;
  border-bottom: 4px solid #000000;
  border-bottom-left-radius: var(--radius-card);
  border-bottom-right-radius: var(--radius-card);
  box-shadow: 0 4px 0 0 #000000;
  padding: var(--spacing-sm) var(--spacing-md);
  opacity: 0;
  transform: translateY(-100%);
  transition: opacity 0.25s ease, transform 0.25s ease;
  pointer-events: none;
}

.sticky-title.visible .sticky-title-bar {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.sticky-title-text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'DynaPuff', 'ZCOOL KuaiLe', cursive;
  font-size: 1.5rem;
  color: #000000;
  margin: 0;
  font-weight: 500;
  text-align: left;
  line-height: 1.2;
}

/* Inline share button on the right of the sticky bar */
.sticky-title :deep(.share-container.compact) {
  position: static;
  margin: 0;
  flex-shrink: 0;
}

.sticky-title :deep(.share-btn.compact) {
  width: 36px;
  height: 36px;
  background: #ffffff;
  box-shadow: 2px 2px 0 0 #000000;
}

.sticky-title :deep(.share-icon) {
  width: 18px;
  height: 18px;
}

/* Chinese locale: +40% on reassurance, +20% on everything else (detail page) */
.locale-zh .reassurance {
  font-size: calc(var(--font-size-base) * 1.4);
}

.locale-zh .food-title {
  font-size: calc(var(--font-size-massive) * 1.2);
}

.locale-zh .guidance-title {
  font-size: calc(1.82rem * 1.2);
}

.locale-zh .guidance-text,
.locale-zh .counter-text {
  font-size: calc(var(--font-size-base) * 1.2);
}

.locale-zh .me-too-btn {
  font-size: calc(var(--font-size-button) * 1.2);
}

/* Reach into child components (OptionCard, RandomizerCard, BackButton) */
.locale-zh :deep(.option-label) {
  font-size: calc(1.82rem * 1.2);
}

.locale-zh :deep(.option-description) {
  font-size: calc(var(--font-size-base) * 1.2);
}

.locale-zh :deep(.option-reason) {
  font-size: calc(0.95rem * 1.2);
}

.locale-zh :deep(.randomizer-title) {
  font-size: calc(1.5rem * 1.2);
}

.locale-zh :deep(.randomizer-btn) {
  font-size: calc(var(--font-size-button) * 1.2);
}

.locale-zh :deep(.back-btn) {
  font-size: calc(var(--font-size-button) * 1.2);
}
</style>
