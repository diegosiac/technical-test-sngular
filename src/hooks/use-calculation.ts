import { useContext } from "react"
import { CalculationContext } from "@/context/calculation"
import type { Calculation } from "@/types/calculation"

export interface UseCalculationStatesReturn {
    calculation: Calculation | null
    isLoading: boolean
    errorMessage: string | null
}

export interface UseCalculationMethodsReturn {
    handleCalculate: (input: number) => void
}

export type UseCalculationReturn = UseCalculationStatesReturn & UseCalculationMethodsReturn

export const useCalculation = (): UseCalculationReturn => {
    const context = useContext(CalculationContext)
    
    if (!context) {
        throw new Error("useCalculation must be used within a CalculationProvider")
    }

    return {
        calculation: context.calculation,
        isLoading: context.isLoading,
        errorMessage: context.errorMessage,
        handleCalculate: context.handleCalculate,
    }
}
