<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const goToRandomFood = () => {
  // Navigate to a random food item
  const foods = ['chicken-rice', 'fish-soup', 'yong-tau-foo', 'ban-mian', 'nasi-lemak', 'wanton-mee', 'carrot-cake', 'economical-rice', 'laksa', 'bak-chor-mee'];
  const randomSlug = foods[Math.floor(Math.random() * foods.length)];
  navigateTo(localePath(`/food/${randomSlug}`));
};
</script>

<template>
  <div class="randomizer-card">
    <h2 class="randomizer-title">{{ t('ui.randomizer.title') || 'Eh! Pick one or i choose for you today?' }}</h2>
    <button @click="goToRandomFood" class="randomizer-btn">
      {{ t('ui.randomizer.button') || 'You choose lor' }}
    </button>
  </div>
</template>

<style scoped>
.randomizer-card {
  background-color: #B4A2FC !important;
  background: #B4A2FC;
  border: 4px solid #000000;
  border-radius: var(--radius-card);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  box-shadow: 6px 6px 0px 0px #000000;
  text-align: center;
}

.randomizer-title {
  font-family: 'DynaPuff', 'ZCOOL KuaiLe', cursive;
  font-size: 1.5rem;
  color: #000000;
  margin: 0 0 var(--spacing-lg) 0;
  line-height: 1.3;
  font-weight: 500;
}

.randomizer-btn {
  background: #ffffff;
  color: #000000;
  border: 4px solid #000000;
  border-radius: var(--radius-button);
  padding: var(--spacing-md) var(--spacing-xl);
  font-family: 'Lato', 'ZCOOL KuaiLe', sans-serif;
  font-size: var(--font-size-button);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.1s ease;
  box-shadow: 3px 3px 0px 0px #000000;
}

.randomizer-btn:hover {
  background: var(--color-yellow);
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px 0px #000000;
}

.randomizer-btn:active {
  transform: translate(0, 0);
  box-shadow: 1px 1px 0px 0px #000000;
}
</style>
