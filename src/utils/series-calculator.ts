export class SeriesCalculator {
  private static validateInput(number: bigint): void {
    if (typeof number !== 'bigint' || number <= 0n) {
      throw new RangeError('El número debe ser un número natural (no negativo)')
    }
  }

  static triangular(number: bigint): bigint {
    SeriesCalculator.validateInput(number)

    return (number * (number + 1n)) / 2n
  }

  static fibonacci(number: bigint): bigint {
    SeriesCalculator.validateInput(number)

    if (number === 1n || number === 2n) return 1n

    let a = 1n
    let b = 1n

    for (let i = 3n; i <= number; i++) {
      [a, b] = [b, a + b]
    }

    return b
  }

  private static isPrime(number: bigint): boolean {
    if (number < 2n) return false

    for (let i = 2n; i * i <= number; i++) {
      if (number % i === 0n) return false
    }

    return true
  }

  static prime(number: bigint): bigint {
    SeriesCalculator.validateInput(number)

    let count = 0n
    let current = 2n

    while (true) {
      if (SeriesCalculator.isPrime(current)) {
        count++
      }

      if (count === number) {
        return current
      }

      current++
    }
  }

  static computeTerm(value: number): bigint {
    const number = BigInt(value)
    SeriesCalculator.validateInput(number)

    const triangular = SeriesCalculator.triangular(number * 2n)
    const prime = SeriesCalculator.prime(number)
    const fibonacci = SeriesCalculator.fibonacci(number)

    return triangular - prime - fibonacci
  }
}
