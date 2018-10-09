import React, { Component } from 'react'
import { mapValues } from 'lodash'
// import { defaultsDeep } from 'helpers'
import { getState } from 'helpers'
import { getFieldsMap, getValuesFromProps, overrideFieldOptions, extendFieldOptions, getFieldValues,
  linkToState, validateFields, updateEmptyFieldValues, validateForm, modifyOutput } from './util'


const defaultsDeep = (defaults, obj) => {
  let copy

  if (defaults instanceof Array) {
    if (typeof obj !== 'undefined') {
      return obj
    }
    return defaults
  }

  // Handle Object
  if (defaults instanceof Object && obj instanceof Object) {
    copy = {}
    for (let key in defaults) {
      if (!defaults.hasOwnProperty(key)) continue

      if (typeof obj[key] !== 'undefined') {
        copy[key] = defaultsDeep(defaults[key], obj[key])
      }
      else {
        copy[key] = defaults[key]
      }
    }
    return copy
  }

  return obj
}
/**
 *
 * @param {Object} options
 * @param {String} options.name
 * @param {Object} options.fields
 * @param {Function} options.initialValues
 */
const decorator = (options) => (ComposedComponent) => {

  class FormComponent extends Component {

    constructor(props) {
      super()

      this.name = null
      this.options = typeof options === 'function' ? options(props) : options

      this.state = {
        isSubmitted: false,
        isUpdated: false,
        fieldValues: this.configureFieldValues(undefined, this.options),
        validatedFields: {},
      }
    }

    getInitialValues() {
      if (typeof this.options.initialValues === 'function') {
        return this.options.initialValues(getState(), this.props)
      }
      return {}
    }

    extendValuesFromProps(props, fieldValues) {
      const plainJS = mapValues(props, (value) => {
        // if (value instanceof Map) {
        //   return value.toJS()
        // }
        return value
      })

      return defaultsDeep(fieldValues, plainJS)
    }

    configure = (options, callback) => {
      const { fieldValues: stateFieldValues } = this.state
      const fieldValues = this.configureFieldValues(stateFieldValues, options)

      this.setState({
        fieldValues,
        isUpdated: false,
      }, () => {
        if (typeof callback === 'function') {
          callback()
        }
      })
    }

    configureFieldValues = (stateFieldValues, options) => {
      this.name = options.name
      this.options = {
        ...options,
        fields: overrideFieldOptions(options.fields),
      }

      const fieldOptions = options.fields
      const initialValues = this.getInitialValues()
      let fieldValues

      fieldValues = getFieldValues(fieldOptions)
      fieldValues = defaultsDeep(fieldValues, initialValues)
      fieldValues = this.extendValuesFromProps(this.props, fieldValues)

      if (stateFieldValues) {
        fieldValues = defaultsDeep(fieldValues, stateFieldValues)
      }

      return updateEmptyFieldValues(options.fields, fieldValues)
    }

    onSubmit = (callback, errorCallback) => (event) => {
      if (event) {
        event.preventDefault()
      }

      const { fieldValues } = this.state
      const fieldsMap           = getFieldsMap(this.options.fields)
      const initialValues       = this.getInitialValues()
      const propValues          = getValuesFromProps(this.props, this.options.fields)

      let initialPropValues     = defaultsDeep(defaultsDeep(fieldsMap, initialValues), propValues)
      initialPropValues         = updateEmptyFieldValues(this.options.fields, initialPropValues)

      const { isFormValid, validatedFields, groups } = validateForm(this.options, fieldValues, initialPropValues)

      this.setState({
        isSubmitted: true,
        isUpdated: false,
        validatedFields,
      })

      if (isFormValid) {
        return callback(fieldValues, groups)
      }
      else if (typeof errorCallback === 'function') {
        return errorCallback(fieldValues, groups)
      }
    }

    updateFieldValues = (newValues, callback) => {
      const { fieldValues } = this.state

      const newFieldValues = defaultsDeep(fieldValues, newValues)

      this.setState({
        isUpdated: true,
        fieldValues: newFieldValues,
      }, callback)
    }

    render() {
      const { isSubmitted, fieldValues, validatedFields, isUpdated } = this.state

      if (!fieldValues) {
        return null
      }

      let linkedFields

      linkedFields = linkToState.call(this, this.options.fields, fieldValues)
      linkedFields = extendFieldOptions(this.options.fields, linkedFields)
      linkedFields = (isSubmitted && !isUpdated) ? validateFields(linkedFields, validatedFields, fieldValues) : linkedFields
      linkedFields = modifyOutput(linkedFields)

      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          fields={linkedFields}
          submitForm={this.onSubmit}
          updateFormOptions={this.configure}
          updateFieldValues={this.updateFieldValues}
        />
      )
    }
  }

  return FormComponent
}

export default decorator
