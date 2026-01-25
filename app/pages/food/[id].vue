<script setup lang="ts">
const route = useRoute();
const { getFoodById } = useFood();

const foodId = computed(() => Number(route.params.id));
const food = computed(() => getFoodById(foodId.value));

if (!food.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Food not found'
  });
}

useHead({
  title: `${food.value?.name} - Eat Outside`
});
</script>

<template>
  <div class="food-page">
    <FoodDetail v-if="food" :food="food" />
  </div>
</template>

<style scoped>
.food-page {
  max-width: 100%;
}
</style>
