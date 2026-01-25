<script setup lang="ts">
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const locales: Array<'en' | 'zh'> = ['en', 'zh'];

const localeLabels: Record<'en' | 'zh', string> = {
  en: 'EN',
  zh: '中文'
};
</script>

<template>
  <div class="language-toggle">
    <template v-for="loc in locales" :key="loc">
      <NuxtLink
        v-if="loc !== locale"
        :to="switchLocalePath(loc)"
        class="lang-link"
      >
        {{ localeLabels[loc] }}
      </NuxtLink>
      <span
        v-else
        class="current-lang"
      >
        {{ localeLabels[loc] }}
      </span>
    </template>
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
