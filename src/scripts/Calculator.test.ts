import Calculator from "./Calculator";

describe("Calculator", () => {
  test.each([
    // conta | gorjeta | pessoas | gorjetaCalculada | total | porPessoa | valorBRL
    [73.23, 13, 10, 9.52, 82.75, 8.28, 51.14],
    [60.00, 10, 3, 6.00, 66.00, 22.00, 135.89],
    [13.00, 15, 2, 1.95, 14.95, 7.48, 46.2],
    [2.58, 17, 3, 0.44, 3.02, 1.01, 6.24],
  ])(
    "para account=%s, tip=%s%% e people=%s",
    (account, tip, people, tipCalc, total, perPerson, brlValue) => {
      const exchangeRate = 6.17665;
      const calculator = new Calculator(account, tip, people, exchangeRate);

      expect(calculator.calculateTipValue()).toBe(tipCalc);
      expect(calculator.calculateTotalValue()).toBe(total);
      expect(calculator.calculatePerPersonValue()).toBe(perPerson);
      expect(calculator.calculateValueInBRL()).toBe(brlValue);
    }
  );
});
