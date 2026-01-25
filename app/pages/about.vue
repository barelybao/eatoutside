<script setup lang="ts">
useHead({
  title: 'About - Eat Outside'
});
</script>

<template>
  <div class="about-page">
    <h1>Why Eat Outside?</h1>

    <h2>The Vision</h2>
    <p>
      Eating in Singapore is a national pastime, but it can often feel like a source of stress or
      "health guilt." Eat Outside was created to help you navigate our beautiful food centers with
      more ease and less anxiety.
    </p>

    <h2>Our Philosophy</h2>
    <p>
      We believe in <strong>harm reduction</strong>, not restriction. You don't need to stop eating
      the foods you love to feel better. We don't use calorie counts or clinical language. Instead,
      we offer simple adjustments that make your favorite meals feel a little lighter on the palate.
    </p>

    <h2>How to Use This</h2>
    <p>
      Think of this as a gentle friend sitting across the table. Pick your dish and see the options.
      Whether you choose a Light, Caution, or Avoid version depends entirely on how you feel
      today—there are no wrong answers.
    </p>

    <BackButton label="← Back to Menu" />
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
