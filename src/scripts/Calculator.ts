import MathHelpers from "./MathHelpers";

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

    this.validateAccountValue();
  }

  validateAccountValue(): void {
    if (!this.accountValue) {
      this.accountValue = 0;
    }
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
    return this.calculatePerPersonValue() * MathHelpers.toRound(Number(this.exchangeRate), 2);
  }
}
