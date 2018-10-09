import { map, forEach, every, some, isEqual } from 'lodash'


const validateField = (validators, stateValue, stateValues) => {
  function iterate(index) {
    if (!validators[index]) {
      return
    }

    const error = validators[index](stateValue, stateValues)

    if (error || index === validators.length - 1) {
      return error
    }

    return iterate(++index)
  }

  return iterate(0)
}

const validateGroupFields = (fieldOpts, stateValues, isGroupChanged) => {
  const result = {}
  const fieldNames = Object.keys(fieldOpts)

  const resultMap = Promise.all(fieldNames.map((fieldName) => {
    const _fieldOpts = fieldOpts[fieldName]

    if (_fieldOpts.fields) {
      return validateGroupFields(_fieldOpts.fields, stateValues[fieldName], isGroupChanged)
    }

    if (!isGroupChanged) {
      return { error: undefined, validate: false }
    }

    const error = validateField(_fieldOpts.validate, stateValues[fieldName], stateValues)

    return { error, validate: true }
  }))

  fieldNames.forEach((fieldName, index) => {
    result[fieldName] = resultMap[index]
  })

  return result
}

const validateFields = (fieldOpts, stateValues) => {
  const result = {}
  const fieldNames = Object.keys(fieldOpts)

  const resultMap = fieldNames.map((fieldName) => {
    const _fieldOpts = fieldOpts[fieldName]

    if (_fieldOpts.fields) {
      return validateFields(_fieldOpts.fields, stateValues[fieldName])
    }

    const error = validateField(_fieldOpts.validate, stateValues[fieldName], stateValues)

    return { error, validate: true }
  })

  fieldNames.forEach((fieldName, index) => {
    result[fieldName] = resultMap[index]
  })

  return result
}

const checkFormValid = (fields) =>
  every(fields, (fieldOpts, fieldName) => {
    if ('error' in fieldOpts) {
      return !Boolean(fieldOpts.error)
    }
    return checkFormValid(fields[fieldName])
  })


const checkFieldFilled = (fieldOpts, fieldValue) => {
  if (fieldOpts.fields) {
    return some(fieldOpts.fields, (fieldOpts, fieldName) => checkFieldFilled(fieldOpts, fieldValue[fieldName]))
  }
  if (fieldOpts.readOnly) {
    return false
  }
  return Boolean(fieldValue)
}

const checkGroupFilled = (groupFieldNames, fieldOpts, stateValues) =>
  some(groupFieldNames, (groupFieldName) => checkFieldFilled(fieldOpts[groupFieldName], stateValues[groupFieldName]))

const checkGroupChanged = (groupFieldNames, stateValues, initialValues) =>
  some(groupFieldNames, (fieldName) => !isEqual(stateValues[fieldName], initialValues[fieldName]))

const validateGroup = ({ fieldNames, fieldOpts, stateValues, isChanged }) => {
  const result = {}

  Promise.all(map(fieldNames, (fieldName) => {
    const value = stateValues[fieldName]
    let opts = fieldOpts[fieldName]
    opts = opts.fields || opts

    result[fieldName] = validateGroupFields(opts, value, isChanged)
  }))

  return result
}

const validateGroups = (groups, fieldOpts, stateValues, initialValues) => {
  const processedGroups = map(groups, ({ fields: groupFieldNames, isRequired }) => ({
    fieldNames: groupFieldNames,
    isFilled: checkGroupFilled(groupFieldNames, fieldOpts, stateValues),
    isChanged: isRequired ? true : checkGroupChanged(groupFieldNames, stateValues, initialValues),
  }))

  const validated = Promise.all(map(processedGroups, ({ fieldNames, isChanged }) =>
    validateGroup({
      fieldNames,
      fieldOpts,
      stateValues,
      isChanged,
    })
  ))

  Promise.all(map(processedGroups, ({ isChanged }, index) => {
    if (isChanged && groups[index].validate) {
      Promise.all(map(groups[index].validate, (groupIndex) => {
        validated[groupIndex] = validateGroup({
          fieldNames: processedGroups[groupIndex].fieldNames,
          fieldOpts,
          stateValues,
          isChanged: true,
        })
      }))
    }
  }))

  let validatedFields = {}

  forEach([].concat(...validated), (fields) => {
    validatedFields = {
      ...validatedFields,
      ...fields,
    }
  })

  return {
    validatedFields,
    groups: processedGroups,
  }
}


const validateForm = (options, stateValues, initialValues) => {
  const { fields: fieldOpts, validateGroups: groups } = options
  let result = {}

  if (groups) {
    result = validateGroups(groups, fieldOpts, stateValues, initialValues)
  }
  else {
    const validatedFields = validateFields(fieldOpts, stateValues)

    result = {
      validatedFields,
    }
  }

  result = {
    ...result,
    isFormValid: checkFormValid(result.validatedFields),
  }

  return result
}

export default validateForm
