import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import cssModules from 'react-css-modules'
import styles from './Message.scss'


const Message = ({ id, author, message, isLeft, isSameAuthor }) => {
  const messageStyleName = cx('message', {
    'reverse': !isLeft,
    'noPaddingTop': isSameAuthor,
  })

  const textStyleName = cx('text', {
    'left': isLeft,
    'right': !isLeft,
    'withTail': !isSameAuthor,
  })

  return (
    <div styleName={messageStyleName}>
      {
        !isSameAuthor && (
          <div styleName="ava" title={author} />
        )
      }
      <div styleName="textWrapper">
        <div styleName={textStyleName}>{message}</div>
      </div>
    </div>
  )
}


Message.propTypes = {
  id: PropTypes.string,
  author: PropTypes.string,
  message: PropTypes.string,
  isLeft: PropTypes.bool,
  isSameAuthor: PropTypes.bool,
}


export default cssModules(Message, styles, { allowMultiple: true })
