import { defineStore } from 'pinia'

import api from '@/api/index'

import type { Currency, CurrencyRequestParam, ChangedCurrency } from '@/types/currency'

type CurrencyState = {
  currencies: Currency[]
  currentCurrency: Currency | null
  changedCurrencies: ChangedCurrency[]
}

export const useCurrencyStore = defineStore('currency', {
  state: (): CurrencyState => ({
    currencies: [],
    currentCurrency: null,
    changedCurrencies: [],
  }),
  actions: {
    async getCurrenciesInfo(params: CurrencyRequestParam) {
      try {
        const { data } = await api.get('/statdirectory/exchange?json', { params })
        if (params.isTable) {
          this.currencies = data
        } else {
          this.currentCurrency = data[0]
          return this.currentCurrency
        }
      } catch (e) {
        console.log(e)
      }
    },

    async updateCurrency(newRate: number) {
      this.changedCurrencies.push({ ...this.currentCurrency, newRate } as ChangedCurrency)
    },
  },
})
