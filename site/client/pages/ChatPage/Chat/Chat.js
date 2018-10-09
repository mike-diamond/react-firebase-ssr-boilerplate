import React, { PureComponent } from 'react'
import cx from 'classnames'
import actions from 'redux/actions'
import { modals } from 'helpers'
import { connect } from 'redaction'
import { firebaseConnect } from 'firebase-connect'

import cssModules from 'react-css-modules'
import styles from './Chat.scss'

import reduxForm from 'local_modules/redux-form'
import toggleOpen from 'local_modules/toggleOpen'

import ChatsList from '../ChatsList/ChatsList'
import MessagesList from '../MessagesList/MessagesList'


@connect({
  username: 'me.username',
  endAt: 'activeChat.endAt',
  activeChat: 'activeChat.name',
})
@firebaseConnect((props) => ({
  chatMessages: {
    path: `chatMessages/${props.activeChat}`,
    listeners: Boolean(props.endAt) ? [
      [
        'orderByChild=added',
        `endAt=${props.endAt}`,
        'limitToLast=25',
      ],
      [
        'orderByChild=added',
        'limitToLast=5',
      ],
    ] : [
      [
        'orderByChild=added',
        'limitToLast=25',
      ]
    ],
    defaultValue: `preload.chatMessages.${props.activeChat}`,
    modifyResult: (chatMessages = []) => chatMessages
      ? Object.keys(chatMessages)
        .filter((key) => chatMessages[key])
        .map((key) => ({ id: key, ...chatMessages[key] }))
        .sort((a, b) => b.added - a.added)
      : [],
  },
  chats: {
    path: 'chats',
    listeners: [
      [ 'orderByChild=added' ],
    ],
    defaultValue: 'preload.chats',
    modifyResult: (chats = {}) => Object.keys(chats)
      .map((key) => ({ id: key, ...chats[key] }))
      .map((chat) => ({
        ...chat,
        isActive: props.activeChat === chat.id,
        users: Object.keys(chat.users || {}).map((key) => chat.users[key]),
      })),
  },
}), connect)
@reduxForm({
  name: 'SearchForm',
  fields: {
    search: [],
    message: [],
  },
})
@toggleOpen()
@cssModules(styles, { allowMultiple: true })
export default class Chat extends PureComponent {

  componentWillUnmount() {
    document.removeEventListener('click', this.toggleClose)
  }

  toggleOpen = () => {
    const { isToggleActive, isTabletPortrait, isMobile, toggleOpen } = this.props

    if (!isToggleActive && (isTabletPortrait || isMobile)) {
      toggleOpen()
      document.addEventListener('click', this.toggleClose)
      document.addEventListener('keyup', this.toggleClose)
      window.addEventListener('resize', this.toggleClose)
    }
  }

  toggleClose = ({ path, keyCode }) => {
    const { updateFieldValues, isToggleActive, isTabletPortrait, isMobile, toggleClose } = this.props

    const isCloseIcon  = path[0].dataset.toggle === 'close'
    const isNotLabel   = !keyCode && path && !path.some(({ nodeName }) => /LABEL/.test(nodeName))
    const isEscape     = keyCode === 27

    if (isToggleActive && (isTabletPortrait || isMobile) && (isNotLabel || isEscape || isCloseIcon)) {
      toggleClose()
      updateFieldValues({ search: '' })
      document.removeEventListener('click', this.toggleClose)
      document.removeEventListener('keyup', this.toggleClose)
      window.removeEventListener('resize', this.toggleClose)
    }
  }

  addChat = () => actions.modals.open(modals.AddChat)

  setActiveChatName = (activeChatName) => {
    this.setActiveChatEndAt(null)
    actions.activeChat.setName(activeChatName)
  }

  setActiveChatEndAt = (endAt) => actions.activeChat.setEndAt(endAt)

  trySubmit = () => {
    const { username } = this.props

    if (!username) {
      actions.modals.open(modals.AddUsername, {
        onSubmit: this.submitMessage,
      })
    }
    else {
      this.submitMessage()
    }
  }

  submitMessage = () => {
    const { fields, chats, activeChat, username, chatMessages, updateFieldValues } = this.props

    if (!fields.message.value) {
      return
    }

    const lastMessage        = chatMessages[0]
    const isLeftLastMessage  = lastMessage ? lastMessage.isLeft : false
    const isSameAuthor       = Boolean(lastMessage && lastMessage.author === username)
    const isLeft             = isSameAuthor ? isLeftLastMessage : !isLeftLastMessage

    actions.activeChat.push({
      isLeft,
      isSameAuthor,
      message: fields.message.value,
    })

    const activeChatUsers  = chats.find(({ id }) => id === activeChat).users
    const isMeInChat       = Object.values(activeChatUsers).some((chatUser) => chatUser === username)

    if (!isMeInChat) {
      actions.chats.addUser()
    }

    updateFieldValues({
      message: '',
    })
  }

  render() {
    const {
      className, fields, chats, activeChat, chatMessages, endAt,
      isLoadedChatMessages, isMobile, isTabletPortrait, isToggleActive,
    } = this.props

    const leftStyleName = cx('left', {
      'fullWidth': isToggleActive,
    })

    const filteredChats = chats
      .filter(({ title }) => (
        !fields.search.value
        || new RegExp(fields.search.value).test(title.toLowerCase())
      ))

    const activeChatTitle = (chats.find(({ id }) => id === activeChat) || {}).title

    return (
      <div styleName="chat" className={className}>
        <ChatsList
          styleName={leftStyleName}
          chats={filteredChats}
          fields={fields}
          isToggleActive={isToggleActive}
          isMobile={isMobile}
          isTabletPortrait={isTabletPortrait}
          addChat={this.addChat}
          toggleOpen={this.toggleOpen}
          setActiveChatName={this.setActiveChatName}
        />
        <MessagesList
          styleName="right"
          fields={fields}
          endAt={endAt}
          activeChat={activeChatTitle}
          chatMessages={chatMessages}
          loadOffset={300}
          isMobile={isMobile}
          isToggleActive={isToggleActive}
          isLoadedChatMessages={isLoadedChatMessages}
          toggleOpen={this.toggleOpen}
          submitMessage={this.trySubmit}
          setActiveChatEndAt={this.setActiveChatEndAt}
        />
      </div>
    )
  }
}
