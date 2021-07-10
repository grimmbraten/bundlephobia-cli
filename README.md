<img width="100%" src="https://media1.tenor.com/images/b228138ca189b63989d295492e8a8b16/tenor.gif?itemid=4774531" />

<br />

<a href="https://www.javascript.com/"><img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/></a>
<a href="https://nodejs.org/en/"><img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node-dot-js&logoColor=white"/></a>
<a href="https://github.com/grimmbraten/bundlephobia-cli"><img alt="GitHub" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/></a>

Please checkout their awesome [service](https://bundlephobia.com/) and visit their github [repository](https://github.com/pastelsky/bundlephobia).

## Installation

```bash
yarn global add @grimmbraten/bundlephobia-cli
```

```bash
npm install -g @grimmbraten/bundlephobia-cli
```

## Upgrade

```bash
yarn global upgrade @grimmbraten/bundlephobia-cli --latest
```

For more information, please refer to the [yarn documentation](https://classic.yarnpkg.com/en/docs/cli/upgrade).

```bash
npm update -g @grimmbraten/bundlephobia-cli
```

> Good to know, globally installed packages are treated as if they are installed with a caret semver range specified. So if you require to update to the latest (breaking changes version) you may need to `run npm install -g <package>`.

For more information, please refer to the [npm documentation](https://docs.npmjs.com/cli/v6/commands/npm-update).

## Usage

```bash
bp <package> [flag]
```

### Examples

```bash
bp react

# ✔ react@17.0.2
# 6.9 kB minified
# 2.8 kB gzipped
```

```bash
bp webpack --dependencies

# ✔ webpack@5.38.1
# webpack-sources: 28.6 kB
# schema-utils: 22.3 kB
# tapable: 0.7 kB
# neo-async: 38.6 kB
# watchpack: 7.0 kB
# json-parse-better-errors: 0.7 kB
# acorn: 125.9 kB
# graceful-fs: 6.0 kB
# enhanced-resolve: 9.9 kB
# glob-to-regexp: 1.0 kB
# package-build-stats: 0.5 kB
# loader-runner: 9.2 kB
# terser-webpack-plugin: 0.1 kB
# chrome-trace-event: 2.3 kB
# @webassemblyjs/ast: 48.0 kB
# @webassemblyjs/helper-numbers: 2.1 kB
# @webassemblyjs/floating-point-hex-parser: 0.8 kB
# source-map: 0.2 kB
# @webassemblyjs/wasm-parser: 36.0 kB
# source-list-map: 0.3 kB
```

```bash
bp colors --raw

# ✔ colors@1.4.0
# {
#  assets: [ { gzip: 4139, name: 'main', size: 9547, type: 'js' } ],
#  dependencyCount: 0,
#  dependencySizes: [ { approximateSize: 12054, name: 'colors' } ],
#  description: 'get colors in your node.js console',
#  gzip: 4139,
#  hasJSModule: false,
#  hasJSNext: false,
#  hasSideEffects: true,
#  name: 'colors',
#  repository: 'https://github.com/Marak/colors.js',
#  scoped: false,
#  size: 9547,
#  version: '1.4.0'
# }
```

## Uninstall

```bash
yarn global remove @grimmbraten/bundlephobia-cli
```

```bash
npm uninstall -g @grimmbraten/bundlephobia-cli
```
