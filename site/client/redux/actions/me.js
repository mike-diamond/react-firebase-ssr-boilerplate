import actions from 'redux/actions'
import { reducers } from 'redux/core'
import { getState, links, modals, constants } from 'helpers'


const setUsername = (username) => {
  actions.cookies.updateSessionCookie({
    me: {
      username,
    }
  })

  reducers.me.setUsername(username)
}


export default {
  setUsername,
}
