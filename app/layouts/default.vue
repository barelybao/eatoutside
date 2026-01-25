<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div class="layout-default">
    <header class="layout-header">
      <h1 class="site-title">
        <NuxtLink :to="localePath('/')" class="site-title-link">
          {{ $t('ui.siteTitle') }}
        </NuxtLink>
      </h1>
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.site-title {
  margin: 0;
  font-size: var(--font-size-base);
  font-weight: bold;
  flex-grow: 1;
}

.site-title-link {
  color: var(--color-text);
  text-decoration: none;
  display: inline-block;
}

.site-title-link:hover {
  color: var(--color-primary);
}
</style>
