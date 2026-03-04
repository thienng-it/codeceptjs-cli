import { Hook } from '@oclif/core'
import chalk from 'chalk'

/**
 * Oclif init hook — runs before every command.
 * Used for pre-flight environment checks and branding.
 */
const hook: Hook<'init'> = async function (options) {
  // Display CLI branding header (only for interactive usage)
  if (process.stdout.isTTY && options.id !== 'help') {
    console.log(chalk.dim(`ccjs v${options.config.version}\n`))
  }
}

export default hook
