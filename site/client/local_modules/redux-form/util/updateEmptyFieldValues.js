import { mapValues } from 'lodash'


const updateEmptyFieldValues = (fieldOptions, fieldValues) =>
  mapValues(fieldOptions, (opts, fieldName) => {
    if (opts.fields) {
      return updateEmptyFieldValues(opts.fields, fieldValues[fieldName])
    }
    const value = fieldValues[fieldName]
    return typeof value === 'undefined' || value === null ? '' : value
  })

export default updateEmptyFieldValues
