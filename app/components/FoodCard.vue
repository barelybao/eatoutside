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
  <NuxtLink :to="localePath(`/food/${food.slug}`)" class="dish-btn">
    <img :src="imagePath" :alt="foodName" />
    <span class="dish-btn-text">{{ foodName }}</span>
  </NuxtLink>
</template>

<style scoped>
.dish-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-lg) 0;
  margin-bottom: var(--spacing-sm);
  background: var(--color-background-card);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  text-align: left;
  cursor: pointer;
  color: var(--color-text);
  font-weight: bold;
  height: var(--dish-btn-height);
  text-decoration: none;
}

.dish-btn img {
  height: var(--dish-btn-height);
  width: auto;
  object-fit: cover;
  margin-right: var(--spacing-md);
  border-radius: var(--radius-button) 0 0 var(--radius-button);
  flex-shrink: 0;
}

.dish-btn-text {
  flex: 1;
}

.dish-btn:hover {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
}
</style>
