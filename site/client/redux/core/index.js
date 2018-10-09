import _createStore from 'redux/store'
import createReducers from './createReducers'


let store

const reducers = createReducers(() => store.dispatch)

const getState = () => {
  if (process.env.WEBPACK === 'build.server') {
    console.error('DON\'T USE getState() ON SERVER SIDE!')
  }
  else {
    return store.getState()
  }
}

const createStore = (...args) => {
  store = _createStore(...args)

  return store
}


export {
  createStore,
  getState,
  reducers,
}
