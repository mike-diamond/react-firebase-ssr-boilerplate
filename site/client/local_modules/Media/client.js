import React from 'react'
import MediaQuery from 'react-responsive'
import { media } from 'helpers'
import forOwn from 'lodash/forOwn'

import cssModules from 'react-css-modules'


const mediaProps = {
  mobile: {
    maxWidth: media.mobileEnd,
  },
  tablet: {
    minWidth: media.tabletPortraitStart,
    maxWidth: media.tabletLandscapeEnd,
  },
  desktop: {
    minWidth: media.desktopStart,
  },

  tabletPortrait: {
    minWidth: media.tabletPortraitStart,
    maxWidth: media.tabletPortraitEnd,
  },
  tabletLandscape: {
    minWidth: media.tabletLandscapeStart,
    maxWidth: media.tabletLandscapeEnd,
  },

  exceptMobile: {
    minWidth: media.tabletPortraitStart,
  },
  exceptDesktop: {
    maxWidth: media.desktopStart,
  },

  tabletLandscapeAndHigher: {
    minWidth: media.tabletLandscapeStart,
  },
  tabletLandscapeAndLower: {
    maxWidth: media.tabletLandscapeEnd,
  },

  tabletPortraitAndHigher: {
    minWidth: media.tabletPortraitStart,
  },
  tabletPortraitAndLower: {
    maxWidth: media.tabletPortraitEnd,
  },
}

const Media = (props) => {
  const { styles, children, ...rest } = props

  let componentProps = {
    ...rest,
  }

  forOwn(rest, (value, key) => {
    componentProps = {
      ...componentProps,
      ...mediaProps[key],
    }
  })

  forOwn(mediaProps, (value, key) => {
    delete componentProps[key]
  })

  return (
    <MediaQuery {...componentProps}>
      {
        styles ? (
          (matches) => (
            cssModules(children.bind(this, matches), styles, {allowMultiple: true})()
          )
        ) : (
          children
        )
      }
    </MediaQuery>
  )
}


export default Media
