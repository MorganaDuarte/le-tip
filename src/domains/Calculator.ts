import MathHelpers from "../helpers/MathHelpers";

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
    const tipValue = this.accountValue * this.tip / 100
    return MathHelpers.toRound(tipValue, 2);
  }

  calculateTotalValue(): number {
    const totalValue = this.accountValue + this.calculateTipValue();
    return MathHelpers.toRound(totalValue, 2);
  }

  calculatePerPersonValue(): number {
    const perPersonValue = this.calculateTotalValue() / this.people;
    return MathHelpers.toRound(perPersonValue, 2);
  }

  calculateValueInBRL(): number {
    const valueInBRL = this.calculatePerPersonValue() * this.exchangeRate;
    return MathHelpers.toRound(valueInBRL, 2);
  }
}
