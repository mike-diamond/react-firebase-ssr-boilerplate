import device from 'express-device'
import { compose } from 'compose-middleware'


export default compose([
  device.capture(),
  (req, res, next) => {
    const type = req.device && req.device.type

    req.isBot       = type === 'bot'
    req.isMobile    = type === 'phone'
    req.isTablet    = type === 'tablet'
    req.isDesktop   = type === 'desktop'

    next()
  },
])
