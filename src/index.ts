import {Command, flags} from '@oclif/command'

import {TerminalFormatter} from './formatter/terminal_formatter'

class BundleOutdatedFormatter extends Command {
  static description = 'Format output of `bundle outdated`'
  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    format: flags.string({char: 'f', description: 'Format. (terminal)', default: 'terminal'}),
  }
  private static readonly formats = ['terminal']

  async run() {
    const {flags} = this.parse(BundleOutdatedFormatter)

    if (!this.isAllowFormat(flags.format)) {
      this.error(`Unknown format: ${flags.format}`)
    }

    if (process.stdin.isTTY) {
      process.exit()
    }

    const formatter = this.createFormatter(flags.format)
    await formatter.readStdin()
    this.log(formatter.convert())
  }

  private isAllowFormat(format: string | undefined) {
    return format === undefined ? false : BundleOutdatedFormatter.formats.includes(format)
  }

  private createFormatter(format: string | undefined) {
    let formatter = TerminalFormatter
    switch (format) {
      case 'terminal':
        formatter = TerminalFormatter
    }

    return new formatter()
  }
}

export = BundleOutdatedFormatter
