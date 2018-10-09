import Cookies from 'js-cookie'
import { reducers } from 'redux/core'
import { getFirebase } from 'firebase-connect'
import { links, modals, getState, mixpanel } from 'helpers'


// Actions to login, register or reset password
const login = ({ email, password, provider }) => {
  const promiseLogin = provider
    ? getFirebase().login({ provider, type: 'popup' })
    : getFirebase().login({ email, password })

  return promiseLogin
    .then((data) => {
      console.log('Login complete', data)

      return data
    })
}

const generatePassword = (pass) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  if (pass) {
    return pass
  }

  for (let i = 0; i < 32; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)]
  }

  Cookies.set('temp', pass)

  return pass
}

const register = ({ email, password }) => {
  return getFirebase().createUser({
    email,
    password: generatePassword(password),
  })
    .then((data) => {
      const { email } = data

      // some action to set email to reducer

      return data
    })
}

const updatePassword = (password) => {
  const { firebase, me } = getState()

  const auth      = firebase.get('auth')
  const tempPass  = Cookies.get('temp')

  if (tempPass) {
    const credential = getFirebase().auth.EmailAuthProvider.credential(me.email, tempPass)

    return auth.reauthenticateWithCredential(credential)
      .then(() => {
        Cookies.remove('temp')
        return auth.updatePassword(password)
      })
  }
  else {
    console.log('Input password, no saved tempPass')
    return Promise.reject()
  }
}

const resetPassword = (email) => {
  return getFirebase().resetPassword(email)
}

const verifyPasswordReset = (code) => {
  return getFirebase().auth().verifyPasswordResetCode(code)
}

const confirmPasswordReset = ({ code, password }) => {
  return getFirebase().confirmPasswordReset(code, password)
}


export default {
  login,
  register,
  resetPassword,
  updatePassword,
  verifyPasswordReset,
  confirmPasswordReset,
}
