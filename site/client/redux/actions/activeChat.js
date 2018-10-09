import actions from 'redux/actions'
import { reducers } from 'redux/core'
import { getFirebase } from 'firebase-connect'
import { getState, links, modals, constants } from 'helpers'


const push = ({ message, isLeft, isSameAuthor }) => {
  const { me: { username = 'me' }, activeChat: { name: activeChatName } } = getState()

  return getFirebase().push(`chatMessages/${activeChatName}`, {
    added: Date.now(),
    author: username,
    message,
    isLeft,
    isSameAuthor,
  })
}

const setName = (name) => {
  actions.cookies.updateSessionCookie({
    activeChat: {
      name
    },
  })
  reducers.activeChat.setName(name)
}

const setEndAt = reducers.activeChat.setEndAt


export default {
  push,
  setName,
  setEndAt,
}
