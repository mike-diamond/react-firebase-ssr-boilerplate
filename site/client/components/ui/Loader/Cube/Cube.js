import React, { Component } from 'react'

import cssModules from 'react-css-modules'
import styles from './Cube.scss'


@cssModules(styles, { allowMultiple: true })
export default class Cube extends Component {

  render() {
    const { className } = this.props

    return (
      <div styleName="cube-grid" className={className}>
        {
          (new Array(9).fill(1)).map((item, index) => (
            <div key={index} styleName={`cube cube${index + item}`} />
          ))
        }
      </div>
    )
  }
}
