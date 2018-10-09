import { mapValues } from 'lodash'
import { LinkAt } from 'valuelink'


const extendFieldOptions = (fieldOptions, linkedFields) =>
  mapValues(linkedFields, (opts, fieldName) => {
    if (opts instanceof LinkAt) {
      opts.validate = fieldOptions[fieldName].validate
      opts.modifyOutput = fieldOptions[fieldName].modifyOutput

      return opts
    }

    return extendFieldOptions(fieldOptions[fieldName].fields, opts)
  })


export default extendFieldOptions
