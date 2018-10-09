import React, { Component, Fragment } from 'react'
import { connect } from 'redaction'
import { getScrollBarWidth } from 'helpers'

import cssModules from 'react-css-modules'
import styles from './ModalConductor.scss'

import Modals from 'components/modals'


@cssModules(styles, { allowMultiple: true })
class ModalConductor extends Component {

  componentWillReceiveProps({ modals }) {
    if (modals.length) {
      document.body.style.paddingRight = `${getScrollBarWidth()}px`
      setTimeout(() => document.body.classList.add('body-modal-opened'))
    }
    else {
      document.body.classList.remove('body-modal-opened')
      document.body.style.paddingRight = '0px'
    }
  }

  render() {
    const { modals } = this.props

    let zIndex = 501 // 501 bcs there is Overlay on 500

    return (
      <Fragment>
        {
          modals.map(({ name, data = {} }, index) => (
            <div key={index} styleName="modalContainer" style={{ zIndex: zIndex + index }}>
              {
                React.createElement(Modals[name], { data })
              }
            </div>
          ))
        }
        {
          Boolean(modals.length) && (
            <div styleName="overlay" />
          )
        }
      </Fragment>
    )
  }
}

export default connect({
  modals: 'modals',
})(ModalConductor)
