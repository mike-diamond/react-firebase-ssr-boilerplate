/* eslint global-require: 0 */
/**
 *
 * This script will extract the internationalization messages from all components
 * and package them in the translation json files in the translations file.
 */
import fs from 'fs'
import glob from 'glob'
import path from 'path'
import { transformFileSync } from '@babel/core'
import config from '../../site/client/local_modules/app-config'


const FILES_TO_PARSE = [
  `common/**/messages.js`,
  `${config.entry}/**/messages.js`,
]

const filePaths     = [].concat.apply([], FILES_TO_PARSE.map((pattern) => glob.sync(pattern))) // eslint-disable-line
const messagesData  = [].concat.apply([], filePaths.map((filePath) => { // eslint-disable-line
  const rintlmg   = transformFileSync(filePath, {
    babelrc: false,
    presets: [],
    plugins: [ [ 'babel-plugin-rintlmg', { messages: true } ] ],
  })

  const textCode  = rintlmg.code.replace(/^[\n\w\W]+defineMessages\(/, '(').replace(/\n\s{5}/g, ' ')
  const code      = eval(textCode) // eslint-disable-line
  /*

    {
      en: {
        title: 'Title',
        subTitle: 'Subtitle',
      },
      ru: {
        title: 'Заголовок',
        subTitle: 'Подзаголовок',
      },
    }

   */
  return code
}))


const translations = {}

messagesData.forEach((data) => {

  Object.keys(data).forEach((locale) => {
    const messages = data[locale]

    if (!translations[locale]) {
      translations[locale] = {}
    }

    const id = messages.id.split('.')[messages.id.split('.').length - 2]

    Object.keys(messages).forEach((key) => {
      if (key !== 'id') {
        translations[locale][id + '.' + key] = messages[key]
      }
    })
  })
})

Promise.all(
  Object.keys(translations).map((locale) => fs.writeFileSync(
    path.resolve(process.cwd(), `./${config.entry}/shared/translations/${locale}.json`),
    `${JSON.stringify(translations[locale], null, 2)}\n`
  ))
)
  .then(() => console.log('Success!'))
