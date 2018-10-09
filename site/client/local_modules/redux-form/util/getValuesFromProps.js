// import { Map } from 'sb-immutable'
import { mapValues } from 'lodash'


const getValuesFromProps = (props, fieldOptions) => {
  const plainProps = mapValues(props, (value) => {
    // if (value instanceof Map) {
    //   return value.toJS()
    // }
    return value
  })

  return mapValues(fieldOptions, (opts, fieldName) => {
    const propValue = plainProps[fieldName]
    return typeof propValue !== 'undefined' ? propValue : (opts.fields ? {} : '')
  })
}

export default getValuesFromProps
