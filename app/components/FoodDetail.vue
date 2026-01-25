<script setup lang="ts">
import type { Food } from '../types/food';
import { getFoodCount, incrementFoodCount } from '../utils/api';

const props = defineProps<{
  food: Food;
}>();

const { t } = useI18n();
const { getFoodImagePath } = useFood();

const imagePath = computed(() => getFoodImagePath(props.food.slug));
const foodName = computed(() => t(`foods.${props.food.slug}.name`));
const foodTip = computed(() => t(`foods.${props.food.slug}.tip`));

// Counter state
const counterCount = ref<number>(0);
const isLoading = ref<boolean>(true);
const isIncrementing = ref<boolean>(false);
const hasIncremented = ref<boolean>(false);

// Fetch initial count from API
onMounted(async () => {
  try {
    const response = await getFoodCount(props.food.slug);
    counterCount.value = response.count;
  } catch (error) {
    console.error('Failed to fetch counter:', error);
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
    const response = await incrementFoodCount(props.food.slug);
    counterCount.value = response.count;
    hasIncremented.value = true;
  } catch (error) {
    console.error('Failed to increment counter:', error);
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
</script>

<template>
  <div class="food-detail">
    <div class="detail-image-container">
      <img :src="imagePath" :alt="foodName" class="detail-image" />
    </div>

    <ShareButton :slug="food.slug" :food-name="foodName" compact />

    <div class="detail-content">
      <h2 class="food-name">{{ foodName }}</h2>

      <p class="reassurance">{{ $t('ui.reassurance') }}</p>

      <OptionCard level="light" :slug="food.slug" />
      <OptionCard level="caution" :slug="food.slug" />
      <OptionCard level="avoid" :slug="food.slug" />

      <p class="tip">{{ foodTip }}</p>

      <div class="counter-section">
        <p class="counter-text">{{ counterText }}</p>
        <button
          @click="incrementCounter"
          :disabled="hasIncremented || isIncrementing || isLoading"
          class="me-too-btn"
        >
          {{ isIncrementing ? t('ui.counter.loading') : t('ui.counter.iAteThis') }}
        </button>
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

.detail-image-container {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-top: calc(-1 * var(--spacing-lg));
  height: var(--detail-image-height);
  position: relative;
  overflow: hidden;
  margin-bottom: var(--spacing-lg);
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.detail-content {
  padding: 0;
}

.food-name {
  margin-bottom: 0;
  font-size: var(--font-size-base);
  font-weight: bold;
}

.reassurance {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-lg);
  color: var(--color-text);
  text-align: left;
}

.tip {
  margin-top: var(--spacing-lg);
  margin-bottom: 0;
  color: var(--color-text);
  border-top: 2px solid var(--color-primary);
  padding-top: var(--spacing-sm);
}

.counter-section {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-md);
  border-top: 2px solid var(--color-primary);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.counter-text {
  margin: 0;
  color: var(--color-text);
  font-size: var(--font-size-base);
  text-align: center;
}

.me-too-btn {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-primary);
  color: var(--color-text);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  transition: background 0.2s ease;
}

.me-too-btn:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.me-too-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
