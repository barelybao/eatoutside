<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();
const { getFoodBySlug } = useFood();

const slug = computed(() => {
  const param = route.params.slug;
  if (typeof param !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid slug parameter'
    });
  }
  return param;
});

const food = computed(() => getFoodBySlug(slug.value));

if (!food.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Food not found'
  });
}

const foodName = computed(() => t(`foods.${slug.value}.name`));

useHead({
  title: computed(() => `${foodName.value} - ${t('ui.siteTitle')}`)
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
