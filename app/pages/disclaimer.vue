<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: computed(() => t('pages.disclaimer.title'))
});
</script>

<template>
  <div class="disclaimer-page">
    <h1>{{ $t('pages.disclaimer.heading') }}</h1>

    <div class="box">
      <p>
        <strong>{{ $t('pages.disclaimer.notMedical.title') }}</strong><br />
        {{ $t('pages.disclaimer.notMedical.content') }}
      </p>

      <p>
        <strong>{{ $t('pages.disclaimer.listenBody.title') }}</strong><br />
        {{ $t('pages.disclaimer.listenBody.content') }}
      </p>

      <p>
        <strong>{{ $t('pages.disclaimer.allergies.title') }}</strong><br />
        {{ $t('pages.disclaimer.allergies.content') }}
      </p>
    </div>

    <BackButton />
  </div>
</template>

<style scoped>
.disclaimer-page {
  max-width: 600px;
  margin: 0 auto;
  color: var(--color-text-secondary);
}

.disclaimer-page h1 {
  color: #000;
  text-align: left;
}

.box {
  background: #f9f9f9;
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
  border: 1px solid #eee;
  margin-top: var(--spacing-lg);
}

.box p {
  margin-bottom: var(--spacing-md);
  line-height: var(--line-height);
}

.box p:last-child {
  margin-bottom: 0;
}
</style>
