<script setup lang="ts">
const { notification } = useShare();
</script>

<template>
  <div class="share-toast-container">
    <Transition name="toast">
      <div v-if="notification.visible" class="share-toast" role="status" aria-live="polite">
        {{ notification.message }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.share-toast-container {
  position: fixed;
  top: 16px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 1000;
  pointer-events: none;
}

.share-toast {
  background: #ffffff;
  color: #000000;
  border: 3px solid #000000;
  border-radius: var(--radius-button);
  box-shadow: 4px 4px 0 0 #000000;
  padding: var(--spacing-md) var(--spacing-lg);
  font-family: 'Lato', 'ZCOOL KuaiLe', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  max-width: 90vw;
  text-align: center;
  pointer-events: auto;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
