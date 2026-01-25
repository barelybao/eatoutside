<template>
  <div class="layout-default">
    <slot />
  </div>
</template>

<style scoped>
.layout-default {
  background-color: var(--color-white);
  min-height: 100vh;
  padding: var(--spacing-lg);
}
</style>
