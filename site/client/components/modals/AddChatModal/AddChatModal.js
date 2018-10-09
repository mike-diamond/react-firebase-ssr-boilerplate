import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import actions from 'redux/actions'
import { connect } from 'redaction'
import { required, maxLength, minLength } from 'helpers/validation'
import { modals } from 'helpers'

import { FormattedMessage } from 'local_modules/intl'

import reduxForm from 'local_modules/redux-form'

import cssModules from 'react-css-modules'
import styles from './AddChatModal.scss'

import Button from 'components/ui/Button/Button'
import Input from 'components/form/Input/Input'
import Modal from 'components/Modal/Modal'


const noSpace = (data) => {
  if (/\s/.test(data)) {
    return 'Invalid symbols'
  }
}


@connect({
  username: 'me.username',
})
@reduxForm((props) => ({
  name: 'usernameForm',
  fields: {
    chatTitle: [ required ],
    username: props.username ? [] : [ required, minLength(3), noSpace ],
  },
}))
@cssModules(styles, { allowMultiple: true })
export default class AddChatModal extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object,
  }

  static defaultProps = {
    name: modals.AddChat,
  }

  close = () => {
    const { name } = this.props

    actions.modals.close(name)
  }

  submit = ({ username, chatTitle }) => {
    const { name } = this.props

    if (username) {
      actions.me.setUsername(username)
    }

    actions.modals.close(name)
    actions.chats.push(chatTitle)
  }

  render() {
    const { fields, submitForm, username } = this.props

    const id = 'AddChatModal'

    const usernameInput = {
      title: { id, message: 'createUsername' },
      field: fields.username,
      placeholder: { id, message: 'username' },
    }

    const chatInput = {
      title: { id, message: 'createChatTitle' },
      field: fields.chatTitle,
      placeholder: { id, message: 'chatTitle' },
    }

    const inputs = username ? [ chatInput ] : [ usernameInput, chatInput ]

    const isButtonDisabled = inputs.some(({ field }) => field.error || !field.value)

    return (
      <Modal onClose={this.close}>
        <form styleName="addChatModal" onSubmit={submitForm(this.submit)}>
          {
            inputs.map(({ title, field, placeholder }, index) => {
              const inputWrapperStyleName = cx('inputWrapper', {
                'error': Boolean(field.validationError),
              })

              return (
                <Fragment key={index}>
                  <FormattedMessage styleName="text" div {...title} />
                  <div styleName={inputWrapperStyleName}>
                    <Input
                      styleName="input"
                      placeholder={placeholder}
                      valueLink={field}
                    />
                  </div>
                </Fragment>
              )
            })
          }
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
