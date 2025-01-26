import { type ChangeEvent, type FormEvent, useCallback, useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'

const getValidationError = (value: string): string => {
  if (!value) return 'El campo es requerido'

  const number = parseInt(value, 10)

  if (Number.isNaN(number)) return 'El número es inválido'
  if (number < 1) return 'El número debe ser igual o mayor a 1'

  return ''
}

interface SerieCalculationFormProps {
  loading: boolean
  onCalculate: (value: number) => void
}

export const SerieCalculationForm = ({ loading, onCalculate }: SerieCalculationFormProps) => {
  const [input, setInput] = useState<string>('')

  const errorMessage = useMemo(() => getValidationError(input), [input])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/\D/g, '')
    setInput(sanitizedValue)
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (errorMessage) return

    const numberValue = parseInt(input, 10)

    onCalculate(numberValue)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <div className="flex flex-col gap-2 h-[82px] w-full">
        <label htmlFor="input-n" className="label">
          Término (n)
        </label>
        <input
          id="input-n"
          type="text"
          className="input"
          inputMode="numeric"
          placeholder="Ingrese un número natural"
          value={input}
          onChange={handleInputChange}
          pattern="\d*"
        />
        <span className="text-xs text-destructive">{errorMessage}</span>
      </div>

      <button type="submit" className="btn" disabled={loading || !!errorMessage}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Calculando
          </>
        ) : (
          <>Calcular</>
        )}
      </button>
    </form>
  )
}
