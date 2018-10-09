import React from 'react'

import cssModules from 'react-css-modules'
import styles from './ChatPage.scss'

import WidthContainer from 'components/WidthContainer/WidthContainer'
import Media from 'local_modules/Media'

import Chat from './Chat/Chat'


const ChatPage = () => (
  <Media tabletPortrait styles={styles}>
    {
      (isTabletPortrait) => (
        <Media mobile styles={styles}>
          {
            (isMobile) => (
              <WidthContainer containerClassName={styles.container} wrapperClassName={styles.wrapper}>
                <Chat
                  styleName="chat"
                  isTabletPortrait={isTabletPortrait}
                  isMobile={isMobile}
                />
              </WidthContainer>
            )
          }
        </Media>
      )
    }
  </Media>
)


export default cssModules(ChatPage, styles)
