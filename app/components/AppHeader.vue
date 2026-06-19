<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <header class="app-header">
    <NuxtLink :to="localePath('/')" class="site-logo-link">
      <img src="/img/ui/eatoutside-logo.svg" alt="EAT OUTSIDE" class="logo-image" />
    </NuxtLink>
    <LanguageToggle />
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
}

.site-logo-link {
  display: inline-block;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.site-logo-link:hover {
  transform: translateX(4px);
}

.logo-image {
  width: 90px;
  height: 36.5px;
  display: block;
}
</style>
