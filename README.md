<img width="100%" src="https://media1.tenor.com/images/7f70e01bf2fd0d65ac6f7c1b57bb5543/tenor.gif?itemid=14001403" />

## Installation

```bash
git clone git@github.com:grimmbraten/bundlephobia-cli.git $ZSH/plugins/bundlephobia-cli && yarn --cwd $ZSH/plugins/bundlephobia-cli install
```

Enable `bundlephobia-cli` as a active plugin by defining it in the oh-my-zsh plugin array (in the `.zshrc` file):

```bash
plugins=(bundlephobia-cli ...)
```

## Update

```bash
bp update
```

## Usage

```bash
bp <package-name> [--flags]
```

You can use as many flags as you want in one single command.

### Examples

```bash
bp jest

# jest@26.6.3
# 2.2 MB / 587.8 kB
```

```bash
bp webpack --dependencies

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
bp react --raw

# {
#   assets: [ { gzip: 2909, name: 'main', size: 7128, type: 'js' } ],
#   dependencyCount: 2,
#   dependencySizes: [
#     { approximateSize: 6320, name: 'react' },
#     { approximateSize: 1236, name: 'object-assign' }
#   ],
#   description: 'React is a JavaScript library for building user interfaces.',
#   gzip: 2909,
#   hasJSModule: false,
#   hasJSNext: false,
#   hasSideEffects: true,
#   isModuleType: false,
#   name: 'react',
#   repository: 'https://github.com/facebook/react.git',
#   scoped: false,
#   size: 7128,
#   version: '17.0.2'
# }
```
