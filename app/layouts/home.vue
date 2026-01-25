<template>
  <div class="layout-home">
    <slot />
  </div>
</template>

<style scoped>
.layout-home {
  background-color: var(--color-primary);
  min-height: 100vh;
  padding: var(--spacing-lg);
}
</style>
