import {Formatter} from '../formatter'

export class JSONFormatter extends Formatter {
  convert() {
    return JSON.stringify(this.outdatedGems, (_, value) => {
      return value === null ? '' : value
    })
  }
}
