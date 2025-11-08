<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { BRL } from '../scripts/coins';
import Calculator from '../scripts/Calculator';

const emit = defineEmits(['update:showSummary']);
const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  isMobile: {
    type: Boolean,
    required: true
  },
  quotations: {
    type: Object,
    required: true
  }
});

const isLoading = ref(false);
const messageError = ref('');
let key = `${props.form.selectedCoin.value}${BRL.value}`;
const exchangeRate = ref(props.quotations[key].ask);

const calculator = computed(() => {
  return new Calculator(props.form.accountValue, props.form.tip, props.form.people, exchangeRate.value);
})

watch(() => props.form.selectedCoin, ()  => {
  key = `${props.form.selectedCoin.value}${BRL.value}`;
  exchangeRate.value = props.quotations[key].ask;
  messageError.value = '';
});
</script>

<template>
	<div class="container">
    <div>
      <span class="container__label">Conta:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ form.selectedCoin.signal }}</span>
        <span class="default-value">{{ form.accountValue }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">Gorjeta:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ form.selectedCoin.signal }}</span>
        <span class="default-value">{{ calculator.calculateTipValue() }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">Total:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ form.selectedCoin.signal }}</span>
        <span class="default-value">{{ calculator.calculateTotalValue() }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">por Pessoa:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ form.selectedCoin.signal }}</span>
        <span class="default-value">{{ calculator.calculatePerPersonValue() }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">em {{BRL.label }}:</span>
      <p v-if="isLoading">Carregando...</p>
      <div v-else class="results-section">
        <span class="currency-symbol">{{ BRL.signal }}</span>
        <span class="default-value">{{ calculator.calculateValueInBRL() }}</span>
      </div>
    </div>
    <div v-if="messageError">
      <span>Erro: </span>
      <span>{{ messageError }}</span>
    </div>
      <div class="button-container" v-if="isMobile">
      <button type="button" class="button" @click="emit('update:showSummary', false)">&lt;</button>
    </div>
  </div>
</template>
