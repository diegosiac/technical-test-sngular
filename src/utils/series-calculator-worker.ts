import type { WorkerMessageSeriesCalculator } from '@/types/worker-message'
import { SeriesCalculator } from './series-calculator'

const handleMessage = (event: MessageEvent<number>) => {
  try {
    const input = event.data

    if (typeof input !== 'number') {
      throw new Error('El parámetro debe ser un número')
    }

    const result = SeriesCalculator.computeTerm(input)

    const response: WorkerMessageSeriesCalculator = {
      input,
      value: result.toString(),
    }

    self.postMessage(response)
  } catch (error) {
    const errorResponse: WorkerMessageSeriesCalculator = {
      error:
        error instanceof Error
          ? error.message
          : 'Hubo un error al calcular el término, intente nuevamente',
    }

    self.postMessage(errorResponse)
  }
}

const handleError = (error: ErrorEvent) => {
  console.error('Error in worker:', error.message)
  self.postMessage({ error: error.message })
}

self.addEventListener('message', handleMessage)
self.addEventListener('error', handleError)
