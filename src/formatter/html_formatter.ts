import {create} from 'xmlbuilder'

import {Formatter} from '../formatter'

export class HTMLFormatter extends Formatter {
  convert() {
    const html = create('table', {headless: true})
    html.ele({tr: {th: ['gem', 'newest', 'installed', 'requested', 'groups']}})
    for (const outdatedGem of this.outdatedGems) {
      html.ele({tr: {td: Object.values(outdatedGem)}})
    }

    return html.end({allowEmpty: true, pretty: this.isPretty}).trim()
  }
}
