import { describe, expect, it } from 'vitest'

import { CliError, ExitCode } from '../../../src/lib/errors.js'

describe('errors', () => {
    describe('ExitCode', () => {
        it('should have SUCCESS as 0', () => {
            expect(ExitCode.SUCCESS).toBe(0)
        })

        it('should have distinct exit codes', () => {
            const codes = Object.values(ExitCode).filter((v) => typeof v === 'number')
            const uniqueCodes = new Set(codes)
            expect(uniqueCodes.size).toBe(codes.length)
        })
    })

    describe('CliError', () => {
        it('should create error with message and exit code', () => {
            const error = new CliError('test error', ExitCode.CONFIG_NOT_FOUND)
            expect(error.message).toBe('test error')
            expect(error.exitCode).toBe(ExitCode.CONFIG_NOT_FOUND)
            expect(error.name).toBe('CliError')
        })

        it('should default to GENERAL_ERROR exit code', () => {
            const error = new CliError('test error')
            expect(error.exitCode).toBe(ExitCode.GENERAL_ERROR)
        })

        it('should be instanceof Error', () => {
            const error = new CliError('test')
            expect(error).toBeInstanceOf(Error)
        })
    })
})
