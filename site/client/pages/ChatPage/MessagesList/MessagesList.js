import React, { PureComponent } from 'react'

import cssModules from 'react-css-modules'
import styles from './MessagesList.scss'

import Loader from 'components/ui/Loader/Loader'

import SvgCross from './SvgCross/SvgCross'
import Message from './Message/Message'
import Submit from './Submit/Submit'

import Feed from 'react-infinite-feed'


@cssModules(styles, { allowMultiple: true })
export default class MessagesList extends PureComponent {

  node = null

  state = {
    shouldScrollUp: false,
    shouldScrollDown: false,
  }

  componentDidUpdate({ chatMessages: oldChatMessages }) {
    const { endAt, chatMessages } = this.props

    const isMessagesUpdated = (
      !oldChatMessages.length
      || chatMessages.some(({ id }, index) => !oldChatMessages[index] || oldChatMessages[index].id !== id)
    )

    if (!endAt) {
      this.setEndAt()
    }

    if (!oldChatMessages.length) {
      this.setState({
        shouldScrollDown: true,
      })
    }
    else if (isMessagesUpdated) {
      this.setState({
        shouldScrollUp: true,
      })
    }
    else {
      this.setState({
        shouldScrollUp: false,
        shouldScrollDown: false,
      })
    }
  }

  setEndAt = () => {
    const { chatMessages, setActiveChatEndAt } = this.props

    if (chatMessages.length) {
      const firstMessageAdded = chatMessages[chatMessages.length - 1].added

      if (firstMessageAdded) {
        setActiveChatEndAt(firstMessageAdded)
      }
    }
  }

  render() {
    const { shouldScrollUp, shouldScrollDown } = this.state
    const {
      className, fields, chatMessages, activeChat, isMobile, isLoadedChatMessages, isToggleActive,
      toggleOpen, submitMessage,
      loadOffset,
    } = this.props

    return (
      <div styleName="container" className={className}>
        <div styleName="heading">
          <span>{activeChat}</span>
          {
            isMobile && (
              <SvgCross
                speed={700}
                isOpen={isToggleActive}
                onClick={() => !isToggleActive && toggleOpen()}
              />
            )
          }
        </div>
        <Feed
          styleName="messagesWrapper"
          isScrollUp
          loadOffset={loadOffset}
          shouldScrollUp={shouldScrollUp}
          shouldScrollDown={shouldScrollDown}
          onReachOffset={this.setEndAt}
        >
          <div styleName="messages">
            {
              isLoadedChatMessages
                ? chatMessages.map(({ id, message, author, isLeft, isSameAuthor }) => (
                  <Message
                    key={id}
                    id={id}
                    message={message}
                    author={author}
                    isLeft={isLeft}
                    isSameAuthor={isSameAuthor}
                  />
                ))
                : <Loader />
            }
          </div>
        </Feed>
        <Submit fields={fields} submitMessage={submitMessage} />
      </div>
    )
  }
}
