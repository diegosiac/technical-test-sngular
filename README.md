# Solución Prueba Técnica

¡Bienvenido/a al repositorio de la prueba técnica! Aquí encontrarás los detalles para configurar y ejecutar el proyecto, así como información relevante sobre las decisiones técnicas tomadas.

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=fff)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

## 📋 Descripción del Proyecto

Solución para calcular términos de la serie especial:

`serie(n) = triangular(n * 2) - primo(n) - fibonacci(n)`

## ✨ Features Principales

- Cálculos intensivos en Web Workers
- Manejo de números grandes con `BigInt`
- Sistema de caché para resultados
- UI responsiva con TailwindCSS

## 🛠 Configuración Inicial

1. **Clonar repositorio**

   ```bash
   git clone https://github.com/diegosiac/technical-test-sngular.git
   cd technical-test-sngular
   ```

2. **Instalar dependencias**

   ```bash
   pnpm install
   ```

3. **Iniciar servidor de desarrollo**

   ```bash
   pnpm dev
   ```

## 🧪 Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas
pnpm test

# Ejecutar con cobertura
pnpm test:coverage
```

## 🚀 Comandos Disponibles

| Comando            | Descripción                          |
| ------------------ | ------------------------------------ |
| pnpm dev           | Inicia servidor de desarrollo        |
| pnpm build         | Genera build para producción         |
| pnpm preview       | Sirve build de producción localmente |
| pnpm test          | Ejecuta pruebas unitarias            |
| pnpm test:coverage | Genera reporte de cobertura          |
| pnpm lint          | Ejecuta linter                       |
| pnpm format        | Formatea código automáticamente      |

## 🧠 Decisiones Técnicas Clave

### ⚡ Web Workers

- **Motivación**: Evitar bloqueos en el hilo principal durante cálculos intensivos

- **Implementación**:

  - Worker dedicado para calculo de término n de la serie
  - Comunicación via `postMessage` con tipos TypeScript

### 🔢 BigInt

- Utilizado para manejar números grandes en:

  - Secuencia de Fibonacci

  - Números primos

  - Números triangulares

### 🗄 Sistema de Caché

- Almacena resultados previos

- Reduce cálculos redundantes

- Implementado con un custom hook React

## 🗂 Estructura de Directorios

```
src/
├── components/      # Componentes React
├── hooks/           # Custom Hooks
├── utils/           # Lógica de cálculos y Web Workers
├── types/           # Definiciones TypeScript
└── test.setup.ts    # Configuración de pruebas
```

## 🧩 Componentes Principales

1. `<SerieCalculationForm/>`

   - Formulario para ingresar el número n

   - Validación de entrada

   - Manejo de estado local

2. `<SerieCalculator/>` (Lógica)

   - Coordina cálculos usando Web Workers

   - Implementa caché de resultados

   - Manejo de errores

3. `<SerieCalculationResult/>`

   - Muestra resultados

   - Estado de carga/error
