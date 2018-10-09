/**
 * This will setup the i18n language files and locale data for your app.
 */
import { addLocaleData } from 'react-intl'

import enLocaleData from 'react-intl/locale-data/en'
import ruLocaleData from 'react-intl/locale-data/ru'

import enTranslationMessages from 'shared/translations/en.json'
import ruTranslationMessages from 'shared/translations/ru.json'


addLocaleData(enLocaleData)
addLocaleData(ruLocaleData)

const getTranslationMessages = (messages) => {
  return Object.keys(messages).map((id) => ({
    id,
    defaultMessage: messages[id],
    message: '',
  }))
}

const formatTranslationMessages = (_messages) => {
  const messages = getTranslationMessages(_messages)
  const formattedMessages = {}

  for (const message of messages) {
    formattedMessages[message.id] = message.message || message.defaultMessage
  }

  return formattedMessages
}

const translationMessages = {
  en: formatTranslationMessages(enTranslationMessages),
  ru: formatTranslationMessages(ruTranslationMessages),
}

export default translationMessages
