import { CalculationProvider } from '@/providers/calculation'
import { SerieCalculationForm } from './serie-calculation-form'
import { SerieCalculationResult } from './serie-calculation-result'

export const SerieCalculationCard = () => {
  return (
    <div className="rounded-md p-6 shadow-2xl space-y-2 bg-card w-[min(100vw,500px)]">
      <CalculationProvider>
        <SerieCalculationForm />

        <SerieCalculationResult />
      </CalculationProvider>
    </div>
  )
}
