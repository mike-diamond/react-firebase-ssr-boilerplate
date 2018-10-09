import Cookies from "js-cookie";


const _initialState = {
  name: '-LOJQ_XvkMThAZCeR5-A',
  endAt: null,
  ...((Cookies.getJSON('__session') || {}).activeChat || {}),
}

export const initialState = _initialState

export const setName = (state, payload) => ({
  ...state,
  name: payload || _initialState.name,
})

export const setEndAt = (state, payload) => ({
  ...state,
  endAt: payload,
})
