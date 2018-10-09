import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'


export default class ContextProvider extends PureComponent {

  static childContextTypes = {
    globals: PropTypes.object,
  }

  getChildContext() {
    const { globals } = this.props

    return {
      globals: globals || {},
    }
  }

  render() {
    const { children } = this.props

    return children
  }
}
