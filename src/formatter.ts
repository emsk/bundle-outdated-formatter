import {createInterface} from 'readline'

export class Formatter {
  private static readonly gemRegexp = /^(\* )*(.+) \(/
  private static readonly newestRegexp = /newest ([\d\.]+)/
  private static readonly installedRegexp = /installed ([\d\.]+)/
  private static readonly requestedRegexp = /requested (.+)\)/
  private static readonly groupsRegexp = /in groups "(.+)"/
  protected readonly outdatedGems: object[] = []

  readStdin() {
    return new Promise(resolve => {
      const readLine = createInterface({
        input: process.stdin,
        terminal: false
      })

      readLine.on('line', line => {
        if (line === '') {
          return
        }

        line = line.replace(/^\s+|\s+$/g, '')
        const findedGem = this.findGem(line)
        if (findedGem !== null) {
          this.outdatedGems.push(findedGem)
        }
      })

      readLine.on('close', () => {
        resolve(this.outdatedGems)
      })
    })
  }

  private findGem(line: string) {
    const matched = this.matchGem(line)
    if (!this.isMatchGem(matched)) {
      return null
    }

    return {
      gem:       this.gemText(matched.gem, 2),
      newest:    this.gemText(matched.newest, 1),
      installed: this.gemText(matched.installed, 1),
      requested: this.gemText(matched.requested, 1),
      groups:    this.gemText(matched.groups, 1)
    }
  }

  private matchGem(line: string) {
    return {
      gem:       Formatter.gemRegexp.exec(line),
      newest:    Formatter.newestRegexp.exec(line),
      installed: Formatter.installedRegexp.exec(line),
      requested: Formatter.requestedRegexp.exec(line),
      groups:    Formatter.groupsRegexp.exec(line)
    }
  }

  private isMatchGem(matched: object) {
    return Object.values(matched).some(value => {
      return value !== null
    })
  }

  private gemText(text: RegExpExecArray | null, index: number) {
    return text === null ? null : text[index]
  }
}
