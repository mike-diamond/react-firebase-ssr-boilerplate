import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import cssModules from 'react-css-modules'
import styles from './Modal.scss'


@cssModules(styles, { allowMultiple: true })
export default class Modal extends Component {

  static propTypes = {
    onClose: PropTypes.func,
    closeBtn: PropTypes.bool,
    fullWidth: PropTypes.bool,
  }

  static defaultProps = {
    onClose: () => {},
    closeBtn: true,
    fullWidth: false,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.close)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.close)
  }

  close = ({ keyCode }) => {
    const { closeBtn, onClose } = this.props

    if (closeBtn && keyCode === 27) {
      onClose()
    }
  }

  click = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  render() {
    const { children, closeBtn, onClose, fullWidth } = this.props

    const modalWrapperStyleName = cx('modalWrapper', {
      'fullWidth': fullWidth,
    })

    return (
      <div styleName={modalWrapperStyleName} onClick={onClose}>
        <div onClick={this.click}>
          {
            fullWidth ? React.createElement('div', {}, ...children) : children
          }
          {
            closeBtn && (
              <span styleName="closeBtn" onClick={onClose} />
            )
          }
        </div>
      </div>
    )
  }
}
