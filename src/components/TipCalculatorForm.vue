<script setup lang="ts">
import { coins } from '../scripts/coins';
import RoundButton from './RoundButton.vue';
import CalculatorSlider from './CalculatorSlider.vue';

const emit = defineEmits(['update:showSummary']);
defineProps({
  isMobile: { type: Boolean, required: true }
});

const form = defineModel('form', { type: Object, required: true });
</script>

<template>
  <div class="container">
    <div class="currency-selector">
      <button 
        v-for="coin in coins" 
        :key="coin.value"
        :class="['currency-selector__button', { 'currency-selector__button--active': form.selectedCoin.value === coin.value }]" 
        @click="form.selectedCoin = coin">
          {{ coin.label }}
      </button>
    </div>
    
    <div class="container__internal">
      <h3 class="container__label">Valor</h3>
      <div class="container__field">
        <span class="currency-signal">{{ form.selectedCoin.signal }}</span>
        <input type="number" v-model="form.accountValue" min="0" class="container__input" placeholder="0" />
      </div>
    </div>

    <div class="container__internal">
      <CalculatorSlider title="Gorjeta" min="10" max="20" v-model:value="form.tip" unit="%" />
      <hr />
      <CalculatorSlider title="Pessoas" min="2" max="16" v-model:value="form.people" />
    </div>
    <RoundButton v-if="isMobile" @click="emit('update:showSummary', true)">></RoundButton> 
  </div>
</template>

<style scoped>
.currency-selector {
 display: flex;
 background-color: white;
 border-radius: 50px;
 padding: 4px;
 width: fit-content;
 box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
 border: 1px solid #f0f0f0;
}

.currency-selector__button {
 border: none;
 background: none;
 padding: 10px 25px;
 border-radius: 50px;
 font-size: 16px;
 font-weight: 500;
 color: #8F9BB3;
 cursor: pointer;
 transition: all 0.3s ease;
}

.currency-selector__button--active {
 background-color: #96CE00;
 color: white;
}

</style>