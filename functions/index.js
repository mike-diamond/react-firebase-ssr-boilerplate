const functions = require('firebase-functions')
const app = require('./middleware').default

exports.app = functions.https.onRequest(app)
