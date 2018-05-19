import test from 'ava'
import * as execa from 'execa'

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

test('Terminal format', async t => {
  const stdout = `
┌──────────┬────────┬───────────┬───────────┬───────────────────┐
│ gem      │ newest │ installed │ requested │ groups            │
├──────────┼────────┼───────────┼───────────┼───────────────────┤
│ faker    │ 1.6.6  │ 1.6.5     │ ~> 1.4    │ development, test │
│ hashie   │ 3.4.6  │ 1.2.0     │ = 1.2.0   │ default           │
│ headless │ 2.3.1  │ 2.2.3     │           │                   │
└──────────┴────────┴───────────┴───────────┴───────────────────┘
  `.trim()

  t.is((await execa.shell(`echo '${stdin}' | ./bin/run`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format terminal`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f terminal`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format terminal --pretty`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f terminal -p`)).stdout, stdout)
})

test('Markdown format', async t => {
  const stdout = `
| gem | newest | installed | requested | groups |
| --- | --- | --- | --- | --- |
| faker | 1.6.6 | 1.6.5 | ~> 1.4 | development, test |
| hashie | 3.4.6 | 1.2.0 | = 1.2.0 | default |
| headless | 2.3.1 | 2.2.3 | | |
  `.trim()

  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format markdown`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f markdown`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format markdown --pretty`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f markdown -p`)).stdout, stdout)
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

  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format json`)).stdout, stdoutNormal)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f json`)).stdout, stdoutNormal)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format json --pretty`)).stdout, stdoutPretty)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f json -p`)).stdout, stdoutPretty)
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

  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format yaml`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f yaml`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format yaml --pretty`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f yaml -p`)).stdout, stdout)
})

test('CSV format', async t => {
  const stdout = `
"gem","newest","installed","requested","groups"
"faker","1.6.6","1.6.5","~> 1.4","development, test"
"hashie","3.4.6","1.2.0","= 1.2.0","default"
"headless","2.3.1","2.2.3","",""
  `.trim()

  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format csv`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f csv`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format csv --pretty`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f csv -p`)).stdout, stdout)
})

test('TSV format', async t => {
  const stdout = `
"gem"	"newest"	"installed"	"requested"	"groups"
"faker"	"1.6.6"	"1.6.5"	"~> 1.4"	"development, test"
"hashie"	"3.4.6"	"1.2.0"	"= 1.2.0"	"default"
"headless"	"2.3.1"	"2.2.3"	""	""
  `.trim()

  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format tsv`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f tsv`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format tsv --pretty`)).stdout, stdout)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f tsv -p`)).stdout, stdout)
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

  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format xml`)).stdout, stdoutNormal)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f xml`)).stdout, stdoutNormal)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format xml --pretty`)).stdout, stdoutPretty)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f xml -p`)).stdout, stdoutPretty)
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

  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format html`)).stdout, stdoutNormal)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f html`)).stdout, stdoutNormal)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run --format html --pretty`)).stdout, stdoutPretty)
  t.is((await execa.shell(`echo '${stdin}' | ./bin/run -f html -p`)).stdout, stdoutPretty)
})

test('Unknown format', async t => {
  const error = await t.throws(execa.shell(`echo '${stdin}' | ./bin/run --format aaa`))
  t.regex(error.stderr, /Unknown format: aaa/)
})
