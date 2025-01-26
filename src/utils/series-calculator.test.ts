import { describe, expect, it, test } from 'vitest'
import { SeriesCalculator } from './series-calculator'

describe('SeriesCalculator', () => {
  const testErrorCases = (method: (input: bigint) => bigint) => {
    describe('should throw RangeError for', () => {
      it('undefined input', () => {
        expect(() => method(undefined as any)).toThrowErrorMatchingSnapshot()
      })

      it('negative numbers', () => {
        expect(() => method(-5n)).toThrowErrorMatchingSnapshot()
      })

      it('zero', () => {
        expect(() => method(0n)).toThrowErrorMatchingSnapshot()
      })
    })
  }

  describe('triangular() method', () => {
    testErrorCases(SeriesCalculator.triangular)

    describe('valid inputs', () => {
      const testCases = [
        { input: 1n, expected: 1n },
        { input: 3n, expected: 6n },
        { input: 10n, expected: 55n },
        { input: 100n, expected: 5050n },
      ]

      test.each(testCases)('$input => $expected', ({ input, expected }) => {
        expect(SeriesCalculator.triangular(input)).toBe(expected)
      })
    })
  })

  describe('fibonacci() method', () => {
    testErrorCases(SeriesCalculator.fibonacci)

    describe('valid inputs', () => {
      const testCases = [
        { input: 1n, expected: 1n },
        { input: 2n, expected: 1n },
        { input: 10n, expected: 55n },
        { input: 20n, expected: 6765n },
        { input: 50n, expected: 12586269025n },
      ]

      test.each(testCases)('$input => $expected', ({ input, expected }) => {
        expect(SeriesCalculator.fibonacci(input)).toBe(expected)
      })
    })
  })

  describe('prime() method', () => {
    testErrorCases(SeriesCalculator.prime)

    describe('valid inputs', () => {
      const testCases = [
        { input: 1n, expected: 2n },
        { input: 4n, expected: 7n },
        { input: 10n, expected: 29n },
        { input: 50n, expected: 229n },
        { input: 100n, expected: 541n },
      ]

      test.each(testCases)('$input => $expected', ({ input, expected }) => {
        expect(SeriesCalculator.prime(input)).toBe(expected)
      })
    })
  })

  describe('computeTerm() method', () => {
    const testCases = [
      { input: 1, expected: 0n },
      { input: 2, expected: 6n },
      { input: 5, expected: 39n },
      { input: 10, expected: 126n },
      { input: 13, expected: 77n },
      { input: 17, expected: -1061n },
      { input: 20, expected: -6016n },
      { input: 25, expected: -73847n },
      { input: 30, expected: -830323n },
      {input: 50, expected: -12586264204n},
    ]

    test.each(testCases)('term $input => $expected', ({ input, expected }) => {
      expect(SeriesCalculator.computeTerm(input)).toBe(expected)
    })

    test('should throw for invalid inputs', () => {
      expect(() => SeriesCalculator.computeTerm(0)).toThrow()
      expect(() => SeriesCalculator.computeTerm(-1)).toThrow()
      expect(() => SeriesCalculator.computeTerm(1.5)).toThrow()
    })
  })
})
