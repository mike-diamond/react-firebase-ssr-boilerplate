import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'local_modules/valuelink'
import { FormattedMessage } from 'local_modules/intl'
import cx from 'classnames'
import { ignoreProps } from 'helpers'

import cssModules from 'react-css-modules'
import styles from './CheckBox.scss'


@cssModules(styles, { allowMultiple: true })
export default class CheckBox extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    label: PropTypes.any,
    valueLink: PropTypes.object,
  }

  static defaultProps = {
    className: '',
    checked: false,
    disabled: false,
  }

  render() {
    const { label, className, valueLink, checked, readOnly, id, ...rest } = this.props

    const checkboxStyleName = cx('checkbox', {
      'disabled': readOnly,
    })

    let inputProps = {
      ...ignoreProps(rest, 'styles'),
      styleName: 'input',
      type: 'checkbox',
      disabled: readOnly,
      readOnly,
      checked,
    }

    if (valueLink) {
      inputProps = {
        ...inputProps,
        valueLink,
      }
    }

    const inputElement = React.createElement(valueLink ? Input : 'input', inputProps)

    return (
      <label styleName="root" className={className} id={id}>
        {inputElement}
        <div styleName={checkboxStyleName} />
        {
          Boolean(label) && (
            typeof label === 'object' ? (
              <FormattedMessage styleName="label" {...label} />
            ) : (
              <span>{label}</span>
            )
          )
        }
      </label>
    )
  }
}
