import React from 'react'
import PropTypes from 'prop-types'

import cssModules from 'react-css-modules'
import styles from './WidthContainer.scss'


const WidthContainer = ({ children, containerClassName, wrapperClassName }) => (
  <div styleName="widthContainer" className={wrapperClassName}>
    <div styleName="container" className={containerClassName}>
      {children}
    </div>
  </div>
)

WidthContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}


export default cssModules(WidthContainer, styles)
