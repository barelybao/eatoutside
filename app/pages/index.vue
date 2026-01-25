<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: 'home'
});

useHead({
  title: computed(() => `${t('ui.siteTitle')} - ${t('ui.siteDescription')}`)
});
</script>

<template>
  <div class="home-page">
    <FoodList />
    <PageFooter />
  </div>
</template>

<style scoped>
.home-page {
  max-width: 100%;
}
</style>
