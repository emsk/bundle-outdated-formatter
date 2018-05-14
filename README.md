# bundle-outdated-formatter

[![Version](https://img.shields.io/npm/v/bundle-outdated-formatter.svg)](https://npmjs.org/package/bundle-outdated-formatter)
[![CircleCI](https://circleci.com/gh/emsk/bundle-outdated-formatter/tree/master.svg?style=shield)](https://circleci.com/gh/emsk/bundle-outdated-formatter/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/emsk/bundle-outdated-formatter?branch=master&svg=true)](https://ci.appveyor.com/project/emsk/bundle-outdated-formatter/branch/master)
[![Codecov](https://codecov.io/gh/emsk/bundle-outdated-formatter/branch/master/graph/badge.svg)](https://codecov.io/gh/emsk/bundle-outdated-formatter)
[![Downloads/week](https://img.shields.io/npm/dw/bundle-outdated-formatter.svg)](https://npmjs.org/package/bundle-outdated-formatter)
[![License](https://img.shields.io/npm/l/bundle-outdated-formatter.svg)](https://github.com/emsk/bundle-outdated-formatter/blob/master/package.json)

bundle-outdated-formatter is a command-line tool to format output of `bundle outdated`.

## Usage

```sh
$ bundle outdated | bundle-outdated-formatter
```

## Examples

Output of `bundle outdated`:

```
Fetching gem metadata from https://rubygems.org/..........
Fetching version metadata from https://rubygems.org/...
Fetching dependency metadata from https://rubygems.org/..
Resolving dependencies...

Outdated gems included in the bundle:
* faker (newest 1.6.6, installed 1.6.5, requested ~> 1.4) in groups "development, test"
* hashie (newest 3.4.6, installed 1.2.0, requested = 1.2.0) in groups "default"
* headless (newest 2.3.1, installed 2.2.3)
```

### Convert to Terminal

```
┌──────────┬────────┬───────────┬───────────┬───────────────────┐
│ gem      │ newest │ installed │ requested │ groups            │
├──────────┼────────┼───────────┼───────────┼───────────────────┤
│ faker    │ 1.6.6  │ 1.6.5     │ ~> 1.4    │ development, test │
│ hashie   │ 3.4.6  │ 1.2.0     │ = 1.2.0   │ default           │
│ headless │ 2.3.1  │ 2.2.3     │           │                   │
└──────────┴────────┴───────────┴───────────┴───────────────────┘
```

## Related

* [bundle_outdated_formatter](https://github.com/emsk/bundle_outdated_formatter) - A Ruby implementation of the bundle-outdated-formatter

## License

[MIT](LICENSE)
