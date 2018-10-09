import { mapValues } from 'lodash'
import { LinkAt } from 'valuelink'


const modifyOutput = (linkedFields) =>
  mapValues(linkedFields, (opts, fieldName) => {
    if (opts instanceof LinkAt) {
      if (typeof opts.modifyOutput === 'function') {
        return opts.modifyOutput(opts)
      }

      return opts
    }

    return modifyOutput(linkedFields[fieldName], opts)
  })


export default modifyOutput
