<script setup lang="ts">
defineProps({
  onClick: {
    type: Function,
    required: true
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<template>
  <div class="button-container">
    <button type="button" class="button-round" @click="onClick()" :disabled="disabled">
      <slot />
    </button>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.button-round {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #96CE00;
  color: white;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease, transform 0.2s ease;
}


.button-round:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>