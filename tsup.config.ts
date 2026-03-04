import { defineConfig } from 'tsup'

export default defineConfig({
    bundle: true,
    clean: true,
    dts: true,
    entry: [
        'src/index.ts',
        'src/hooks/init.ts',
        'src/commands/**/*.ts'
    ],
    external: [
        'codeceptjs',
        '@oclif/core'
    ],
    format: ['esm'],
    minify: false,
    sourcemap: true,
    splitting: false,
    target: 'node22',
})
