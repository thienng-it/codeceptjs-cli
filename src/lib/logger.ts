import chalk from 'chalk'
import figures from 'figures'

/**
 * Structured logger utility for consistent CLI output formatting.
 */
export interface Logger {
    divider(): void
    error(message: string): void
    info(message: string): void
    success(message: string): void
    warning(message: string): void
}

export function createLogger(): Logger {
    return {
        divider() {
            console.log(chalk.dim('─'.repeat(60)))
        },

        error(message: string) {
            console.error(`${chalk.red(figures.cross)} ${message}`)
        },

        info(message: string) {
            console.log(`${chalk.blue(figures.info)} ${message}`)
        },

        success(message: string) {
            console.log(`${chalk.green(figures.tick)} ${message}`)
        },

        warning(message: string) {
            console.log(`${chalk.yellow(figures.warning)} ${message}`)
        },
    }
}
