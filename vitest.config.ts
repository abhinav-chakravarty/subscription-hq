import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], test: { include: ['src/**/*.test.{ts,tsx}'], maxWorkers: 1, minWorkers: 1, environment: 'jsdom', setupFiles: ['./src/test/setup.ts'] } })
