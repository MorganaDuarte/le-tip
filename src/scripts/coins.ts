type Coin = {
  value: string;
  label: string;
  signal: string;
  locale: string;
};

export const coins: [Coin, Coin] = [
  {
    value: 'EUR',
    label: 'EUR',
    signal: '€',
    locale: 'de-DE'
  },
  {
    value: 'USD',
    label: 'USD',
    signal: '$',
    locale: 'en-US'
  }
]

export const BRL = {
  value: 'BRL',
  label: 'R$',
  signal: 'R$',
  locale: 'pt-BR'
}
