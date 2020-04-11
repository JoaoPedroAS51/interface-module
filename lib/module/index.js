const { resolve, join } = require('path')
const { readdirSync } = require('fs')
const defu = require('defu')
const defaults = require('./defaults')

const libRoot = resolve(__dirname, '..')

module.exports = function (moduleOptions) {
  const options = defu({
    ...this.options['interface-module'],
    ...moduleOptions
  }, defaults)

  // Copy all core templates
  copyCore.call(this)

  // Copy plugin
  copyPlugin.call(this, { options })

  function copyFolder (sourceFolder, destinationFolder) {
    const fullSourcePath = resolve(libRoot, sourceFolder)

    for (const file of readdirSync(fullSourcePath)) {
      this.addTemplate({
        src: resolve(fullSourcePath, file),
        fileName: join(destinationFolder, file)
      })
    }
  }

  function copyCore () {
    copyFolder.call(this, 'core', 'interface')
  }

  function copyPlugin ({ options }) {
    // Copy auth plugin
    const { dst } = this.addTemplate({
      src: resolve(libRoot, 'module', 'plugin.js'),
      fileName: join('interface', 'plugin.js'),
      options: {
        options
      }
    })

    this.options.plugins.push(resolve(this.options.buildDir, dst))
  }
}

module.exports.meta = require('../../package.json')
