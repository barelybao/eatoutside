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

    <div class="footer-links">
      <NuxtLink :to="localePath('/about')" class="footer-link">{{ $t('ui.about') }}</NuxtLink>
      <NuxtLink :to="localePath('/disclaimer')" class="footer-link">{{ $t('ui.disclaimer') }}</NuxtLink>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: var(--spacing-xl);
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-md);
  border-top: 2px solid var(--color-text-secondary);
}

.bmac-link {
  display: inline-block;
  margin-bottom: var(--spacing-lg);
}

.bmac-image {
  height: 60px !important;
  width: 217px !important;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-link {
  font-family: 'Lato', 'ZCOOL KuaiLe', sans-serif;
  color: var(--color-text);
  text-decoration: underline;
  font-size: var(--font-size-link);
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--color-yellow);
}
</style>
