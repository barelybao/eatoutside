<script setup lang="ts">
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

// Define available locales directly
const availableLocales = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' }
];

const currentLocale = computed(() => locale.value);
</script>

<template>
  <div class="language-toggle">
    <template v-for="loc in availableLocales" :key="loc.code">
      <NuxtLink
        v-if="loc.code !== currentLocale"
        :to="switchLocalePath(loc.code)"
        class="lang-link"
        :aria-label="`Switch to ${loc.label}`"
      >
        {{ loc.label }}
      </NuxtLink>
      <span
        v-else
        class="current-lang"
      >
        {{ loc.label }}
      </span>
    </template>
  </div>
</template>

<style scoped>
.language-toggle {
  display: flex;
  align-items: center;
  gap: 0;
  font-family: 'Lato', 'ZCOOL KuaiLe', sans-serif;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.lang-link {
  color: var(--color-text-muted);
  text-decoration: none;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  transition: color 0.2s ease;
}

.lang-link:hover {
  color: var(--color-text);
  background: var(--color-primary-light);
}

.current-lang {
  font-weight: 700;
  padding: 4px 8px;
  color: var(--color-text);
  position: relative;
}

.current-lang::after {
  content: " |";
  color: var(--color-text-muted);
  font-weight: 400;
  margin-left: 6px;
}

.language-toggle .current-lang:last-of-type::after {
  content: "";
}
</style>
