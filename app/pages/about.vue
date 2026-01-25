<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: computed(() => t('pages.about.title'))
});
</script>

<template>
  <div class="about-page">
    <h1>{{ $t('pages.about.heading') }}</h1>

    <h2>{{ $t('pages.about.vision.title') }}</h2>
    <p>{{ $t('pages.about.vision.content') }}</p>

    <h2>{{ $t('pages.about.philosophy.title') }}</h2>
    <p>{{ $t('pages.about.philosophy.prefix') }} <strong>{{ $t('pages.about.philosophy.emphasis') }}</strong>{{ $t('pages.about.philosophy.content') }}</p>

    <h2>{{ $t('pages.about.howTo.title') }}</h2>
    <p>{{ $t('pages.about.howTo.content') }}</p>

    <BackButton />
  </div>
</template>

<style scoped>
.about-page {
  max-width: 600px;
  margin: 0 auto;
  color: var(--color-text-secondary);
}

.about-page h1 {
  color: #000;
  text-align: left;
}

.about-page h2 {
  font-size: 1.2rem;
  margin-top: 1.5rem;
}

.about-page p {
  line-height: var(--line-height);
}
</style>
