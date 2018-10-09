import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { FormattedMessage } from 'local_modules/intl'
import { TextArea as ValueLinkTextArea } from 'local_modules/valuelink'
import Media from 'local_modules/Media'

import cssModules from 'react-css-modules'
import styles from './TextArea.scss'


@cssModules(styles, { allowMultiple: true })
export default class TextArea extends Component {

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
  }

  preValidate = () => {
    const { valueLink } = this.props

    let validationError = false

    valueLink.validate.some((validate) => {
      const error = validate(valueLink.value)

      if (error) {
        validationError = error
      }

      return error
    })

    return validationError
  }

  onKeyUp = () => {
    const { error } = this.state

    const newError = this.preValidate()

    this.setState({
      error: error ? newError : error,
      valid: !newError,
    })
  }

  onBlur = () => {
    const error = this.preValidate()

    this.setState({
      error,
      valid: !error,
    })
  }

  render() {
    const { error: isError, valid: isValid } = this.state
    const { valueLink, placeholder, hideCheck, label, mobile, className } = this.props

    const error   = valueLink.error || isError
    const empty   = !Boolean(valueLink.value)
    const checked = !empty && !error && isValid && !hideCheck

    const textAreaWrapperStyleName = cx('textAreaWrapper', {
      'error': Boolean(error),
      'checked': checked,
    })

    const textAreaClassName = cx({
      [styles.notEmpty]: !empty,
    })

    return (
      <Media mobile styles={styles}>
        {
          (match) => (
            <label
              styleName={cx(textAreaWrapperStyleName, { 'mobile': match || mobile })}
              className={className}
            >
              <ValueLinkTextArea
                className={textAreaClassName}
                valueLink={valueLink}
                onBlur={this.onBlur}
                onKeyUp={this.onKeyUp}
              />
              <p styleName="placeholder">
                <span>
                  {
                    Boolean(error)
                      ? <FormattedMessage {...error} />
                      : <FormattedMessage {...placeholder} />
                  }
                </span>
              </p>
            </label>
          )
        }
      </Media>
    )
  }
}
