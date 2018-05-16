import {create} from 'xmlbuilder'

import {Formatter} from '../formatter'

export class XMLFormatter extends Formatter {
  convert() {
    const options = {
      encoding: 'UTF-8',
      stringify: {
        elEscape: (value: string) => {
          return value
        }
      }
    }
    const xml = create('gems', options)
    for (const outdatedGem of this.outdatedGems) {
      xml.ele({outdated: outdatedGem})
    }

    return xml.end({allowEmpty: true, pretty: this.isPretty}).trim()
  }
}
