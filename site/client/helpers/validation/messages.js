import { defineMessages } from 'react-intl'

export default defineMessages({
  en: {
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
  },
  ru: {
    required: 'Обязательное поле',
    passwordsMatch: 'Passwords should match',
    email: 'Необходим валидный email',
    emailAlreadyUsed: `
      ERROR! This email has been already registered.
      Please <Href role="errorLink" to="/register/log-in">login</Href>
    `,
    emailAlreadyUsedWithoutLink: 'ERROR! This email has been already registered. Please login',
    unknownEmail: `Unknown email. Please <Href role="errorLink" to="/register">register</Href>`,
    unknownEmailWithoutLink: 'Unknown email. Please register',
    url: 'Valid url required',
    password: 'Минимальная длина пароля 6 символов',
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
    invalidSymbols: 'Недопустимые символы',
  },
})
