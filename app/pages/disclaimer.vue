<script setup lang="ts">
useHead({
  title: 'Disclaimer - Eat Outside'
});
</script>

<template>
  <div class="disclaimer-page">
    <h1>A Gentle Reminder</h1>

    <div class="box">
      <p>
        <strong>Not Medical Advice</strong><br />
        The information provided is for educational and supportive purposes only. We are not medical
        professionals. Suggestions are based on common preparation methods and general body-feel.
      </p>

      <p>
        <strong>Listen to Your Body</strong><br />
        Every body is different. Please prioritize your own comfort, medical requirements, and the
        advice of your healthcare provider.
      </p>

      <p>
        <strong>Allergies &amp; Safety</strong><br />
        Always check with hawker stall owners regarding ingredients and allergens. Recipes can
        change without notice.
      </p>
    </div>

    <BackButton label="← Back to Menu" />
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
