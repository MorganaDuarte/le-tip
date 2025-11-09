<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { BRL } from '../scripts/coins';
import Calculator from '../scripts/Calculator';
import MathHelpers from '../scripts/MathHelpers';
import PDF from '@/scripts/PDF';
import SummaryItem from './SummaryItem.vue';
import IconPdf from './IconPdf.vue';
import ButtonRound from './ButtonRound.vue';

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

const createKey = (selectedCoin: string, quotation: string) => {
 return `${selectedCoin}${quotation}`
}

let key = createKey(props.form.selectedCoin.value, BRL.value);
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
  key = createKey(props.form.selectedCoin.value, BRL.value);
  exchangeRate.value = props.quotations[key].ask;
  locale.value = props.form.selectedCoin.locale;
});

const generatePDF = () => {
  const pdf = new PDF(
    props.form.selectedCoin, 
    props.form.accountValue, 
    props.form.tip, props.form.people, 
    totalValue.value, 
    perPersonValue.value, 
    valueInBRL.value, 
    tipValue.value
  );
  
  pdf.generatePDF();
}
</script>

<template>
	<div class="container">
    <div class="currency-quotation">
      <span>{{ `${form.selectedCoin.signal} ${form.selectedCoin.value} = ${BRL.signal}${MathHelpers.formatNumberByCurrency(exchangeRate, BRL.locale)}` }}</span>
    </div>
    <SummaryItem title="Conta" :signal="form.selectedCoin.signal" :value="accountValue" />
    <SummaryItem title="Gorjeta" :signal="form.selectedCoin.signal" :value="tipValue" />
    <SummaryItem title="Total" :signal="form.selectedCoin.signal" :value="totalValue" />
    <SummaryItem title="por Pessoa" :signal="form.selectedCoin.signal" :value="perPersonValue" />
    <SummaryItem :title="`em ${BRL.label}`" :signal="BRL.signal" :value="valueInBRL" />
    <ButtonRound @click="generatePDF" :disabled="!form.accountValue">
      <IconPdf />
    </ButtonRound>
    <ButtonRound v-if="isMobile" @click="emit('update:showSummary', false)">&lt;</ButtonRound> 
  </div>
</template>

<style scoped>
.currency-quotation {
  text-align: end;
  font-size: 0.9rem;
  color: #6b7280;
}
</style>