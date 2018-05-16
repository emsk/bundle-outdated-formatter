import {create} from 'xmlbuilder'

import {Formatter} from '../formatter'

export class HTMLFormatter extends Formatter {
  convert() {
    const options = {
      headless: true,
      stringify: {
        elEscape: (value: string) => {
          return value
        }
      }
    }
    const html = create('table', options)
    html.ele({tr: {th: ['gem', 'newest', 'installed', 'requested', 'groups']}})
    for (const outdatedGem of this.outdatedGems) {
      html.ele({tr: {td: Object.values(outdatedGem)}})
    }

    return html.end({allowEmpty: true, pretty: this.isPretty}).trim()
  }
}
