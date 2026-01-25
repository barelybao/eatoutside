<template>
  <div class="layout-default">
    <header class="layout-header">
      <LanguageToggle />
    </header>
    <slot />
  </div>
</template>

<style scoped>
.layout-default {
  background-color: var(--color-white);
  min-height: 100vh;
  padding: var(--spacing-lg);
}

.layout-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--spacing-md);
}
</style>
