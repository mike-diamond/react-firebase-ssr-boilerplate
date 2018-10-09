import React from 'react'
import cx from 'classnames'

import { FormattedMessage } from 'local_modules/intl'

import cssModules from 'react-css-modules'
import styles from './AddChat.scss'


const AddChat = ({ isTextVisible, onClick }) => {
  const id = 'AddChat'

  const addChatStyleName = cx('addChat', {
    'active': isTextVisible,
  })

  return (
    <div styleName={addChatStyleName} onClick={onClick}>
      <div>
        <div styleName="icon" />
      </div>
      {
        isTextVisible && (
          <FormattedMessage styleName="text" {...{ id, message: 'addChat' }} />
        )
      }
    </div>
  )
}


export default cssModules(AddChat, styles, { allowMultiple: true })
