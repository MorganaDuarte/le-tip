<script setup lang="ts">
defineProps({
  title: { type: String, required: false },
  signal: { type: String, required: false },
  value: { type: String, required: false  }
})
</script>

<template>
  <div>
    <span class="summary-item__label">{{ title }}</span>
      <div class="summary-item__section">
        <span class="currency-signal">{{ signal }}</span>
        <span class="summary-item__value">{{ value }}</span>
      </div>
  </div>
</template>

<style scoped>
.summary-item__label {
 font-size: 18px;
 font-weight: 500;
 margin-bottom: 15px;
 color: #333;
}

.summary-item__section {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  margin-bottom: 16px;
}

.summary-item__value {
  font-size: 1.25rem;
  font-weight: 400;
  color: #333;
  margin: 0;
}
</style>