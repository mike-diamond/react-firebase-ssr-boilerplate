import { forEach, mapValues } from 'lodash'
import Link from 'valuelink'


const linkToState = function (fieldOptions, stateFields, pathToField = []) {
  return mapValues(fieldOptions, (opts, fieldName) => {
    if (opts.fields) {
      return linkToState.call(this, opts.fields, stateFields[fieldName], [ ...pathToField, fieldName ])
    }

    let link = Link.state(this, 'fieldValues')
    if (pathToField.length) {
      forEach(pathToField, (fieldName) => link = link.at(fieldName))
    }
    link = link.at(fieldName)

    return link
  })
}


export default linkToState
