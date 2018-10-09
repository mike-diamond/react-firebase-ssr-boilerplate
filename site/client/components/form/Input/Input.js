import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { FormattedMessage } from 'local_modules/intl'
import { Input as ValueLinkInput } from 'local_modules/valuelink'

import cssModules from 'react-css-modules'
import styles from './Input.scss'


@cssModules(styles, { allowMultiple: true })
export default class Input extends Component {

  static propTypes = {
    className: PropTypes.string,
    // rootClassName: PropTypes.string,
    // inputClassName: PropTypes.string,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    type: PropTypes.string,
    valueLink: PropTypes.object.isRequired,
    focusOnInit: PropTypes.bool,
    multiline: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
  }

  static defaultProps = {
    focusOnInit: false,
    multiline: false,
    disabled: false,
    readOnly: false,
    required: false,
    type: 'text',
  }

  state = {
    error: null,
    valid: null,
    focus: false,
  }

  // preValidate = () => {
  //   const { valueLink } = this.props
  //
  //   let validationError
  //
  //   valueLink.validate.some((validate) => {
  //     const error = validate(valueLink.value)
  //
  //     if (error) {
  //       validationError = error
  //       // valueLink.check((value) => value, 'EMPTY')
  //       // console.log({ valueLink })
  //     }
  //
  //     return error
  //   })
  //
  //   return validationError
  // }

  onKeyUp = () => {
    // const { error } = this.state
    // //
    // const newError = this.preValidate()
    //
    // // console.log({ newError })
    // this.setState({
    //   // error: error ? newError : error,
    //   valid: !newError,
    // })
  }

  onBlur = () => {
    // const error = this.preValidate()
    //
    // // console.log({ error })
    // this.setState({
    //   // error,
    //   valid: !error,
    // })
  }

  focus = () => this.setState({ focus: true })

  unFocus = () => {
    this.setState({ focus: false })
    this.onBlur()
  }

  render() {
    const { valid: isValid, focus } = this.state
    const {
      valueLink, placeholder, type, big, hideCheck, disabled, label, mobile, white, className,
      focusOnInit, multiline, errorMessage, ...rest
    } = this.props

    const empty    = !Boolean(valueLink.value)
    const checked  = !empty && !valueLink.error && isValid && !hideCheck

    const inputWrapperStyleName = cx('inputWrapper', {
      'disabled': disabled,
    })

    const inputClassName = cx({
      [styles.notEmpty]: !empty,
    })

    const errorNode = valueLink.error && (
      typeof valueLink.error === 'string'
        ? valueLink.error
        : <FormattedMessage {...valueLink.error} />
    )

    const placeholderNode = placeholder && (
      typeof placeholder === 'string'
        ? placeholder
        : <FormattedMessage {...placeholder} />
    )

    return (
      <div
        styleName={inputWrapperStyleName}
        className={className}
        data-focus={focus}
        data-error={Boolean(valueLink.error)}
      >
        <ValueLinkInput
          className={inputClassName}
          type={type}
          valueLink={valueLink}
          onBlur={this.unFocus}
          onKeyUp={this.onKeyUp}
          onFocus={this.focus}
          disabled={disabled}
          {...rest}
        />
        {
          Boolean(valueLink.error && !empty) ? (
            <span styleName="error">
              {errorNode}
            </span>
          ) : (
            <p styleName="placeholder">
              {errorNode || placeholderNode}
            </p>
          )
        }
      </div>
    )
  }
}
