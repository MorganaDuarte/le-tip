<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { coins } from '../scripts/coins';
import Quotation from '../clients/QuotationClient';

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
  <div class="text-center mb-12">
    <h1>Le/Tip</h1>
    <p>Calculadora de gorjetas inteligente</p>
  </div>
  <div>
     <div class="currency-selector">
      <button v-for="coin in coins" :key="coin.value"
        :class="['currency-selector__button', { 'currency-selector__button--active': selectedValue?.value === coin.value }]" @click="selectedValue = coin">
      {{ coin.label }}
      </button>
    </div>
    
    <div class="input-container">
      <h3 class="input-container__label">Valor</h3>
      <div class="input-container__field">
        <span class="currency-symbol">{{ selectedValue?.signal }}</span>
        <input type="number" v-model="accountValue" min="0" class="input-container__value" placeholder="0" />
      </div>
    </div>

    <!-- <div>
      <label for="tipRange">Gorjeta: {{ tip }}%</label>
      <input type="range" id="tipRange" min="10" max="20" v-model="tip" />
    </div> -->

    <div class="input-container">
      <div class="tip-slider__header">
        <h3 class="tip-slider__label">Gorjeta</h3>
        <span class="tip-slider__value">{{ tip }}%</span>
      </div>

      <input type="range" min="10" max="20" v-model="tip" class="tip-slider__input" />

    <div class="tip-slider__limits">
      <span>10</span>
      <span>20</span>
    </div>
    </div>

    <div>
      <label for="tipRange">Pessoas: {{ people }}</label>
      <input type="range" id="peopleRange" min="2" max="16" v-model="people" />
    </div>
  </div>

  <hr/>

  <div>
    <div>
      <span>Conta:</span>
      <p>{{ selectedValue?.signal }} {{ accountValue }}</p>
    </div>
    <div>
      <span>Gorjeta:</span>
      <p>{{ selectedValue?.signal }} {{ tipValue.toFixed(2) }}</p>
    </div>
    <div>
      <span>Total:</span>
      <p>{{ selectedValue?.signal }} {{ totalValue.toFixed(2) }}</p>
    </div>
    <div>
      <span>Por Pessoa:</span>
      <p>{{ selectedValue?.signal }} {{ perPersonValue.toFixed(2) }}</p>
    </div>
    <div>
      <span>em R$:</span>
      <p v-if="isLoading">Carregando...</p>
      <p v-else>R$ {{ valueInBRL.toFixed(2) }}</p>
    </div>
    <div v-if="messageError">
      <span>Erro: </span>
      <span>{{ messageError }}</span>
    </div>
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

.input-container {
 background-color: #f9f9f9;
 border-radius: 20px;
 padding: 20px;
 margin: 20px 0;
 width: 100%;
 max-width: 400px;
}

.input-container__label {
 font-size: 18px;
 font-weight: 500;
 margin-bottom: 15px;
 color: #333;
}

.input-container__field {
 display: flex;
 align-items: center;
 background-color: #f5f5f5;
 border-radius: 15px;
 padding: 10px 15px;
 border: 1px solid #eee;
}

.currency-symbol {
 font-size: 24px;
 color: #8F9BB3;
 margin-right: 10px;
 font-weight: 500;
}

.input-container__value {
 border: none;
 background: transparent;
 font-size: 20px;
 width: 100%;
 outline: none;
 color: #333;
}

.input-container__value::-webkit-inner-spin-button,
.input-container__value::-webkit-outer-spin-button {
 -webkit-appearance: none;
 margin: 0;
}

.tip-slider {
  width: 100%;
  max-width: 400px;
}

.tip-slider__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.tip-slider__label {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15px;
  color: #333;
}

.tip-slider__value {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 15px;
  color: #333;
}

.tip-slider__input {
  width: 100%;
  height: 8px;
  border-radius: 10px;
  appearance: none;
  background: #ecf5f0;
  outline: none;
  margin: 0.5rem 0;
}

.tip-slider__input::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 10px;
  background: linear-gradient(to right, #5fcf94 calc((var(--value) - 10) * 10%), #ecf5f0 0%);
}

.tip-slider__input::-webkit-slider-thumb {
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  border: 3px solid #5fcf94;
  margin-top: -7px;
  cursor: pointer;
}

.tip-slider__limits {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #6b6b6b;
}
</style>
