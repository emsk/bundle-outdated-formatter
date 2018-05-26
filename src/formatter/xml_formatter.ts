import {create} from 'xmlbuilder'

import {Formatter} from '../formatter'

export class XMLFormatter extends Formatter {
  convert() {
    const xml = create('gems', {encoding: 'UTF-8'})
    for (const outdatedGem of this.outdatedGems) {
      xml.ele({outdated: outdatedGem})
    }

    return xml.end({allowEmpty: true, pretty: this.isPretty}).trim()
  }
}
