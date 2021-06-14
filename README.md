<img width="100%" src="https://media1.tenor.com/images/7f70e01bf2fd0d65ac6f7c1b57bb5543/tenor.gif?itemid=14001403" />

## Installation

```bash
yarn global add @grimmbraten/bundlephobia-cli
```

```bash
npm install -g @grimmbraten/bundlephobia-cli
```

For more package information, please visit [@grimmbraten/bundlephobia-cli](https://www.npmjs.com/package/@grimmbraten/bundlephobia-cli).

## Upgrade

```bash
yarn global upgrades @grimmbraten/bundlephobia-cli
```

```bash
npm update -g @grimmbraten/bundlephobia-cli
```

## Usage

```bash
bp <bundle/command> [--flags]
```

### Examples

```bash
bp react

# ✔ react@17.0.2
# 6.9 kB minified
# 2.8 kB gzipped
```

```bash
bp webpack --dependencies --source

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

# repository: https://github.com/webpack/webpack.git
# description: Packs CommonJs/AMD modules for the browser...
```

```bash
bp colors -R

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
