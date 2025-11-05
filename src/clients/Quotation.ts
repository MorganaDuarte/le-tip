export default class Quotation {
  currentCurrency: string;
  quotation: string;

  constructor(currentCurrency: string, quotation: string) {
    this.currentCurrency = currentCurrency;
    this.quotation = quotation;
  }
  
  async getQuotationFromApi(): Promise<number> {
    const response = await fetch(`https://swop.cx/rest/rates/${this.currentCurrency}/${this.quotation}`, {
      method: 'GET',
      headers: {
        'Authorization': `ApiKey ${import.meta.env.VITE_SWOP_API_KEY}`,
      }
    });

    if (!response.ok) throw new Error(`Erro ao buscar cotacao na API da Swop.cx: ${response.statusText}`);
    const result = await response.json();

    return result.quote;
  }
}
