# interface-module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Interface module for NuxtJS

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `interface-module` dependency to your project

```bash
yarn add interface-module # or npm install interface-module
```

2. Add `interface-module` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'interface-module',

    // With options
    ['interface-module', { /* module options */ }]
  ]
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) João Pedro Antunes Silva <joao-pedroas@hotmail.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/interface-module/latest.svg
[npm-version-href]: https://npmjs.com/package/interface-module

[npm-downloads-src]: https://img.shields.io/npm/dt/interface-module.svg
[npm-downloads-href]: https://npmjs.com/package/interface-module

[github-actions-ci-src]: https://github.com//workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com//actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/.svg
[codecov-href]: https://codecov.io/gh/

[license-src]: https://img.shields.io/npm/l/interface-module.svg
[license-href]: https://npmjs.com/package/interface-module
