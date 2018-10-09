import React, { Component } from 'react'

import cssModules from 'react-css-modules'
import styles from './Round.scss'


@cssModules(styles, { allowMultiple: true })
export default class Round extends Component {

  render() {

    return (
      <div styleName="ripple">
        <div />
        <div />
      </div>
    )
  }
}
