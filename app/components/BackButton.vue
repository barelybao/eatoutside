<script setup lang="ts">
defineProps<{
  to?: string;
  label?: string;
}>();
</script>

<template>
  <NuxtLink :to="to || '/'" class="back-btn">
    {{ label || '← Back to Menu (回菜单)' }}
  </NuxtLink>
</template>

<style scoped>
.back-btn {
  display: block;
  margin-top: var(--spacing-lg);
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-primary);
  color: var(--color-text);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-button);
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}

.back-btn:hover {
  background: var(--color-primary-hover);
}
</style>
