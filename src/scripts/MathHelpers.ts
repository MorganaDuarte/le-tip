export default class MathHelpers {
  static toRound(number: number, precision: number): number {
    return Number(number.toFixed(precision));
  }
}