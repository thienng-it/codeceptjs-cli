/**
 * Structured exit codes for the CLI.
 * Follows Unix convention: 0 = success, 1 = general error, 2+ = specific errors.
 */
export enum ExitCode {
    BROWSER_INSTALL_FAILED = 21,
    CONFIG_INVALID = 11,
    CONFIG_NOT_FOUND = 10,
    DEPENDENCY_MISSING = 20,
    GENERAL_ERROR = 1,
    SUCCESS = 0,
    TEST_EXECUTION_FAILED = 30,
    USER_CANCELLED = 40,
}

/**
 * Custom error class with structured exit codes for clean CLI error reporting.
 */
export class CliError extends Error {
    readonly exitCode: ExitCode

    constructor(message: string, exitCode: ExitCode = ExitCode.GENERAL_ERROR) {
        super(message)
        this.name = 'CliError'
        this.exitCode = exitCode
    }
}
