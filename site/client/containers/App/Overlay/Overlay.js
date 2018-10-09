import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import cssModules from 'react-css-modules'
import styles from './Overlay.scss'

import Loader from 'components/ui/Loader/Loader'


const Overlay = ({ isVisible }) => {
  const overlayStyleName = cx('overlay', {
    'active': isVisible,
  })

  return (
    <div styleName={overlayStyleName}>
      <Loader />
    </div>
  )
}

Overlay.propTypes = {
  isVisible: PropTypes.bool,
}


export default cssModules(Overlay, styles, { allowMultiple: true })
