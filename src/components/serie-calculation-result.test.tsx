import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SerieCalculationResult } from './serie-calculation-result'

describe('SerieCalculationResult Component', () => {
  it('should to match snapshot', () => {
    const { container } = render(
      <SerieCalculationResult result="200" loading={false} errorMessage={null} />
    )

    expect(container).toMatchSnapshot()
  })

  it('should not render the result label if there is no result', () => {
    render(<SerieCalculationResult result={null} loading={false} errorMessage={null} />)

    const resultLabel = screen.queryByLabelText('Resultado:')

    expect(resultLabel).not.toBeInTheDocument()
  })

  it('should render the result', () => {
    const expectedResult = '200'

    render(<SerieCalculationResult result={expectedResult} loading={false} errorMessage={null} />)

    const result = screen.getByText(expectedResult)
    expect(result).toBeInTheDocument()
  })

  it('should render the loading message', () => {
    render(<SerieCalculationResult result={null} loading errorMessage={null} />)

    const result = screen.getByText('Un momento, resolviendo cálculo...')
    expect(result).toBeInTheDocument()
  })

  it('should render the error message', () => {
    const expectErrorMessage = 'Hubo un error al hacer el calculo'

    render(
      <SerieCalculationResult result={null} loading={false} errorMessage={expectErrorMessage} />
    )

    const result = screen.getByText(expectErrorMessage)

    expect(result).toBeInTheDocument()
  })
})
