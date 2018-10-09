import React, { Component } from 'react'
import PropTypes from 'prop-types'


const decorator = (storeProps) => (ComposedComponent) => {
  class DecoratedComponent extends Component {

    static contextTypes = {
      globals: PropTypes.object,
    }

    render() {

      return (
        <ComposedComponent
          {...this.props}
          globals={this.context.globals || window.__globals__}
        />
      )
    }
  }

  return DecoratedComponent
}

export default decorator
