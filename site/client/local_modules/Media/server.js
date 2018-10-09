import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cssModules from 'react-css-modules'

import injectGlobals from 'injectGlobals'


const getMediaProps = ({ isMobile, isTablet, isDesktop }) => ({
  mobile: isMobile,
  tablet: isTablet,
  desktop: isDesktop,

  tabletPortrait: isTablet,
  tabletLandscape: isTablet,

  exceptMobile: isTablet || isDesktop,
  exceptDesktop: isMobile || isTablet,

  tabletLandscapeAndHigher: isTablet || isDesktop,
  tabletLandscapeAndLower: isMobile || isTablet,

  tabletPortraitAndHigher: isTablet || isDesktop,
  tabletPortraitAndLower: isMobile || isTablet,
})
@injectGlobals()
export default class Media extends Component {

  render() {
    const { children, styles, globals, ...rest } = this.props

    const mediaProps = getMediaProps(globals)

    let value

    Object.keys(mediaProps).some((key) => {
      if (key in rest) {
        value = mediaProps[key]
        return true
      }
      return false
    })

    if (typeof children === 'function') {

      // this handles cases like that `<Media mobile styles={styles}>`
      if (styles) {
        return cssModules(children.bind(this, value), styles, { allowMultiple: true })()
      }

      return children(value)
    }

    return value && children
  }
}

