import url from 'url'


const escapeQueryValue = (value) =>
  encodeURIComponent(
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&quot;')
      .replace(/'/g, '&#039;')
  )

const parseQuery = (query) => {
  const result = {}

  Object.keys(query).forEach((key) => {
    const value = query[key]

    try {
      result[key] = escapeQueryValue(JSON.parse(value))
    }
    catch (err) {
      result[key] = escapeQueryValue(value)
    }
  })

  return result
}

const urlParser = (req, res, next) => {
  const origin  = `${req.protocol}://${req.get('host')}`
  const fullUrl = `${origin}${req.originalUrl}`

  const { href, pathname, query, search } = url.parse(fullUrl, true)

  const escapedQuery = !search ? '' : (
    Object.keys(query)
      .reduce((result, key) => {
        const value  = escapeQueryValue(query[key])
        const item   = `${key}=${value}&`

        return `${result}${item}`
      }, '?')
      .replace(/&$/, '')
  )

  req.url       = `${pathname}${escapedQuery}`
  req.origin    = origin
  req.href      = href
  req.pathname  = pathname
  req.query     = parseQuery(query)
  req.search    = search

  next()
}

export default urlParser
