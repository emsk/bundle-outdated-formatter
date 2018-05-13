import * as Table from 'cli-table2'

import {Formatter} from '../formatter'

export class TerminalFormatter extends Formatter {
  convert() {
    const table: any = new Table({
      head: ['gem', 'newest', 'installed', 'requested', 'groups'],
      style: {
        head: [],
        border: [],
        compact: true
      }
    })

    for (const outdatedGem of this.outdatedGems) {
      table.push(Object.values(outdatedGem))
    }

    return table.toString()
  }
}
