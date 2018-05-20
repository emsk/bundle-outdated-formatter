import {Command, flags} from '@oclif/command'

import {CSVFormatter} from './formatter/csv_formatter'
import {HTMLFormatter} from './formatter/html_formatter'
import {JSONFormatter} from './formatter/json_formatter'
import {MarkdownFormatter} from './formatter/markdown_formatter'
import {TerminalFormatter} from './formatter/terminal_formatter'
import {TSVFormatter} from './formatter/tsv_formatter'
import {XMLFormatter} from './formatter/xml_formatter'
import {YAMLFormatter} from './formatter/yaml_formatter'

class BundleOutdatedFormatter extends Command {
  static description = 'Format output of `bundle outdated`'
  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    format: flags.string({char: 'f', description: 'Format. (terminal, markdown, json, yaml, csv, tsv, xml, html)', default: 'terminal'}),
    pretty: flags.boolean({char: 'p', description: '`true` if pretty output.'}),
    style: flags.string({char: 's', description: 'Terminal table style. (unicode, ascii)', default: 'unicode'})
  }
  private static readonly formats = ['terminal', 'markdown', 'json', 'yaml', 'csv', 'tsv', 'xml', 'html']
  private static readonly styles = ['unicode', 'ascii']

  async run() {
    const {flags} = this.parse(BundleOutdatedFormatter)

    if (!this.isAllowFormat(flags.format)) {
      this.error(`Unknown format: ${flags.format}`)
    }

    if (!this.isAllowStyle(flags.style)) {
      this.error(`Unknown style: ${flags.style}`)
    }

    if (process.stdin.isTTY) {
      process.exit()
    }

    const formatter = this.createFormatter(flags)
    await formatter.readStdin()
    this.log(await formatter.convert())
  }

  private isAllowFormat(format: string | undefined) {
    return format === undefined ? false : BundleOutdatedFormatter.formats.includes(format)
  }

  private isAllowStyle(style: string | undefined) {
    return style === undefined ? false : BundleOutdatedFormatter.styles.includes(style)
  }

  private createFormatter(flags: any) {
    let formatter = TerminalFormatter
    switch (flags.format) {
      case 'terminal':
        formatter = TerminalFormatter
        break
      case 'markdown':
        formatter = MarkdownFormatter
        break
      case 'json':
        formatter = JSONFormatter
        break
      case 'yaml':
        formatter = YAMLFormatter
        break
      case 'csv':
        formatter = CSVFormatter
        break
      case 'tsv':
        formatter = TSVFormatter
        break
      case 'xml':
        formatter = XMLFormatter
        break
      case 'html':
        formatter = HTMLFormatter
    }

    return new formatter(flags)
  }
}

export = BundleOutdatedFormatter
