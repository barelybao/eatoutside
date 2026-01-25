<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <footer class="footer">
    <NuxtLink :to="localePath('/about')" class="info-link">{{ $t('ui.about') }}</NuxtLink>
    <NuxtLink :to="localePath('/disclaimer')" class="info-link">{{ $t('ui.disclaimer') }}</NuxtLink>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: var(--spacing-xxl);
  text-align: center;
  border-top: 2px solid var(--color-primary);
  padding-top: var(--spacing-lg);
}

.info-link {
  color: var(--color-text);
  text-decoration: underline;
  font-size: var(--font-size-link);
  margin: 0 var(--spacing-sm);
  display: inline-block;
}

.info-link:hover {
  color: var(--color-primary);
}
</style>
