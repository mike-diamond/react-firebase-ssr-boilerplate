import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl, IntlProvider, addLocaleData, defineMessages, FormattedMessage } from 'react-intl'
import { ignoreProps } from 'helpers'


const renderContent = (tag = 'span', props, ...children) =>
  React.createElement(tag, {
    ...ignoreProps(props, 'id', 'tagId', 'values', 'defaultMessage'),
    id: props.tagId,
  }, ...children)

const _FormattedMessage = ({ children, tag, div, id, message, ...rest }) => {
  const messageId = message ? `${id}.${message}` : id

  return id ? (
    <FormattedMessage id={messageId} {...rest}>
      {
        typeof children === 'function' ? children :
          (...result) => renderContent(div ? 'div' : tag, rest, ...result)
      }
    </FormattedMessage>
  ) : (
    renderContent(tag, {
      dangerouslySetInnerHTML: { __html: message },
    })
  )
}

const _FormattedHTMLMessage = ({ children, tag, div, id, message, ...rest }) => {
  const messageId = message ? `${id}.${message}` : id

  return id ? (
    <FormattedMessage id={messageId} {...rest}>
      {
        typeof children === 'function' ? children :
          (result) => renderContent(div ? 'div' : tag, {
            dangerouslySetInnerHTML: { __html: result },
            ...rest,
          })
      }
    </FormattedMessage>
  ) : (
    renderContent(div ? 'div' : tag, {
      dangerouslySetInnerHTML: { __html: message },
    })
  )
}

const intlMessageShape = {
  id: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
}


export {
  intlShape,
  intlMessageShape,
  injectIntl,
  IntlProvider,
  addLocaleData,
  defineMessages,
  _FormattedMessage as FormattedMessage,
  _FormattedHTMLMessage as FormattedHTMLMessage,
}
