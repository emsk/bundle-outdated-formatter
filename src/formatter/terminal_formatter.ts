import * as Table from 'cli-table2'

import {Formatter} from '../formatter'

export class TerminalFormatter extends Formatter {
  convert() {
    const options = {
      head: ['gem', 'newest', 'installed', 'requested', 'groups'],
      style: {
        head: [],
        border: [],
        compact: true
      }
    }

    if (this.style === 'ascii') {
      const asciiOptions = {
        chars: {
          top: '-',
          'top-mid': '+',
          'top-left': '+' ,
          'top-right': '+',
          bottom: '-',
          'bottom-mid': '+',
          'bottom-left': '+',
          'bottom-right': '+',
          left: '|',
          'left-mid': '+',
          mid: '-',
          'mid-mid': '+',
          right: '|',
          'right-mid': '+',
          middle: '|'
        }
      }
      Object.assign(options, asciiOptions)
    }

    const table: any = new Table(options)

    for (const outdatedGem of this.outdatedGems) {
      table.push(Object.values(outdatedGem))
    }

    return table.toString()
  }
}
