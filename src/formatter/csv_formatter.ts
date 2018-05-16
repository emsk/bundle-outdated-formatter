import * as stringify from 'csv-stringify'

import {Formatter} from '../formatter'

export class CSVFormatter extends Formatter {
  convert() {
    return new Promise(resolve => {
      const options = {header: true, quoted: true, quotedEmpty: true, eof: false}
      stringify(this.outdatedGems, options, (_, output) => {
        resolve(output)
      })
    })
  }
}
