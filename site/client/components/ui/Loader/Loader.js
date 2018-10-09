import React from 'react'
import PropTypes from 'prop-types'

import cssModules from 'react-css-modules'
import styles from './Loader.scss'

import Round from './Round/Round'


const Loader = ({ isHidden }) => !Boolean(isHidden) && (
  <div styleName="overlay">
    <Round />
  </div>
)

Loader.propTypes = {
  isHidden: PropTypes.bool,
}


export default cssModules(Loader, styles, { allowMultiple: true })

