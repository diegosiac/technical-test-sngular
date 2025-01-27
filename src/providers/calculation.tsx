import { useCallback, useState, type PropsWithChildren } from 'react'
import { useWorker } from '@/hooks/use-worker'
import type { WorkerMessageSeriesCalculator } from '@/types/worker-message'
import { useCalculationCache } from '@/hooks/use-calculation-cache'
import useMountedState from '@/hooks/use-mounted-state'
import { CalculationContext } from '@/context/calculation'
import { Calculation } from '@/types/calculation'

export const CalculationProvider = ({ children }: PropsWithChildren) => {
  const [calculation, setCalculation] = useState<Calculation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { persistCache, getFromCache, hasInCache } = useCalculationCache()
  const isMounted = useMountedState()

  const handleOnMessage = useCallback(
    (data: WorkerMessageSeriesCalculator) => {
      if (!isMounted()) return

      if ('error' in data) {
        setErrorMessage(data.error)
        setIsLoading(false)
        return
      }

      persistCache(data)

      setCalculation(data)
      setIsLoading(false)
    },
    [persistCache, isMounted]
  )

  const { postMessage } = useWorker({
    filePath: '../utils/series-calculator-worker.ts',
    onMessage: handleOnMessage,
    type: 'module',
  })

  const handleCalculate = useCallback(
    (input: number) => {
      setErrorMessage(null)
      setCalculation(null)

      if (hasInCache(input)) {
        const calculationResult = getFromCache(input)!

        const newCalculation = {
            input,
            result: calculationResult,
        }

        setCalculation(newCalculation)
        return
      }

      setIsLoading(true)
      postMessage(input)
    },
    [postMessage, getFromCache, hasInCache]
  )

  return (
    <CalculationContext.Provider value={{ 
        calculation,
        isLoading,
        errorMessage,
        handleCalculate,
    }}>
      {children}
    </CalculationContext.Provider>
  )
}
