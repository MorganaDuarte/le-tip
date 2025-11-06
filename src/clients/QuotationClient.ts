export default class QuotationClient {
  currentCurrency: string;
  quotation: string;

  constructor(currentCurrency: string, quotation: string) {
    this.currentCurrency = currentCurrency;
    this.quotation = quotation;
  }
  
  async getQuotationFromApi(): Promise<number> {
    const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${this.currentCurrency}-${this.quotation}`, {
      method: 'GET',
      headers: {
        'Authorization': `x-api-key ${import.meta.env.VITE_AWESOME_API_KEY}`,
      }
    });

    if (!response.ok) throw new Error(`Erro ao buscar cotacao na API da Awesome: ${response.statusText}`);
    const result = await response.json();

    return result.ask;
  }
}
