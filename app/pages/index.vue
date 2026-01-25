<script setup lang="ts">
definePageMeta({
  layout: 'home'
});

useHead({
  title: 'Eat Outside - Singapore Hawker Food Guide'
});
</script>

<template>
  <div class="home-page">
    <h1>Eating outside? (吃什么?)</h1>
    <FoodList />
    <PageFooter />
  </div>
</template>

<style scoped>
.home-page {
  max-width: 100%;
}
</style>
