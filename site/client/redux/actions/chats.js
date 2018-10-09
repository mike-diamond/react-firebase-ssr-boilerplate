import { reducers } from 'redux/core'
import actions from 'redux/actions'
import { getFirebase } from 'firebase-connect'
import { getState, links, modals, constants } from 'helpers'


const push = (title) => {
  const { me: { username } } = getState()

  return getFirebase().push('chats', {
    added: Date.now(),
    users: [ username ],
    title,
  })
    .then(({ key }) => actions.activeChat.setName(key))
}

const addUser = () => {
  const { me: { username }, activeChat: { name } } = getState()

  return getFirebase().push(`chats/${name}/users`, username)
}


export default {
  push,
  addUser,
}
