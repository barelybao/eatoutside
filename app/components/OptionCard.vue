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

// Color mapping for each level - neon colors for titles and borders
const colorMap = {
  'safer': '#39FF14',
  'sometimes': '#FFA500',
  'better-not': '#FF4500'
};

const cardColor = computed(() => colorMap[props.level] || 'var(--color-text)');
</script>

<template>
  <div :class="['option-wrapper', level]" :style="{ '--neon-color': cardColor }">
    <h3 class="option-label">
      {{ optionLabel }}
    </h3>
    <div :class="['option-card', level]">
      <div class="option-content">
        <p class="option-description">{{ description }}</p>
        <p class="option-reason">{{ t(`foods.${slug}.reasons.${level}`) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.option-wrapper {
  margin-bottom: var(--spacing-md);
}

.option-label {
  font-family: 'DynaPuff', 'ZCOOL KuaiLe', cursive;
  font-size: 1.82rem;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.05em;
  color: var(--neon-color);
}

.option-card {
  background: var(--color-background-card);
  border: 4px solid var(--neon-color);
  border-radius: var(--radius-card);
  padding: var(--spacing-md);
  box-shadow: 4px 4px 0px 0px #000000;
}

.option-card.safer {
  background: #122100;
}

.option-card.sometimes {
  background: #2b1e00;
}

.option-card.better-not {
  background: #280400;
}

.option-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.option-description {
  font-family: 'Lato', 'ZCOOL KuaiLe', sans-serif;
  font-size: var(--font-size-base);
  color: var(--color-text);
  margin: 0;
  font-weight: 700;
  line-height: 1.4;
}

.option-reason {
  font-family: 'Lato', 'ZCOOL KuaiLe', sans-serif;
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  margin: 0;
  font-style: italic;
  line-height: 1.3;
}
</style>
