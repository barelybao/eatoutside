<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() =>
  (locales.value as Array<{ code: string; language: string }>).filter(l => l.code !== locale.value)
);

const currentLocaleLabel = computed(() => locale.value === 'en' ? 'EN' : '中');
</script>

<template>
  <div class="language-toggle">
    <NuxtLink
      v-for="loc in availableLocales"
      :key="loc.code"
      :to="switchLocalePath(loc.code)"
      class="lang-link"
    >
      {{ loc.code === 'en' ? 'EN' : '中文' }}
    </NuxtLink>
    <span class="current-lang">{{ currentLocaleLabel }}</span>
  </div>
</template>

<style scoped>
.language-toggle {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-small);
}

.lang-link {
  color: var(--color-text);
  text-decoration: underline;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
}

.lang-link:hover {
  background: var(--color-primary-light);
}

.current-lang {
  font-weight: bold;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-primary);
  border-radius: var(--radius-sm);
}
</style>
