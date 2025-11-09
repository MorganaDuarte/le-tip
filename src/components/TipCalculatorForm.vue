<script setup lang="ts">
import { coins } from '../scripts/coins';
import ButtonRound from './ButtonRound.vue';
import CalculatorSlider from './CalculatorSlider.vue';

const emit = defineEmits(['update:showSummary']);
defineProps({
  isMobile: {
    type: Boolean,
    required: true
  }
});

const form = defineModel('form', {
  type: Object,
  required: true
});
</script>

<template>
  <div class="container">
    <div class="currency-selector">
      <button v-for="coin in coins" :key="coin.value"
        :class="['currency-selector__button', { 'currency-selector__button--active': form.selectedCoin.value === coin.value }]" @click="form.selectedCoin = coin">
      {{ coin.label }}
      </button>
    </div>
    
    <div class="container__internal">
      <h3 class="container__label">Valor</h3>
      <div class="container__field">
        <span class="currency-symbol">{{ form.selectedCoin.signal }}</span>
        <input type="number" v-model="form.accountValue" min="0" class="container__input" placeholder="0" />
      </div>
    </div>

    <div class="container__internal">
      <CalculatorSlider title="Gorjeta" min="10" max="20" v-model:value="form.tip" unit="%" />
      <hr />
      <CalculatorSlider title="Pessoas" min="2" max="16" v-model:value="form.people" />
    </div>
    <ButtonRound v-if="isMobile" @click="emit('update:showSummary', true)">></ButtonRound> 
  </div>
</template>
