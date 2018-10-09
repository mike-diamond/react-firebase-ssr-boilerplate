const getCookies = (headers) => {
  const cookie = {}

  headers.cookie && headers.cookie.split('; ').forEach((cookieString) => {
    let [ key, value ] = cookieString.split('=')

    value = decodeURIComponent(value)
    try {
      value = JSON.parse(value)
    } catch(e) {
    }

    cookie[key] = value
  })

  return cookie || {}
}


export default getCookies
