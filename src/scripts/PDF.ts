
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { Coin } from "./coins";

pdfMake.vfs = pdfFonts.vfs;

export default class PDF {
  selectedCoin: Coin
  accountValue: number
  tip: number
  people: number
  totalValue: string
  perPersonValue: string
  valueInBRL: string
  tipValue: string
  exchangeRate: number

  constructor(selectedCoin: Coin, accountValue: number, tip: number, people: number, totalValue: string, perPersonValue: string, valueInBRL: string, tipValue: string, exchangeRate: number) {
    this.selectedCoin = selectedCoin;
    this.accountValue = accountValue;
    this.tip = tip;
    this.people = people;
    this.totalValue = totalValue;
    this.perPersonValue = perPersonValue;
    this.valueInBRL = valueInBRL;
    this.tipValue = tipValue;
    this.exchangeRate = exchangeRate;
  }

  generatePDF = () => {
    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Calculadora de gorjetas', style: 'header' },
        { text: `Moeda: ${this.selectedCoin.value}` },
        { text: `Conta: ${this.accountValue}` },
        { text: `Gorjeta: ${this.tip}` },
        { text: `Pessoas: ${this.people}` },
        { text: `Valor da gorjeta: ${this.tipValue}` },
        { text: `Total: ${this.totalValue}` },
        { text: `Por pessoa: ${this.perPersonValue}` },
        { text: `Taxa de câmbio: ${this.exchangeRate}` },
        { text: `Valor em BRL: ${this.valueInBRL}` },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] }
      }
    };
    
    pdfMake.createPdf(docDefinition).download("relatorio.pdf");
  };
}
