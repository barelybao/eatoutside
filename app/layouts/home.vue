<template>
  <div class="layout-home">
    <header class="layout-header">
      <LanguageToggle />
    </header>
    <slot />
  </div>
</template>

<style scoped>
.layout-home {
  background-color: var(--color-primary);
  min-height: 100vh;
  padding: var(--spacing-lg);
}

.layout-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--spacing-md);
}
</style>
