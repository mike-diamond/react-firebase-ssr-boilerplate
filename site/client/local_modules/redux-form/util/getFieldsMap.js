import { forEach } from 'lodash'


const getFieldsMap = (fieldOptions) => {
  const result = {}

  forEach(fieldOptions, (opts, fieldName) => {
    if (opts.fields) {
      result[fieldName] = getFieldsMap(opts.fields)
    }
    else {
      result[fieldName] = null
    }
  })

  return result
}

export default getFieldsMap
