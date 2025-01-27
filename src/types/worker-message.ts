export type WorkerMessageSeriesCalculator =
  | {
      input: number
      result: string
    }
  | {
      error: string
    }