import Cookies from 'js-cookie'


const _initialState = {
  locale: 'en',
  username: null,
  ...((Cookies.getJSON('__session') || {}).me || {}),
}

export const initialState = _initialState

export const set = (state, payload) => payload

export const setUsername = (state, payload) => ({
  ...state,
  username: payload,
})

export const update = (state, payload) => ({
  ...state,
  ...payload,
})
