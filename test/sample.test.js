const { currencyFormat } = require("../helpers/numberFormat");
const { definePrototypes } = require("../helpers/prototypes");
definePrototypes();

describe('Leading zeros to a number', () => {
    const numero = 10;
    it('10 -> 000010', () => {
        expect(numero.pad(6)).toBe('000010')
    });
});

describe('Number to currency-format', () => {
    const numero = 10;
    it('10 -> MX$ 10.00', () => {
        expect(currencyFormat(10)).toContain('MX$')
    });
});