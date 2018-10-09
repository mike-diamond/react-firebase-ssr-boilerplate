const path = require('path')
const merge = require('deepmerge')


const configName         = process.env.CONFIG // This value comes from package.json
const cfgDir             = path.resolve(process.cwd(), 'config/')
const defaultConfigPath  = path.join(cfgDir, 'default')
const envConfigPath      = path.join(cfgDir, `${configName}.js`)
const defaultConfig      = require(defaultConfigPath)

const envConfig = (() => {
  if (!configName) {
    return {}
  }

  try {
    return require(envConfigPath)
  }
  catch (err) {
    throw new Error(err)
  }
})()

const config = merge(defaultConfig, envConfig)


module.exports = config
