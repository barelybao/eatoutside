<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <footer class="footer">
    <div class="bmac-container">
      <a href="https://www.buymeacoffee.com/barelybao" target="_blank" class="bmac-link">
        <img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" class="bmac-image">
      </a>
    </div>
    <NuxtLink :to="localePath('/about')" class="info-link">{{ $t('ui.about') }}</NuxtLink>
    <NuxtLink :to="localePath('/disclaimer')" class="info-link">{{ $t('ui.disclaimer') }}</NuxtLink>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: var(--spacing-md);
  text-align: center;
  border-top: 2px solid var(--color-primary);
  padding-top: var(--spacing-md);
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

.bmac-link {
  display: inline-block;
}

.bmac-image {
  height: 60px !important;
  width: 217px !important;
}
</style>
