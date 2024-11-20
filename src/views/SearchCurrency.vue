<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useCurrencyStore } from '@/stores/currency'

import type { Currency } from '@/types/currency'

const currencyStore = useCurrencyStore()

const search = ref('')
const menu = ref(false)
const date = ref(null)
const formattedDate = ref('')

const selectDate = (selectedDate: Date | null) => {
  if (selectedDate) {
    menu.value = false
    formattedDate.value = `${selectedDate.getFullYear()}/${selectedDate.getMonth()}/${selectedDate.getDate()}`
  }
}

const currencies = computed<Currency[]>(() =>
  currencyStore.currencies.filter((currency: Currency) =>
    currency.txt.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

const tableHeader = [
  { title: 'Currency Name', value: 'txt' },
  { title: 'Exchange rate', value: 'rate' },
  { title: 'Exchange date', value: 'exchangedate' },
]

watch(date, (newValue: Date | null) => {
  if (newValue) {
    currencyStore.getCurrenciesInfo({
      isTable: true,
      date: `${newValue.getFullYear()}${newValue.getMonth()}${newValue.getDate()}`,
    })
  }
})
</script>

<template>
  <div class="d-flex">
    <v-text-field class="w-25" v-model="search" placeholder="Search currency"></v-text-field>
    <v-menu class="w-25" v-model="menu" :close-on-content-click="false">
      <template #activator>
        <v-text-field
          v-model="formattedDate"
          label="Pick a date"
          readonly
          @focus="menu = true"
        ></v-text-field>
      </template>

      <v-date-picker v-model="date" @update:modelValue="selectDate" no-title></v-date-picker>
    </v-menu>
  </div>
  <v-data-table :items="currencies" :headers="tableHeader" class="w-100">
    <template v-slot:item="{ item }">
      <tr>
        <td>
          <RouterLink :to="`/edit-currency/${item.cc}`">{{ item.txt }}</RouterLink>
        </td>
        <td>
          {{ item.rate }}
        </td>
        <td>
          {{ item.exchangedate }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
