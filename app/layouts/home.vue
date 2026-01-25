<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div class="layout-home">
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
.layout-home {
  background-color: var(--color-primary);
  min-height: 100vh;
  padding: var(--spacing-lg);
}

.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-left: 0;
}

.site-title {
  margin: 0;
  font-size: var(--font-size-base);
  font-weight: bold;
}

.site-title-link {
  color: var(--color-text);
  text-decoration: none;
  display: inline-block;
}

.site-title-link:hover {
  color: var(--color-text);
  opacity: 0.7;
}
</style>
