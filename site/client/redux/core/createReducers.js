import { wrapReducers } from 'redaction'
import localReducers from 'redux/reducers'
import wrapRouterReducers from 'redux/reducers/router'


export default (dispatchResolver) => ({
  ...wrapReducers(localReducers),
  router: wrapRouterReducers(dispatchResolver),
})
