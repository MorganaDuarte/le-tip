<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false
  },
  min: {
    type: String,
    required: false
  },
  max: {
    type: String,
    required: false
  },
  unit: {
    type: String,
    required: false,
    default: ''
  }
})

const value = defineModel('value', {
  type: Number,
  required: true
});
</script>

<template>
  <div class="slider">
    <h3 class="slider__label">{{ title }}</h3>
    <span class="slider__value">{{ value }} {{ unit }}</span>
  </div>

  <input type="range" :min="min" :max="max" v-model.number="value" class="slider__input" />

  <div class="slider__limits">
    <span>{{ min }}</span>
    <span>{{ max }}</span>
  </div>
</template>

<style scoped>
.slider {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.slider__label {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15px;
  color: #333;
}

.slider__value {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 15px;
  color: #333;
}

.slider__input {
  width: 100%;
  height: 8px;
  border-radius: 10px;
  appearance: none;
  background: #ecf5f0;
  outline: none;
  margin: 0.5rem 0;
}

.slider__input::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 10px;
  background: linear-gradient(to right, #96CE00 calc((var(--value) - 10) * 10%), #ecf5f0 0%);
}

.slider__input::-webkit-slider-thumb {
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  border: 3px solid #96CE00;
  margin-top: -7px;
  cursor: pointer;
}

.slider__limits {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #6b6b6b;
}
</style>