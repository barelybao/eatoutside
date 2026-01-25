<template>
  <footer class="footer">
    <NuxtLink to="/about" class="info-link">About</NuxtLink>
    <NuxtLink to="/disclaimer" class="info-link">Disclaimer</NuxtLink>
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
