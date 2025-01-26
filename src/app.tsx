import { SerieCalculationCard } from '@/components/serie-calculation-card'

function App() {
  return (
    <div className="flex flex-col gap-10 py-20">
      <h1 className="text-3xl font-bold text-balance text-center">Cálculo de Serie Numérica</h1>

      <SerieCalculationCard />
    </div>
  )
}

export default App
