import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redaction'
import { IntlProvider } from 'react-intl'


const LanguageProvider = ({ children, locale, messages }) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    {children}
  </IntlProvider>
)

LanguageProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}


export default connect({
  locale: 'me.locale',
})(LanguageProvider)
