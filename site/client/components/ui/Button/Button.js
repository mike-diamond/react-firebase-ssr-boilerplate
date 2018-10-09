import React, { Component } from 'react'
import cx from 'classnames'
import { FormattedMessage } from 'local_modules/intl'

import cssModules from 'react-css-modules'
import styles from './Button.scss'


@cssModules(styles, { allowMultiple: true })
export default class Button extends Component {

  handleClick = () => {
    const { disabled, onClick } = this.props

    if (!disabled && typeof onClick=== 'function') {
      onClick()
    }
  }

  render() {
    const {
      children, big, brand, link, dark, title, disabled, uppercase, styleName, block, transparent, disabledEvents,
      onClick, ...rest
    } = this.props

    const className = cx(`btn ${styleName || ''}`, {
      'big': big,
      'link': link,
      'dark': dark,
      'brand': brand,
      'block': block,
      'disabled': disabled,
      'uppercase': uppercase,
      'transparent': transparent,
      'disabledEvents': disabledEvents,
    })


    return (
      <div styleName={className} onClick={this.handleClick} {...rest}>
        {
          Boolean(title)
            ? (typeof title === 'object' ? <FormattedMessage {...title} /> : title)
            : children
        }
      </div>
    )
  }
}
