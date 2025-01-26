import { cn } from '@/utils/cn'

const LOADING_MESSAGE = 'Un momento, resolviendo cálculo...'

interface SerieCalculationResultProps {
  result: string | null
  loading: boolean
  errorMessage: string | null
}

export const SerieCalculationResult = ({
  result,
  loading,
  errorMessage,
}: SerieCalculationResultProps) => {
  const term = 'n'

  const showResultSection = result !== null || loading

  const resultContent = result ?? LOADING_MESSAGE

  return (
    <div className="flex flex-col gap-2" aria-live="polite">
      <label className="label">Operación:</label>
      <span className="text-xs bg-primary p-2 rounded-md">
        serie({term}) = triangular({term} * 2) - primo({term}) - fibonacci({term})
      </span>

      {showResultSection && (
        <>
          <label className="label mt-4">Resultado:</label>
          <span
            className={cn('bg-primary p-2 rounded-md text-xs break-words', {
              'animate-pulse': loading,
            })}
            aria-busy={loading}
          >
            {resultContent}
          </span>
        </>
      )}

      {errorMessage && (
        <span className="text-xs text-destructive" aria-live="polite">
          {errorMessage}
        </span>
      )}
    </div>
  )
}
