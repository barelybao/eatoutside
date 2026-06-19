<script setup lang="ts">
defineProps<{
  to?: string;
  label?: string;
}>();

const localePath = useLocalePath();
</script>

<template>
  <NuxtLink :to="localePath(to || '/')" class="back-btn">
    {{ label || $t('ui.backToMenu') }}
  </NuxtLink>
</template>

<style scoped>
.back-btn {
  display: block;
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--color-white);
  color: var(--color-black);
  border: var(--border-thick);
  border-radius: var(--radius-button);
  font-family: 'Lato', 'ZCOOL KuaiLe', sans-serif;
  font-size: var(--font-size-button);
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: all 0.1s ease;
  box-shadow: var(--shadow-button);
}

.back-btn:hover {
  background: var(--color-yellow);
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-hard);
}

.back-btn:active {
  transform: translate(0, 0);
  box-shadow: 1px 1px 0px 0px #000000;
}
</style>
