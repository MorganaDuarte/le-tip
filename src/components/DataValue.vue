<script setup lang="ts">
import { ref } from 'vue';
import { coins } from '../scripts/coins';
import HeaderSection from './HeaderSection.vue';
import TipSummary from './TipSummary.vue';

const selectedValue = ref(coins[0]);
const accountValue = ref(0);
const tip = ref(10);
const people = ref(2);

</script>

<template>
  <HeaderSection />

  <main class="main-content">
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
          <input type="number" v-model.number="accountValue" min="0" class="container__input" placeholder="0" />
        </div>
      </div>

      <div class="container">
        <div class="tip-slider__header">
          <h3 class="tip-slider__label">Gorjeta</h3>
          <span class="tip-slider__value">{{ tip }}%</span>
        </div>

        <input type="range" min="10" max="20" v-model.number="tip" class="tip-slider__input" />

        <div class="tip-slider__limits">
          <span>10</span>
          <span>20</span>
        </div>

        <hr />

        <div class="tip-slider__header">
          <h3 class="tip-slider__label">Pessoas</h3>
          <span class="tip-slider__value">{{ people }}</span>
        </div>

        <input type="range" min="2" max="16" v-model.number="people" class="tip-slider__input" />

        <div class="tip-slider__limits">
          <span>2</span>
          <span>16</span>
        </div>
      </div>
    </div>

    <TipSummary :selectedCoin="selectedValue" :accountValue="accountValue" :tip="tip" :people="people" />
  </main>

</template>
