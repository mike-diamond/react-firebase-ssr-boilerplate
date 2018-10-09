const fs            = require('fs')
const path          = require('path')
const babel         = require('@babel/core')

const getPath       = (dir) => path.resolve(process.cwd(), dir)

const writeFile     = (path, code) => fs.writeFileSync(path, code)

const transpileFile = (file) => {
  let code

  const isJSON    = /\.json$/.test(file)
  const fileName  = file.replace(/.*\//, '')
  const dist      = `./functions/middleware/${fileName}`

  if (isJSON) {
    code = fs.readFileSync(file, 'utf-8')
  }
  else {
    code = babel.transformFileSync(file, { babelrc: true, presets: [] }).code
    code = code.replace(/functions\//g, './../')
  }

  writeFile(
    path.resolve(process.cwd(), dist),
    code
  )
}

const getPathFiles = (path) => {
  const isFile = /\.(js|json)$/.test(path)

  if (isFile) {
    return transpileFile(path)
  }

  return fs.readdirSync(path).map((file) => {
    return getPathFiles(`${path}/${file}`)
  })
}

getPathFiles(getPath('server'))
