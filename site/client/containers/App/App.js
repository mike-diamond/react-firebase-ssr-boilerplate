import React, { Component } from 'react'
import { connect } from 'redaction'
import Helmet from 'react-helmet'

import ModalConductor from 'components/modals/ModalConductor/ModalConductor'

import cssModules from 'react-css-modules'
import styles from './App.scss'

import Overlay from './Overlay/Overlay'


@connect({
  me: 'me',
  pathname: 'routing.locationBeforeTransitions.pathname',
  isLoaderVisible: 'ui.isRequestLoaderVisible',
})
@cssModules(styles, { allowMultiple: true })
export default class App extends Component {

  timeout = null

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    clearTimeout(this.timeout)
    document.body.classList.add('resize')
    this.timeout = setTimeout(() => document.body.classList.remove('resize'), 300)
  }

  render() {
    const { children, isLoaderVisible } = this.props

    return (
      <div styleName="app">
        <Helmet
          title="React firebase SSR boilerplate"
        />
        {
          isLoaderVisible && (
            <Overlay key="overlay" isVisible={isLoaderVisible} />
          )
        }
        <div key="children">{children}</div>
        <ModalConductor key="modals" />
      </div>
    )
  }
}
