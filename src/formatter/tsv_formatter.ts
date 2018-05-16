import * as stringify from 'csv-stringify'

import {Formatter} from '../formatter'

export class TSVFormatter extends Formatter {
  convert() {
    return new Promise(resolve => {
      const options = {header: true, quoted: true, quotedEmpty: true, eof: false, delimiter: '\t'}
      stringify(this.outdatedGems, options, (_, output) => {
        resolve(output)
      })
    })
  }
}
