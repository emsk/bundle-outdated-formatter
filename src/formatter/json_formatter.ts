import {Formatter} from '../formatter'

export class JSONFormatter extends Formatter {
  convert() {
    const replacer = (_: any, value: string | null) => {
      return value === null ? '' : value
    }
    const space = this.isPretty ? '  ' : ''

    return JSON.stringify(this.outdatedGems, replacer, space)
  }
}
