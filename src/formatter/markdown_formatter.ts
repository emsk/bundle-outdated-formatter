import {Formatter} from '../formatter'

export class MarkdownFormatter extends Formatter {
  private static readonly header = `
| gem | newest | installed | requested | groups |
| --- | --- | --- | --- | --- |
`
  convert() {
    const gems = []
    for (const outdatedGem of this.outdatedGems) {
      gems.push(`| ${Object.values(outdatedGem).join(' | ')} |`.replace(/ {2}/g, ' '))
    }

    return (MarkdownFormatter.header + gems.join('\n')).trim()
  }
}
