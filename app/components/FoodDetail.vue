<script setup lang="ts">
import type { Food } from '../types/food';

const props = defineProps<{
  food: Food;
}>();

const { t } = useI18n();
const { getFoodImagePath } = useFood();

const imagePath = computed(() => getFoodImagePath(props.food.slug));
const foodName = computed(() => t(`foods.${props.food.slug}.name`));
const foodTip = computed(() => t(`foods.${props.food.slug}.tip`));
</script>

<template>
  <div class="food-detail">
    <div class="detail-image-container">
      <img :src="imagePath" :alt="foodName" class="detail-image" />
    </div>

    <div class="detail-content">
      <h2 class="food-name">{{ foodName }}</h2>

      <p class="reassurance">{{ $t('ui.reassurance') }}</p>

      <OptionCard level="light" :slug="food.slug" />
      <OptionCard level="caution" :slug="food.slug" />
      <OptionCard level="avoid" :slug="food.slug" />

      <p class="tip">{{ foodTip }}</p>

      <BackButton />
    </div>
  </div>
</template>

<style scoped>
.food-detail {
  padding-top: 0;
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
}

.reassurance {
  font-size: var(--font-size-small);
  margin-bottom: var(--spacing-lg);
  color: var(--color-text);
  text-align: left;
}

.tip {
  margin-top: var(--spacing-lg);
  color: var(--color-text);
  border-top: 2px solid var(--color-primary);
  padding-top: var(--spacing-sm);
}
</style>
