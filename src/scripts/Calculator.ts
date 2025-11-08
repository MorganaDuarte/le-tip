export default class Calculator {
  accountValue: number;
  tip: number;
  people: number;
  exchangeRate: number;

  constructor(accountValue: number, tip: number, people: number, exchangeRate: number) {
    this.accountValue = accountValue
    this.tip = tip
    this.people = people
    this.exchangeRate = exchangeRate
  }
  
  calculateTipValue(): number {
    return this.accountValue * this.tip / 100;
  }

  calculateTotalValue(): number {
    return this.accountValue + this.calculateTipValue();
  }

  calculatePerPersonValue(): number {
    return this.calculateTotalValue() / this.people;
  }

  calculateValueInBRL(): number {
    return this.calculatePerPersonValue() * this.exchangeRate;
  }
    
}
