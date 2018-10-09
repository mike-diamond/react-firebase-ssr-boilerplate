// Router is an exception of all other reducers
// It wraps just with dispatch method passing from core/reducers

import mapValues from 'lodash/mapValues'
import { routerActions } from 'react-router-redux'


const wrapRouterReducers = (dispatchResolver) =>
  mapValues(routerActions, (action) => (link) => {
    const dispatch = dispatchResolver()

    if (dispatch) {
      dispatch(action(link))
    }
    else {
      console.error('store.dispatch doesn\'t exist..')
    }
  })


export default wrapRouterReducers
