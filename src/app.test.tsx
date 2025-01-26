import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './app.tsx'

vi.mock('@/components/serie-calculation-card', () => ({
  SerieCalculationCard: () => <div>hello world</div>,
}))

describe('App Component', () => {
  it('should display correct heading', () => {
    render(<App />)

    const heading = screen.getByRole('heading', {
      level: 1,
    })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Cálculo de Serie Numérica')
  })
})
