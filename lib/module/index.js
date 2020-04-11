import Glob from 'glob'
import pify from 'pify'
import Ignore from './ignore'

const { resolve, join } = require('path')
const { readdirSync } = require('fs')
const { createRoutes } = require('@nuxt/utils')
const glob = pify(Glob)
const defu = require('defu')
const defaults = require('./defaults')

const libRoot = resolve(__dirname, '..')

module.exports = async function (moduleOptions) {
  const options = defu({
    ...this.options['interface-module'],
    ...moduleOptions
  }, defaults)

  const supportedExtensions = ['vue', 'js', ...(this.options.build.additionalExtensions || [])]

  // Copy all core templates
  copyCore.call(this)

  // Copy all pages
  await copyPages.call(this)

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

  async function copyPages () {
    const { routeNameSplitter, trailingSlash } = this.options.router
    const files = {}
    const ext = new RegExp(`\\.(${supportedExtensions.join('|')})$`)

    for (const page of await resolveFiles.call(this, 'pages')) {
      const key = page.replace(ext, '')
      // .vue file takes precedence over other extensions
      if (/\.vue$/.test(page) || !files[key]) {
        files[key] = page.replace(/(['"])/g, '\\$1')
      }
    }

    this.extendRoutes((routes) => {
      const _routes = createRoutes({
        files: Object.values(files),
        srcDir: libRoot,
        pagesDir: 'pages\\interface',
        routeNameSplitter,
        supportedExtensions,
        trailingSlash
      })

      for (const route of _routes) {
        routes.push(route)
      }
    })
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

  function globPathWithExtensions (path) {
    return `${path}/**/*.{${supportedExtensions.join(',')}}`
  }

  async function resolveFiles (dir, cwd = libRoot) {
    const ignore = new Ignore({
      rootDir: libRoot,
      ignoreArray: this.options.ignore
    })

    return ignore.filter(await glob(globPathWithExtensions(dir), {
      cwd,
      follow: this.options.build.followSymlinks
    }))
  }
}

module.exports.meta = require('../../package.json')
