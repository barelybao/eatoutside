<script setup lang="ts">
const { allFoods } = useFood();
const { t, locale } = useI18n();
</script>

<template>
  <div class="food-list-container" :class="{ 'locale-en': locale === 'en' }">
    <!-- Randomizer Card -->
    <RandomizerCard />

    <!-- Rankings Title (outside the container, left aligned) -->
    <h1 class="rankings-title">{{ t('ui.rankings.title') || 'SG Hawker Food Rankings' }}</h1>

    <!-- Rankings Container - ONE large dark card -->
    <div class="rankings-container">
      <!-- Food Items List inside the single card -->
      <div class="food-items-list">
        <FoodCard v-for="food in allFoods" :key="food.id" :food="food" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.food-list-container {
  display: flex;
  flex-direction: column;
}

.rankings-title {
  font-family: 'Lato', 'ZCOOL KuaiLe', sans-serif;
  font-size: var(--font-size-heading);
  color: var(--color-white);
  margin: 0 0 var(--spacing-md) 0;
  font-weight: 500;
  text-align: left;
}

.rankings-container {
  background: #121212;
  border: 4px solid #000000;
  border-radius: var(--radius-card);
  padding: 20px;
  margin-bottom: var(--spacing-lg);
  box-shadow: 4px 4px 0px 0px #000000;
}

.food-items-list {
  display: flex;
  flex-direction: column;
}

/* English locale: rankings title −10%, food listing +10% */
.locale-en .rankings-title {
  font-size: calc(var(--font-size-heading) * 0.9);
}

.locale-en :deep(.food-name) {
  font-size: calc(var(--font-size-base) * 1.1);
}
</style>
