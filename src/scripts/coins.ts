type Coin = {
  value: string;
  label: string;
  signal: string;
};

export const coins: [Coin, Coin] = [
  {
    value: 'EUR',
    label: 'EUR',
    signal: '€'
  },
  {
    value: 'USD',
    label: 'USD',
    signal: '$'
  }
]

export const BRL = {
  value: 'BRL',
  label: 'BRL',
  signal: 'R$'
}
