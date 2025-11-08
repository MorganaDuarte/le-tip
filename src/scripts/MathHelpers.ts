export default class MathHelpers {
  static toRound(number: number, precision: number): number {
    return Number(number.toFixed(precision));
  }

  static formatNumberByCurrency(value: number, locale: string): string {
    if (!value || value === 0) return '0,00'

    return new Intl.NumberFormat(locale, {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)
  }
}