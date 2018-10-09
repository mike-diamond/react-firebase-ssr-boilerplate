import Cookies from 'js-cookie'


const updateSessionCookie = (prop) => {
  let sessionCookie = Cookies.getJSON('__session') || {}

  sessionCookie = {
    ...sessionCookie,
    ...prop,
  }

  Cookies.set('__session', JSON.stringify(sessionCookie))
}


export default {
  updateSessionCookie,
}
