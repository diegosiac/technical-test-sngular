export type WorkerMessageSeriesCalculator =
  | {
      input: number
      value: string
    }
  | {
      error: string
    }