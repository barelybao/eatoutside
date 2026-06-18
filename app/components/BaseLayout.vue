<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div :class="layoutClass">
    <header class="layout-header">
      <h1 class="site-title">
        <NuxtLink :to="localePath('/')" class="site-title-link">
          {{ $t('ui.siteTitle') }}
        </NuxtLink>
      </h1>
      <LanguageToggle />
    </header>
    <slot name="default" />
  </div>
</template>

<style scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
}

.site-title {
  margin: 0;
  font-size: var(--font-size-base);
  font-weight: 500;
}

.site-title-link {
  color: var(--color-text);
  text-decoration: none;
  display: inline-block;
}
</style>
