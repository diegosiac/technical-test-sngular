import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SerieCalculationResult } from './serie-calculation-result'
import { UseCalculationStatesReturn } from '@/hooks/use-calculation'

const mocks = vi.hoisted(() => {
  return {
    useCalculation: vi.fn<() => UseCalculationStatesReturn>(),
  }
})

vi.mock('@/hooks/use-calculation.ts', () => ({
  useCalculation: mocks.useCalculation,
}))

describe('SerieCalculationResult Component', () => {
  it('should to match snapshot', () => {
    mocks.useCalculation.mockReturnValue({
      calculation: {
        input: 5,
        result: '200',
      },
      isLoading: false,
      errorMessage: null,
    })

    const { container } = render(<SerieCalculationResult />)

    expect(container).toMatchSnapshot()
  })

  it('should not render the result label if there is no result', () => {
    mocks.useCalculation.mockReturnValue({
      calculation: null,
      isLoading: false,
      errorMessage: null,
    })

    render(<SerieCalculationResult />)

    const resultLabel = screen.queryByLabelText('Resultado:')

    expect(resultLabel).not.toBeInTheDocument()
  })

  it('should render the result', () => {
    const expectedResult = '200'

    mocks.useCalculation.mockReturnValue({
      calculation: {
        input: 5,
        result: expectedResult,
      },
      isLoading: false,
      errorMessage: null,
    })

    render(<SerieCalculationResult />)

    const result = screen.getByText(expectedResult)
    expect(result).toBeInTheDocument()
  })

  it('should render the loading message', () => {
    mocks.useCalculation.mockReturnValue({
      calculation: null,
      isLoading: true,
      errorMessage: null,
    })

    render(<SerieCalculationResult />)

    const result = screen.getByText('Un momento, resolviendo cálculo...')
    expect(result).toBeInTheDocument()
  })

  it('should render the error message', () => {
    const expectErrorMessage = 'Hubo un error al hacer el calculo'

    mocks.useCalculation.mockReturnValue({
      calculation: null,
      isLoading: false,
      errorMessage: expectErrorMessage,
    })

    render(<SerieCalculationResult />)

    const result = screen.getByText(expectErrorMessage)

    expect(result).toBeInTheDocument()
  })
})
