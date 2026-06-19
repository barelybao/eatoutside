<template>
  <div class="layout-home">
    <AppHeader class="layout-header" />
    <slot />
  </div>
</template>

<style scoped>
.layout-home {
  background-color: var(--color-background);
  min-height: 100vh;
  padding: var(--spacing-lg);
  color: var(--color-text);
}

.layout-header {
  margin-bottom: var(--spacing-lg);
}

.layout-header :deep(.site-title-link) {
  color: var(--color-text);
}

.layout-header :deep(.site-title-link:hover) {
  color: var(--color-yellow);
  opacity: 1;
}
</style>
