import {Formatter} from '../formatter'

export class JSONFormatter extends Formatter {
  convert() {
    const space = this.isPretty ? '  ' : ''
    return JSON.stringify(this.outdatedGems, null, space)
  }
}
