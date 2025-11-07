<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import Quotation from '../clients/QuotationClient';

const props = defineProps({
  selectedCoin: {
    type: Object,
    required: true
  },
  accountValue: {
    type: Number,
    required: true
  },
  tip: {
    type: Number,
    required: true
  },
  people: {
    type: Number,
    required: true
  },
});

const exchangeRate = ref(1);
const isLoading = ref(false);
const messageError = ref('');

const tipValue = computed(() => props.accountValue * props.tip / 100);
const totalValue = computed(() => !props.accountValue ? 0 : props.accountValue + tipValue.value);
const perPersonValue = computed(() => totalValue.value / props.people);
const valueInBRL = computed(() => perPersonValue.value * exchangeRate.value);

async function updateExchangeRate() {
  if (!props.selectedCoin.value) return;

  try {
    isLoading.value = true;
    const quotation = new Quotation(props.selectedCoin.value, 'BRL');

    exchangeRate.value = await quotation.getQuotationFromApi();
  } catch (error) {
    console.error('Erro ao obter cotação:', error);
    messageError.value = 'Erro ao obter cotação';
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await updateExchangeRate();
});

watch(() => props.selectedCoin, async () => {
  messageError.value = '';
  await updateExchangeRate();
});
</script>

<template>
	<div class="container">
    <div>
      <span class="container__label">Conta:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ selectedCoin?.signal }}</span>
        <span class="default-value">{{ accountValue }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">Gorjeta:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ selectedCoin?.signal }}</span>
        <span class="default-value">{{ tipValue.toFixed(2) }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">Total:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ selectedCoin?.signal }}</span>
        <span class="default-value">{{ totalValue.toFixed(2) }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">por Pessoa:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ selectedCoin?.signal }}</span>
        <span class="default-value">{{ perPersonValue.toFixed(2) }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">em R$:</span>
      <p v-if="isLoading">Carregando...</p>
      <div v-else class="results-section">
        <span class="currency-symbol">R$</span>
        <span class="default-value">{{ valueInBRL.toFixed(2) }}</span>
      </div>
    </div>
    <div v-if="messageError">
      <span>Erro: </span>
      <span>{{ messageError }}</span>
    </div>
  </div>
</template>
