export type Currency = {
  r030: number
  txt: string
  rate: number
  cc: string
  exchangedate: string
}

export type ChangedCurrency = Currency & { newRate: number }

export type CurrencyRequestParam = {
  isTable?: boolean
  date?: string
  valcode?: string
}
