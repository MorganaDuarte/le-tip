<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { BRL } from '../scripts/coins';
import Calculator from '../scripts/Calculator';
import MathHelpers from '../scripts/MathHelpers';
import PDF from '@/scripts/PDF';

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

let key = `${props.form.selectedCoin.value}${BRL.value}`;
const exchangeRate = ref(props.quotations[key].ask);
const locale = ref(props.form.selectedCoin.locale);

const calculator = computed(() => {
  return new Calculator(props.form.accountValue, props.form.tip, props.form.people, exchangeRate.value);
});
const accountValue = computed(() => {
  return MathHelpers.formatNumberByCurrency(props.form.accountValue, locale.value);
});
const tipValue = computed(() => {
  return MathHelpers.formatNumberByCurrency(calculator.value.calculateTipValue(), locale.value);
});
const totalValue = computed(() => {
  return MathHelpers.formatNumberByCurrency(calculator.value.calculateTotalValue(), locale.value);
});
const perPersonValue = computed(() => {
  return MathHelpers.formatNumberByCurrency(calculator.value.calculatePerPersonValue(), locale.value);
});
const valueInBRL = computed(() => {
  return MathHelpers.formatNumberByCurrency(calculator.value.calculateValueInBRL(), BRL.locale);
});

watch(() => props.form.selectedCoin, ()  => {
  key = `${props.form.selectedCoin.value}${BRL.value}`;
  exchangeRate.value = props.quotations[key].ask;
  locale.value = props.form.selectedCoin.locale;
});

const generatePDF = () => {
  const pdf = new PDF(props.form.selectedCoin, props.form.accountValue, props.form.tip, props.form.people, totalValue.value, perPersonValue.value, valueInBRL.value, tipValue.value);
  pdf.generatePDF();
}
</script>

<template>
	<div class="container">
    <div class="currency-quotation">
      <span>{{ `${form.selectedCoin.signal} ${form.selectedCoin.value} = ${BRL.signal}${MathHelpers.formatNumberByCurrency(exchangeRate, BRL.locale)}` }}</span>
    </div>
    <div>
      <span class="container__label">Conta:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ form.selectedCoin.signal }}</span>
        <span class="default-value">{{ accountValue }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">Gorjeta:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ form.selectedCoin.signal }}</span>
        <span class="default-value">{{ tipValue }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">Total:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ form.selectedCoin.signal }}</span>
        <span class="default-value">{{ totalValue }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">por Pessoa:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ form.selectedCoin.signal }}</span>
        <span class="default-value">{{ perPersonValue }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">em {{BRL.label }}:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ BRL.signal }}</span>
        <span class="default-value">{{ valueInBRL }}</span>
      </div>
    </div>
    <div class="button-container">
      <button type="button" class="button__pdf" @click="generatePDF" :disabled="!form.accountValue">Gerar PDF</button>
    </div>
    <div class="button-container" v-if="isMobile">
      <button type="button" class="button" @click="emit('update:showSummary', false)">&lt;</button>
    </div>
  </div>
</template>

<style scoped>
.button__pdf {
  background-color: #96CE00;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.button__pdf:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>