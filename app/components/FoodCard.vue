<script setup lang="ts">
import type { Food } from '../types/food';

const props = defineProps<{
  food: Food;
}>();

const { t } = useI18n();
const { getFoodImagePath } = useFood();
const localePath = useLocalePath();

const imagePath = computed(() => getFoodImagePath(props.food.slug));
const foodName = computed(() => t(`foods.${props.food.slug}.name`));
</script>

<template>
  <NuxtLink :to="localePath(`/food/${food.slug}`)" class="food-item">
    <span class="bullet">●</span>
    <span class="food-name">{{ foodName }}</span>
  </NuxtLink>
</template>

<style scoped>
.food-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  text-decoration: none;
  transition: transform 0.2s ease, color 0.2s ease;
  gap: var(--spacing-md);
}

.food-item:hover {
  transform: translateX(8px);
}

.bullet {
  color: var(--color-yellow);
  font-size: 1.4rem;
  flex-shrink: 0;
  line-height: 1;
}

.food-name {
  font-family: 'Lato', 'ZCOOL KuaiLe', sans-serif;
  font-size: var(--font-size-base);
  color: var(--color-white);
  font-weight: 400;
  flex: 1;
}
</style>
