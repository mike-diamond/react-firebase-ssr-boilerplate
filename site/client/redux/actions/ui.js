import { reducers } from 'redux/core'


const showRequestLoader  = () => reducers.ui.setRequestLoaderVisibility(true)

const hideRequestLoader  = () => reducers.ui.setRequestLoaderVisibility(false)

const setUserLinking     = (isLinking) => reducers.ui.setUserLinking(isLinking)


export default {
  showRequestLoader,
  hideRequestLoader,
  setUserLinking,
}
