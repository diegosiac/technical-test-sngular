import { useCallback, useState } from 'react'
import { useWorker } from '@/hooks/use-worker'
import type { WorkerMessageSeriesCalculator } from '@/types/worker-message'
import { SerieCalculationForm } from './serie-calculation-form'
import { SerieCalculationResult } from './serie-calculation-result'
import { useCalculationCache } from '@/hooks/use-calculation-cache'
import useMountedState from '@/hooks/use-mounted-state'

export const SerieCalculationCard = () => {
  const [result, setResult] = useState<string | null>(null)
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

      const { input, value } = data

      persistCache({ input, value })

      setResult(value)
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
    (value: number) => {
      setErrorMessage(null)
      setResult(null)

      if (hasInCache(value)) {
        setResult(getFromCache(value)!)
        return
      }

      setIsLoading(true)
      postMessage(value)
    },
    [postMessage, getFromCache, hasInCache]
  )

  return (
    <div className="rounded-md p-6 shadow-2xl space-y-2 bg-card w-[min(100vw,500px)]">
      <SerieCalculationForm onCalculate={handleCalculate} loading={isLoading} />

      <SerieCalculationResult result={result} loading={isLoading} errorMessage={errorMessage} />
    </div>
  )
}
