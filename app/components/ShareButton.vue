<script setup lang="ts">
const props = defineProps<{
  slug: string;
  foodName: string;
  compact?: boolean;
}>();

const { t } = useI18n();
const { locale } = useI18n();
const { shareRecipe } = useShare();

const isSharing = ref(false);
const showSuccess = ref(false);

const shareLabel = computed(() => {
  if (isSharing.value) return t('ui.share.sharing');
  return props.compact ? '' : t('ui.share.share');
});

const handleShare = async () => {
  if (isSharing.value) return;

  isSharing.value = true;

  try {
    const result = await shareRecipe(
      props.slug,
      props.foodName,
      locale.value
    );

    if (result.success) {
      showSuccess.value = true;
      setTimeout(() => {
        showSuccess.value = false;
      }, 2000);
    }
  } catch (error) {
    console.error('Share error:', error);
  } finally {
    isSharing.value = false;
  }
};
</script>

<template>
  <div class="share-container" :class="{ compact: compact }">
    <button
      @click="handleShare"
      :disabled="isSharing"
      class="share-btn"
      :class="{ 'showing-success': showSuccess, compact: compact }"
    >
      <svg v-if="compact" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="share-icon">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg>
      <span v-if="!compact" class="share-text">{{ shareLabel }}</span>
      <span v-if="showSuccess && !compact" class="success-message">
        {{ t('ui.share.copied') }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.share-container {
  position: relative;
  margin-top: var(--spacing-md);
}

.share-container.compact {
  position: absolute;
  top: calc(var(--detail-image-height) - var(--spacing-lg) - var(--spacing-md) - 48px);
  right: var(--spacing-md);
  margin-top: 0;
  z-index: 100;
}

.share-btn {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-primary);
  color: var(--color-text);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  transition: background 0.2s ease;
  position: relative;
  overflow: hidden;
}

.share-btn.compact {
  width: 48px;
  height: 48px;
  padding: 0;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.share-btn:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.share-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.share-btn.showing-success {
  background: var(--color-light);
  border-color: var(--color-light);
}

.share-icon {
  width: 24px;
  height: 24px;
}

.share-text {
  flex: 1;
}

.success-message {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-light);
}
</style>
