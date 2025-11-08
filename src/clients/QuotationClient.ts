import { coins } from '../scripts/coins';

export default class QuotationClient {
  quotation: string;

  constructor(quotation: string) {
    this.quotation = quotation;
  }
  
  async getQuotationsFromApi(): Promise<object> {
    const urlPairs = coins.map(coin => `${coin.value}-${this.quotation}`).join(',');
    const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${urlPairs}`, {
      method: 'GET',
      headers: {
        'Authorization': `x-api-key ${import.meta.env.VITE_AWESOME_API_KEY}`,
      }
    });

    if (!response.ok) throw new Error(`Erro ao buscar cotacao na API da Awesome: ${response.statusText}`);
    return response.json();
  }
}
