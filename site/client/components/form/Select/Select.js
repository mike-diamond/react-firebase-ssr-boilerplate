import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'local_modules/intl'

import CSSModules from 'react-css-modules'
import styles from './Select.scss'


@injectIntl
@CSSModules(styles, { allowMultiple: true })
export default class Simple extends PureComponent {

  static propTypes = {
    options: PropTypes.array.isRequired,
    valueLink: PropTypes.object.isRequired,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
  }

  handleChange = (event) => {
    const { valueLink } = this.props

    valueLink.set(event.target.value)
  }

  getRef = (node) => {
    if (!this.node) {
      this.node = node
    }
  }

  render() {
    const { intl, id, options, valueLink, placeholder, className, selectClassName } = this.props

    const isDefaultOptionVisible = !valueLink.value
    const error = valueLink.error // eslint-disable-line

    const styleName = cx('selectContainer', {
      'errored': Boolean(error),
    })

    let errorNode

    if (typeof error === 'string') {
      errorNode = error
    }
    else if (error) {
      errorNode = <FormattedMessage {...error} />
    }

    const placeholderNode = (
      typeof placeholder === 'string' ? (
        placeholder
      ) : (
        <FormattedMessage {...placeholder} />
      )
    )

    const placeholderStyleName = cx('placeholder', {
      'empty': !Boolean(valueLink.value),
      'error': Boolean(error),
    })

    return (
      <div
        styleName={styleName}
        className={className}
        onChange={this.handleChange}
      >
        <select styleName="select" className={selectClassName} ref={this.getRef} id={id} value={valueLink.value} onChange={this.handleChange}>
          <Fragment>
            {
              isDefaultOptionVisible && (
                <option key="defaultOption" styleName="defaultOption" value="" />
              )
            }
            {
              options.map(({ value, title }) => (
                typeof title !== 'object' ? (
                  <option key={value} value={value}>{title}</option>
                ) : (
                  <option key={value} value={value}>
                    {intl.formatMessage({ id: title.id + '.' + title.message }, title.values)}
                  </option>
                )
              ))
            }
          </Fragment>
        </select>
        <p styleName={placeholderStyleName} onClick={() => {
          this.node.click()
        }}>
          <span>
            {Boolean(error) ? errorNode : placeholderNode}
          </span>
        </p>
      </div>
    )
  }
}
