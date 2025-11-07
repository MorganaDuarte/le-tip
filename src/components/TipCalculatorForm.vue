<script setup lang="ts">
import { ref } from 'vue';
import { coins } from '../scripts/coins';

const emit = defineEmits(['update:selectedCoin', 'update:accountValue', 'update:tip', 'update:people', 'update:showSummary']);
defineProps({
  isMobile: {
    type: Boolean,
    required: true
  }
});
const selectedCoin = ref(coins[0]);
const accountValue = ref(0);
const tip = ref(10);
const people = ref(2);
</script>

<template>
  <div class="container">
    <div class="currency-selector">
      <button v-for="coin in coins" :key="coin.value"
        :class="['currency-selector__button', { 'currency-selector__button--active': selectedCoin?.value === coin.value }]" @click="emit('update:selectedCoin', coin)">
      {{ coin.label }}
      </button>
    </div>
    
    <div class="container">
      <h3 class="container__label">Valor</h3>
      <div class="container__field">
        <span class="currency-symbol">{{ selectedCoin?.signal }}</span>
        <input type="number" v-model.number="accountValue" @input="emit('update:accountValue', accountValue)" min="0" class="container__input" placeholder="0" />
      </div>
    </div>

    <div class="container">
      <div class="tip-slider__header">
        <h3 class="tip-slider__label">Gorjeta</h3>
        <span class="tip-slider__value">{{ tip }}%</span>
      </div>

      <input type="range" min="10" max="20" v-model.number="tip" @input="emit('update:tip', tip)" class="tip-slider__input" />

      <div class="tip-slider__limits">
        <span>10</span>
        <span>20</span>
      </div>

      <hr />

      <div class="tip-slider__header">
        <h3 class="tip-slider__label">Pessoas</h3>
        <span class="tip-slider__value">{{ people }}</span>
      </div>

      <input type="range" min="2" max="16" v-model.number="people" @input="emit('update:people', people)" class="tip-slider__input" />

      <div class="tip-slider__limits">
        <span>2</span>
        <span>16</span>
      </div>
    </div>
    <div class="button-container" v-if="isMobile">
      <button type="button" class="button" @click="emit('update:showSummary', true)">></button>
    </div>
  </div>
</template>
