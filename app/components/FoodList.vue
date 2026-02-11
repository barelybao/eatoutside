<script setup lang="ts">
const { allFoods } = useFood();
</script>

<template>
  <div class="food-list">
    <!-- Food Cards -->
    <FoodCard v-for="food in allFoods" :key="food.id" :food="food" />
  </div>
</template>

<style scoped>
.food-list {
  display: flex;
  flex-direction: column;
}
</style>
