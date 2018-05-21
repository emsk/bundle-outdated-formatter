import test from 'ava'
import * as execa from 'execa'

const command = './bin/run'
const stdin = `
Fetching gem metadata from https://rubygems.org/..........
Fetching version metadata from https://rubygems.org/...
Fetching dependency metadata from https://rubygems.org/..
Resolving dependencies...

Outdated gems included in the bundle:
  * faker (newest 1.6.6, installed 1.6.5, requested ~> 1.4) in groups "development, test"
  * hashie (newest 3.4.6, installed 1.2.0, requested = 1.2.0) in groups "default"
  * headless (newest 2.3.1, installed 2.2.3)
`.trim()
const options = {input: stdin}

test('Terminal format', async t => {
  const stdoutUnicode = `
┌──────────┬────────┬───────────┬───────────┬───────────────────┐
│ gem      │ newest │ installed │ requested │ groups            │
├──────────┼────────┼───────────┼───────────┼───────────────────┤
│ faker    │ 1.6.6  │ 1.6.5     │ ~> 1.4    │ development, test │
│ hashie   │ 3.4.6  │ 1.2.0     │ = 1.2.0   │ default           │
│ headless │ 2.3.1  │ 2.2.3     │           │                   │
└──────────┴────────┴───────────┴───────────┴───────────────────┘
  `.trim()
  const stdoutAscii = `
+----------+--------+-----------+-----------+-------------------+
| gem      | newest | installed | requested | groups            |
+----------+--------+-----------+-----------+-------------------+
| faker    | 1.6.6  | 1.6.5     | ~> 1.4    | development, test |
| hashie   | 3.4.6  | 1.2.0     | = 1.2.0   | default           |
| headless | 2.3.1  | 2.2.3     |           |                   |
+----------+--------+-----------+-----------+-------------------+
  `.trim()

  t.is(await execa.stdout(command, [], options), stdoutUnicode)
  t.is(await execa.stdout(command, ['--format', 'terminal'], options), stdoutUnicode)
  t.is(await execa.stdout(command, ['-f', 'terminal'], options), stdoutUnicode)
  t.is(await execa.stdout(command, ['--format', 'terminal', '--pretty'], options), stdoutUnicode)
  t.is(await execa.stdout(command, ['-f', 'terminal', '-p'], options), stdoutUnicode)
  t.is(await execa.stdout(command, ['--format', 'terminal', '--style', 'unicode'], options), stdoutUnicode)
  t.is(await execa.stdout(command, ['-f', 'terminal', '-s', 'unicode'], options), stdoutUnicode)
  t.is(await execa.stdout(command, ['--format', 'terminal', '--style', 'ascii'], options), stdoutAscii)
  t.is(await execa.stdout(command, ['-f', 'terminal', '-s', 'ascii'], options), stdoutAscii)
  t.is(await execa.stdout(command, ['--format', 'terminal', '--pretty', '--style', 'unicode'], options), stdoutUnicode)
  t.is(await execa.stdout(command, ['--format', 'terminal', '--pretty', '--style', 'ascii'], options), stdoutAscii)
})

test('Markdown format', async t => {
  const stdout = `
| gem | newest | installed | requested | groups |
| --- | --- | --- | --- | --- |
| faker | 1.6.6 | 1.6.5 | ~> 1.4 | development, test |
| hashie | 3.4.6 | 1.2.0 | = 1.2.0 | default |
| headless | 2.3.1 | 2.2.3 | | |
  `.trim()

  t.is(await execa.stdout(command, ['--format', 'markdown'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'markdown'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'markdown', '--pretty'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'markdown', '-p'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'markdown', '--style', 'unicode'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'markdown', '-s', 'unicode'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'markdown', '--style', 'ascii'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'markdown', '-s', 'ascii'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'markdown', '--pretty', '--style', 'unicode'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'markdown', '--pretty', '--style', 'ascii'], options), stdout)
})

test('JSON format', async t => {
  const stdoutNormal = `
[{"gem":"faker","newest":"1.6.6","installed":"1.6.5","requested":"~> 1.4","groups":"development, test"},{"gem":"hashie","newest":"3.4.6","installed":"1.2.0","requested":"= 1.2.0","groups":"default"},{"gem":"headless","newest":"2.3.1","installed":"2.2.3","requested":"","groups":""}]
  `.trim()

  const stdoutPretty = `
[
  {
    "gem": "faker",
    "newest": "1.6.6",
    "installed": "1.6.5",
    "requested": "~> 1.4",
    "groups": "development, test"
  },
  {
    "gem": "hashie",
    "newest": "3.4.6",
    "installed": "1.2.0",
    "requested": "= 1.2.0",
    "groups": "default"
  },
  {
    "gem": "headless",
    "newest": "2.3.1",
    "installed": "2.2.3",
    "requested": "",
    "groups": ""
  }
]
  `.trim()

  t.is(await execa.stdout(command, ['--format', 'json'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['-f', 'json'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['--format', 'json', '--pretty'], options), stdoutPretty)
  t.is(await execa.stdout(command, ['-f', 'json', '-p'], options), stdoutPretty)
  t.is(await execa.stdout(command, ['--format', 'json', '--style', 'unicode'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['-f', 'json', '-s', 'unicode'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['--format', 'json', '--style', 'ascii'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['-f', 'json', '-s', 'ascii'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['--format', 'json', '--pretty', '--style', 'unicode'], options), stdoutPretty)
  t.is(await execa.stdout(command, ['--format', 'json', '--pretty', '--style', 'ascii'], options), stdoutPretty)
})

test('YAML format', async t => {
  const stdout = `
---
- gem: faker
  newest: 1.6.6
  installed: 1.6.5
  requested: ~> 1.4
  groups: 'development, test'
- gem: hashie
  newest: 3.4.6
  installed: 1.2.0
  requested: = 1.2.0
  groups: default
- gem: headless
  newest: 2.3.1
  installed: 2.2.3
  requested: ''
  groups: ''
  `.trim()

  t.is(await execa.stdout(command, ['--format', 'yaml'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'yaml'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'yaml', '--pretty'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'yaml', '-p'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'yaml', '--style', 'unicode'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'yaml', '-s', 'unicode'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'yaml', '--style', 'ascii'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'yaml', '-s', 'ascii'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'yaml', '--pretty', '--style', 'unicode'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'yaml', '--pretty', '--style', 'ascii'], options), stdout)
})

test('CSV format', async t => {
  const stdout = `
"gem","newest","installed","requested","groups"
"faker","1.6.6","1.6.5","~> 1.4","development, test"
"hashie","3.4.6","1.2.0","= 1.2.0","default"
"headless","2.3.1","2.2.3","",""
  `.trim()

  t.is(await execa.stdout(command, ['--format', 'csv'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'csv'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'csv', '--pretty'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'csv', '-p'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'csv', '--style', 'unicode'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'csv', '-s', 'unicode'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'csv', '--style', 'ascii'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'csv', '-s', 'ascii'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'csv', '--pretty', '--style', 'unicode'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'csv', '--pretty', '--style', 'ascii'], options), stdout)
})

test('TSV format', async t => {
  const stdout = `
"gem"	"newest"	"installed"	"requested"	"groups"
"faker"	"1.6.6"	"1.6.5"	"~> 1.4"	"development, test"
"hashie"	"3.4.6"	"1.2.0"	"= 1.2.0"	"default"
"headless"	"2.3.1"	"2.2.3"	""	""
  `.trim()

  t.is(await execa.stdout(command, ['--format', 'tsv'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'tsv'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'tsv', '--pretty'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'tsv', '-p'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'tsv', '--style', 'unicode'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'tsv', '-s', 'unicode'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'tsv', '--style', 'ascii'], options), stdout)
  t.is(await execa.stdout(command, ['-f', 'tsv', '-s', 'ascii'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'tsv', '--pretty', '--style', 'unicode'], options), stdout)
  t.is(await execa.stdout(command, ['--format', 'tsv', '--pretty', '--style', 'ascii'], options), stdout)
})

test('XML format', async t => {
  const stdoutNormal = `
<?xml version="1.0" encoding="UTF-8"?><gems><outdated><gem>faker</gem><newest>1.6.6</newest><installed>1.6.5</installed><requested>~> 1.4</requested><groups>development, test</groups></outdated><outdated><gem>hashie</gem><newest>3.4.6</newest><installed>1.2.0</installed><requested>= 1.2.0</requested><groups>default</groups></outdated><outdated><gem>headless</gem><newest>2.3.1</newest><installed>2.2.3</installed><requested></requested><groups></groups></outdated></gems>
  `.trim()

  const stdoutPretty = `
<?xml version="1.0" encoding="UTF-8"?>
<gems>
  <outdated>
    <gem>faker</gem>
    <newest>1.6.6</newest>
    <installed>1.6.5</installed>
    <requested>~> 1.4</requested>
    <groups>development, test</groups>
  </outdated>
  <outdated>
    <gem>hashie</gem>
    <newest>3.4.6</newest>
    <installed>1.2.0</installed>
    <requested>= 1.2.0</requested>
    <groups>default</groups>
  </outdated>
  <outdated>
    <gem>headless</gem>
    <newest>2.3.1</newest>
    <installed>2.2.3</installed>
    <requested></requested>
    <groups></groups>
  </outdated>
</gems>
  `.trim()

  t.is(await execa.stdout(command, ['--format', 'xml'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['-f', 'xml'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['--format', 'xml', '--pretty'], options), stdoutPretty)
  t.is(await execa.stdout(command, ['-f', 'xml', '-p'], options), stdoutPretty)
  t.is(await execa.stdout(command, ['--format', 'xml', '--style', 'unicode'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['-f', 'xml', '-s', 'unicode'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['--format', 'xml', '--style', 'ascii'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['-f', 'xml', '-s', 'ascii'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['--format', 'xml', '--pretty', '--style', 'unicode'], options), stdoutPretty)
  t.is(await execa.stdout(command, ['--format', 'xml', '--pretty', '--style', 'ascii'], options), stdoutPretty)
})

test('HTML format', async t => {
  const stdoutNormal = `
<table><tr><th>gem</th><th>newest</th><th>installed</th><th>requested</th><th>groups</th></tr><tr><td>faker</td><td>1.6.6</td><td>1.6.5</td><td>~> 1.4</td><td>development, test</td></tr><tr><td>hashie</td><td>3.4.6</td><td>1.2.0</td><td>= 1.2.0</td><td>default</td></tr><tr><td>headless</td><td>2.3.1</td><td>2.2.3</td><td></td><td></td></tr></table>
  `.trim()

  const stdoutPretty = `
<table>
  <tr>
    <th>gem</th>
    <th>newest</th>
    <th>installed</th>
    <th>requested</th>
    <th>groups</th>
  </tr>
  <tr>
    <td>faker</td>
    <td>1.6.6</td>
    <td>1.6.5</td>
    <td>~> 1.4</td>
    <td>development, test</td>
  </tr>
  <tr>
    <td>hashie</td>
    <td>3.4.6</td>
    <td>1.2.0</td>
    <td>= 1.2.0</td>
    <td>default</td>
  </tr>
  <tr>
    <td>headless</td>
    <td>2.3.1</td>
    <td>2.2.3</td>
    <td></td>
    <td></td>
  </tr>
</table>
  `.trim()

  t.is(await execa.stdout(command, ['--format', 'html'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['-f', 'html'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['--format', 'html', '--pretty'], options), stdoutPretty)
  t.is(await execa.stdout(command, ['-f', 'html', '-p'], options), stdoutPretty)
  t.is(await execa.stdout(command, ['--format', 'html', '--style', 'unicode'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['-f', 'html', '-s', 'unicode'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['--format', 'html', '--style', 'ascii'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['-f', 'html', '-s', 'ascii'], options), stdoutNormal)
  t.is(await execa.stdout(command, ['--format', 'html', '--pretty', '--style', 'unicode'], options), stdoutPretty)
  t.is(await execa.stdout(command, ['--format', 'html', '--pretty', '--style', 'ascii'], options), stdoutPretty)
})

test('Unknown format', async t => {
  const error = await t.throws(execa(command, ['--format', 'aaa'], options))
  t.regex(error.stderr, /Unknown format: aaa/)
})

test('Unknown style', async t => {
  const error = await t.throws(execa(command, ['--style', 'aaa'], options))
  t.regex(error.stderr, /Unknown style: aaa/)
})
