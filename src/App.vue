<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { useCurrencyStore } from '@/stores/currency'

const currencyStore = useCurrencyStore()

currencyStore.getCurrenciesInfo({ isTable: true })
</script>

<template>
  <v-app>
    <header class="header">
      <RouterLink class="header__item" to="/">Головна</RouterLink>
      <RouterLink class="header__item" :to="{ name: 'changedCurrencies' }">
        Змінені курси
      </RouterLink>
      <RouterLink class="header__item" :to="{ name: 'searchCurrency' }">Пошук курсу</RouterLink>
    </header>
    <main class="main">
      <RouterView />
    </main>
  </v-app>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  padding: 30px 10px;
  background-color: #000;
  position: fixed;
  width: 100%;

  &__item {
    color: #fff;
    text-decoration: none;
    display: block;
    margin: 0 20px 0 0;
  }

  .router-link-active {
    color: rgb(18, 221, 18);
  }
}

.main {
  margin-top: 84px;
  padding: 20px;
  width: 100%;
}
</style>
