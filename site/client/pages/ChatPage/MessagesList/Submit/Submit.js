import React from 'react'
import cx from 'classnames'

import cssModules from 'react-css-modules'
import styles from './Submit.scss'

import Input from 'components/form/Input/Input'


const Submit = ({ fields, submitMessage }) => {
  const inputStyleName = cx('input', {
    'filled': fields.message.value,
  })

  const id = 'Submit'
  const placeholder = { id, message: 'newMessage' }

  return (
    <div styleName="submit">
      <Input
        styleName={inputStyleName}
        valueLink={fields.message}
        placeholder={placeholder}
        onKeyPress={({ charCode }) => charCode === 13 && submitMessage()}
      />
      <div styleName="iconWrapper">
        <div styleName="icon" onClick={submitMessage} />
      </div>
    </div>
  )
}


export default cssModules(Submit, styles, { allowMultiple: true })
