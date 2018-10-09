import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import actions from 'redux/actions'
import { required, maxLength, minLength } from 'helpers/validation'
import { modals } from 'helpers'

import { FormattedMessage } from 'local_modules/intl'

import reduxForm from 'local_modules/redux-form'

import cssModules from 'react-css-modules'
import styles from './AddUsernameModal.scss'

import Button from 'components/ui/Button/Button'
import Input from 'components/form/Input/Input'
import Modal from 'components/Modal/Modal'


const noSpace = (data) => {
  if (/\s/.test(data)) {
    return 'Invalid symbols'
  }
}


@reduxForm({
  name: 'usernameForm',
  fields: {
    username: [ required, minLength(3), noSpace ],
  },
})
@cssModules(styles, { allowMultiple: true })
export default class AddUsernameModal extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object,
  }

  static defaultProps = {
    name: modals.AddUsername,
  }

  close = () => {
    const { name } = this.props

    actions.modals.close(name)
  }

  submit = ({ username }) => {
    const { name, data: { onSubmit } } = this.props

    actions.modals.close(name)
    actions.me.setUsername(username)

    if (typeof onSubmit === 'function') {
      onSubmit()
    }
  }

  render() {
    const { fields, submitForm } = this.props

    const id = 'AddChatModal'

    const usernameInput = {
      title: { id, message: 'createUsername' },
      field: fields.username,
      placeholder: { id, message: 'username' },
    }

    const isButtonDisabled = Boolean(usernameInput.field.error || !usernameInput.field.value)

    const inputWrapperStyleName = cx('inputWrapper', {
      'error': Boolean(usernameInput.field.validationError),
    })

    return (
      <Modal onClose={this.close}>
        <form styleName="addChatModal" onSubmit={submitForm(this.submit)}>
          <FormattedMessage styleName="text" div {...usernameInput.title} />
          <div styleName={inputWrapperStyleName}>
            <Input
              styleName="input"
              placeholder={usernameInput.placeholder}
              valueLink={usernameInput.field}
            />
          </div>
          <Button
            styleName="button"
            disabled={isButtonDisabled}
            title={{ id, message: 'continue' }}
            onClick={submitForm(this.submit)}
          />
        </form>
      </Modal>
    )
  }
}
