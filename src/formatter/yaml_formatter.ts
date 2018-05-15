import {safeDump} from 'js-yaml'

import {Formatter} from '../formatter'

export class YAMLFormatter extends Formatter {
  convert() {
    return `---\n${safeDump(this.outdatedGems)}`.trim()
  }
}
