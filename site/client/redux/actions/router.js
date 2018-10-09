import { reducers } from '../core'


const { go, goBack, goForward, push:  _push, replace } = reducers.router

const push = (link, isForce) => {
  if (isForce) {
    window.location.href = link
  }
  else {
    _push(link)
  }
}


export default {
  go,
  goBack,
  goForward,
  push,
  replace,
}
