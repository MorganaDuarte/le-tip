<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { coins } from '../scripts/coins';
import Quotation from '../clients/QuotationClient';
import HeaderSection from './HeaderSection.vue';

const selectedValue = ref(coins[0]);
const accountValue = ref(0);
const tip = ref(10);
const people = ref(2);
const exchangeRate = ref(1);
const isLoading = ref(false);
const messageError = ref('');

const tipValue = computed(() => accountValue.value * tip.value / 100);
const totalValue = computed(() => !accountValue.value ? 0 : accountValue.value + tipValue.value);
const perPersonValue = computed(() => totalValue.value / people.value);
const valueInBRL = computed(() => perPersonValue.value * exchangeRate.value);

async function updateExchangeRate() {
  if (!selectedValue.value) return;

  try {
    isLoading.value = true;
    const quotation = new Quotation(selectedValue.value.value, 'BRL');

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

watch(selectedValue, async () => {
  messageError.value = '';
  await updateExchangeRate();
});
</script>

<template>
  <HeaderSection />

  <div>
     <div class="currency-selector">
      <button v-for="coin in coins" :key="coin.value"
        :class="['currency-selector__button', { 'currency-selector__button--active': selectedValue?.value === coin.value }]" @click="selectedValue = coin">
      {{ coin.label }}
      </button>
    </div>
    
    <div class="container">
      <h3 class="container__label">Valor</h3>
      <div class="container__field">
        <span class="currency-symbol">{{ selectedValue?.signal }}</span>
        <input type="number" v-model="accountValue" min="0" class="container__input" placeholder="0" />
      </div>
    </div>

    <div class="container">
      <div class="tip-slider__header">
        <h3 class="tip-slider__label">Gorjeta</h3>
        <span class="tip-slider__value">{{ tip }}%</span>
      </div>

      <input type="range" min="10" max="20" v-model="tip" class="tip-slider__input" />

      <div class="tip-slider__limits">
        <span>10</span>
        <span>20</span>
      </div>

      <hr />

      <div class="tip-slider__header">
        <h3 class="tip-slider__label">Pessoas</h3>
        <span class="tip-slider__value">{{ people }}</span>
      </div>

      <input type="range" min="2" max="16" v-model="people" class="tip-slider__input" />

      <div class="tip-slider__limits">
        <span>2</span>
        <span>16</span>
      </div>
    </div>
  </div>

  <hr/>

  <div class="container">
    <div>
      <span class="container__label">Conta:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ selectedValue?.signal }}</span>
        <span class="default-value">{{ accountValue }}</span>
      </div>

    </div>
    <div>
      <span class="container__label">Gorjeta:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ selectedValue?.signal }}</span>
        <span class="default-value">{{ tipValue.toFixed(2) }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">Total:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ selectedValue?.signal }}</span>
        <span class="default-value">{{ totalValue.toFixed(2) }}</span>
      </div>
    </div>
    <div>
      <span class="container__label">por Pessoa:</span>
      <div class="results-section">
        <span class="currency-symbol">{{ selectedValue?.signal }}</span>
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
