import { mapValues } from 'lodash'
import { LinkAt } from 'valuelink'


const validateFields = (linkedFields, validatedFields, fieldValues) =>
  mapValues(linkedFields, (opts, fieldName) => {
    if (opts instanceof LinkAt) {
      opts.validate.some((validate) => {
        opts.error = validate(opts.value, fieldValues)

        return Boolean(opts.error)
      })

      return opts
    }
    return validateFields(opts, validatedFields[fieldName])
  })


export default validateFields
