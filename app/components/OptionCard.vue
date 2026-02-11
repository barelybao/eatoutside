<script setup lang="ts">
import type { OptionLevel } from '../types/food';

const props = defineProps<{
  level: OptionLevel;
  slug: string;
}>();

const { t } = useI18n();
const { optionConfigs } = useFood();

const config = computed(() => optionConfigs[props.level]);
const optionLabel = computed(() => t(`ui.options.${props.level}`));
const description = computed(() => t(`foods.${props.slug}.options.${props.level}`));
</script>

<template>
  <div :class="['option', level]">
    <div class="option-top">
      <span class="option-label">{{ optionLabel }}</span>
    </div>
    <div class="option-content-line">
      <span class="option-content">{{ description }}</span>
    </div>
    <div class="option-reason">{{ t(`foods.${slug}.reasons.${level}`) }}</div>
  </div>
</template>

<style scoped>
.option {
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
}

.option.safer {
  background: rgb(8, 177, 60);
  border: none;
  color: rgb(226, 221, 112);
}

.option.sometimes {
  background: rgb(96, 135, 212);
  border: none;
  color: #ce9dc1;
}

.option.better-not {
  background: #763ab6;
  border: none;
  color: rgb(248, 217, 236);
}

.option-top {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
}

.option-content-line {
  margin-bottom: 4px;
}

.option-label {
  font-family: "Funnel Display", sans-serif;
  font-optical-sizing: auto;
  font-weight: 800;
  flex-shrink: 0;
  color: black;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.09em;
}

.option-content {
  font-family: "Funnel Display", sans-serif;
  font-optical-sizing: auto;
  font-weight: bold;
  font-size: var(--font-size-base);
  flex-shrink: 0;
  flex: 1;
}

.option-reason {
  font-size: 1rem;
  color: white;
  font-weight: 500;
  letter-spacing: 0.04em; 
  line-height: 1.3em;
  margin-bottom: 8px;
}
</style>
