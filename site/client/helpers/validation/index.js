// import moment from 'moment'
// import { normalizeDateFormat } from 'helpers'
// import resolveEndpoint from 'sb-request/util/resolveEndpoint'
// import request from 'superagent'

const messages = {
  required: 'Required',
  passwordsMatch: 'Passwords should match',
  email: 'Valid email address required',
  emailAlreadyUsed: `
    ERROR! This email has been already registered.
    Please <Href role="errorLink" to="/register/log-in">login</Href>
  `,
  emailAlreadyUsedWithoutLink: 'ERROR! This email has been already registered. Please login',
  unknownEmail: `Unknown email. Please <Href role="errorLink" to="/register">register</Href>`,
  unknownEmailWithoutLink: 'Unknown email. Please register',
  url: 'Valid url required',
  password: 'Password must be at least 6 chars long',
  integer: 'Must be a number',
  minLength: 'Must be at least {length} characters',
  maxLength: 'Must be no more than {length} characters',
  streetAddress: 'Must be a valid street address',
  zipCode: 'Must be a valid zip code',
  telephone: 'Must be a valid phone number',
  cardNumber: 'Must be a valid card number',
  expDate: 'Must be a valid date',
  cardCVV: 'Invalid CVV/CVC',
  date: 'Must be a valid date',
  genderRequired: 'Your gender is required',
  invalidSymbols: 'Invalid symbols',
}

const isEmpty = value => typeof value === 'undefined' || value === null || value === '' || /^\s+$/.test(value)


// const fetchUserExist = (value) => new Promise((resolve, reject) => {
//   request.get(resolveEndpoint('rest/user/exists'))
//     .withCredentials()
//     .query({
//       email: value.trim().toLowerCase(),
//     })
//     .then((res) => {
//       if (res.err) {
//         return reject(res.err)
//       }
//
//       const { exists, gender } = res.body
//
//       console.log('check user exist by email result: ', { exists, gender })
//
//       resolve(exists)
//     })
//     .catch(err => {
//       reject(err)
//     })
// })

export const required = (value) => {
  if (isEmpty(value)) {
    return { id: 'validation', message: 'required' }
  }
}

export const genderRequired = (value) => {
  if (isEmpty(value)) {
    return { id: 'validation', message: 'genderRequired' }
    // return messages.genderRequired
  }
}

export const email = (value) => {
  if (!isEmpty(value) && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
    return { id: 'validation', message: 'email' }
    // return messages.email
  }
}

export const uniqueEmail = (options = {}) => async (value) => {
  const { errorWithLink = true } = options

  let isUsed
  let message = errorWithLink ? messages.emailAlreadyUsed : messages.emailAlreadyUsedWithoutLink

  try {
    isUsed = await fetchUserExist(value)
  }
  catch (err) {
    isUsed = true
    message = messages.email
  }

  if (isUsed) {
    return message
  }
}

// export const emailExist = (options = {}) => async (value) => {
//   const { errorWithLink = true } = options
//
//   let isUsed
//   let message = { id: 'validation', message: errorWithLink ? 'unknownEmail' : 'unknownEmailWithoutLink' }
//
//   try {
//     isUsed = await fetchUserExist(value)
//   }
//   catch (err) {
//     isUsed = false
//     message = { id: 'validation', message: 'email' }
//   }
//
//   if (!isUsed) {
//     return message
//   }
// }

export const url = (value) => {
  if (!isEmpty(value) && !/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(value)) {
    return { id: 'validation', message: 'url' }
  }
}

export const password = (value) => {
  if (!isEmpty(value) && !/^.{6,}$/.test(value)) {
    return { id: 'validation', message: 'password' }
  }
}

export const integer = (value) => {
  if (!isEmpty(value) && !Number.isInteger(Number(value))) {
    return { id: 'validation', message: 'integer' }
  }
}

export const minLength = (length) => (value) => {
  if (!isEmpty(value) && String(value).length < length) {
    return { id: 'validation', message: 'minLength', values: { length } }
    // return messages.minLength //', values: { length } }
  }
}

export const maxLength = (length) => (value) => {
  if (!isEmpty(value) && String(value).length > length) {
    return { id: 'validation', message: 'maxLength', values: { length } }
    // return messages.maxLength
  }
}

// only letters not available
// only numbers not available
// availables symbols:  \s  A-Z  a-z  0-9  #  /  -
export const streetAddress = (value) => {
  if (
    !isEmpty(value)
    && (
      /^[A-Za-z]+$/.test(value)
      || /^\d+$/.test(value)
      || !/^[\sA-Za-z0-9#/-]+$/.test(value)
    )
  ) {
    return { id: 'validation', message: 'streetAddress' }
  }
}

export const zipCode = (value) => {
  if (!isEmpty(value) && !/^\d{5}(?:[-\s]\d{4})?$/.test(value)) {
    return { id: 'validation', message: 'zipCode' }
  }
}

export const telephone = (value) => {
  if (!isEmpty(value) && !/^\+1\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(value)) {
    return { id: 'validation', message: 'telephone' }
  }
}

/**
 * Luhn algorithm in JavaScript: validate credit card number supplied as string of numbers
 * https://gist.github.com/thensg/07bd82f73a1f784a35f0
 */
export const cardNumber = ((digits) => (cardNum) => {
  if (isEmpty(cardNum)) {
    return
  }

  if (String(cardNum).length < 14) {
    return { id: 'validation', message: 'cardNumber' }
  }

  cardNum = String(cardNum).replace(/\s+/g, '')

  let sum = 0
  let digit = 0
  let even = true
  let i = cardNum.length

  while (i--) {
    digit = Number(cardNum[i])
    sum += (even = !even) ? digits[digit] : digit
  }

  if (sum <= 0 || sum % 10 !== 0) {
    return { id: 'validation', message: 'cardNumber' }
  }
})([ 0, 2, 4, 6, 8, 1, 3, 5, 7, 9 ])

export const expDate = (value) => {
  if (isEmpty(value)) {
    return
  }

  if (!/^(0[1-9]|1[0-2])(1[6-9]|[2-9][0-9])$/g.test(value)) {
    return { id: 'validation', message: 'expDate' }
  }

  const valueMonth  = Number(value.substr(0, 2))
  const valueYear   = Number(`20${value.substr(2)}`)
  const currDate    = new Date()
  const currYear    = currDate.getFullYear()
  const currMonth   = currDate.getMonth()

  if (
    valueYear < currYear
    || valueYear === currYear && valueMonth < currMonth
  ) {
    return { id: 'validation', message: 'expDate' }
  }
}

export const cardCVV = (value) => {
  if (!isEmpty(value) && !/^[0-9]{3,4}$/.test(value)) {
    return { id: 'validation', message: 'cardCVV' }
  }
}

export const equals = (fieldName, errorMessage) => (value, values) => {
  if (value !== values[fieldName]) {
    return errorMessage
  }
}

export const passwordsMatch = (fieldName) => (value, values) => {
  if (value !== values[fieldName]) {
    return { id: 'validation', message: 'passwordsMatch' }
  }
}

// export const date =  (value) => {
//   if (!isEmpty(value) && !moment(normalizeDateFormat(value), 'MM/DD/YYYY').isValid()) {
//     return { id: 'validation', message: 'date' }
//   }
// }
