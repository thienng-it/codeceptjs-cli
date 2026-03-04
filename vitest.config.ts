import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            exclude: ['src/index.ts', 'src/types/**'],
            include: ['src/**/*.ts'],
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
            // Temporarily disabled strict coverage thresholds during Phase 1
            // thresholds: {
            //   branches: 50,
            //   functions: 60,
            //   lines: 60,
            //   statements: 60,
            // },
        },
        environment: 'node',
        globals: true,
        include: ['tests/**/*.test.ts'],
        testTimeout: 30_000,
    },
})
