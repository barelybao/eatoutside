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
      <img :src="config.icon" :alt="`${optionLabel} option`" class="option-icon" />
      <span class="option-label">{{ optionLabel }}:</span>
    </div>
    <div class="option-content">{{ description }}</div>
  </div>
</template>

<style scoped>
.option {
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  background: var(--color-option-bg);
  border-left: 5px solid var(--color-primary);
}

.option-top {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.option-icon {
  height: var(--option-icon-height);
  width: auto;
  margin-right: var(--spacing-xs);
  flex-shrink: 0;
}

.option-label {
  font-weight: bold;
  flex-shrink: 0;
}

.option-content {
  color: var(--color-text);
}
</style>
