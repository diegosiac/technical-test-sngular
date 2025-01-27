import { createContext } from 'react'
import type { Calculation } from '@/types/calculation'

type CalculationContextValues = {
  calculation: Calculation | null
  isLoading: boolean
  errorMessage: string | null
}

type CalculationContextMethods = {
  handleCalculate: (input: number) => void
}

type CalculationContextType = CalculationContextValues & CalculationContextMethods

export const CalculationContext = createContext<CalculationContextType>({
  calculation: null,
  isLoading: false,
  errorMessage: null,
  handleCalculate: () => {},
})
