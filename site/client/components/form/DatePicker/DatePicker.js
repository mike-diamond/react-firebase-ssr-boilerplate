import React, { Component } from 'react'

import cssModules from 'react-css-modules'
import styles from './DatePicker.scss'

// import 'react-dates/initialize'
// import SingleDatePicker from './SingleDatePicker'
import Input from 'components/form/Input/Input'


@cssModules(styles, { allowMultiple: true })
export default class DatePicker extends Component {

  beforeMaskedValueChange = (newState, oldState, userInput) => {
    const { locale } = this.props
    let { value } = newState

    value = value.split('.').map((item, index) => {
      if (index === 0) {
        return item.replace(/_/g, locale === 'ru' ? 'д' : 'm')
      }
      if (index === 1) {
        return item.replace(/_/g, locale === 'ru' ? 'м' : 'd')
      }
      if (index === 2) {
        return item.replace(/_/g, locale === 'ru' ? 'г' : 'y')
      }

      return item
    }).join('.')

    return {
      ...newState,
      value,
    }
  }

  render() {
    const { valueLink, placeholder, locale } = this.props

    const is2000year = valueLink.value && valueLink.value[4] === '2'
    const is0month = valueLink.value && valueLink.value[locale === 'ru' ? 2 : 0] === '0'
    const is0day = valueLink.value && valueLink.value[locale === 'ru' ? 0 : 2] === '0'
    const is30day = valueLink.value && valueLink.value[locale === 'ru' ? 0 : 2] === '3'

    const monthValidation = is0month ? '[1-9]' : '[0-2]'
    const dayValidation = is0day ? '[1-9]' : '[0-9]'
    const day30Validation = '[0-1]'
    const year2000validation = `${new Date().getFullYear()}`[3] !== '0' ? `[0-${(new Date().getFullYear() + '')[3]}]` : '[0]'

    let formatChars = {
      n: '[0-1]',
      m: monthValidation,

      e: '[0-3]',
      d: is30day ? day30Validation : dayValidation,

      z: '[1-2]',
      y: is2000year ? '[0]' : '[0,9]',
      w: is2000year ? '[0-1]' : '[0-9]',
      x: is2000year ? year2000validation : '[0-9]',
    }

    return (
      <div>
        <Input
          valueLink={valueLink}
          placeholder={placeholder}
          formatChars={formatChars}
          mask={locale === 'ru' ? 'ed.nm.zywx' : 'nm.ed.zywx'}
          maskChar="_"
          beforeMaskedValueChange={this.beforeMaskedValueChange}
        />
        {/*<SingleDatePicker*/}
          {/*increase={increase}*/}
          {/*decrease={decrease}*/}
          {/*valueLink={valueLink}*/}
          {/*placeholder={placeholder}*/}
          {/*date={date}*/}
          {/*onDateChange={onDateChange}*/}
          {/*focused={focused}*/}
          {/*onFocusChange={onFocusChange}*/}
          {/*numberOfMonths={numberOfMonths}*/}
          {/*hideKeyboardShortcutsPanel*/}
          {/*firstDayOfWeek={locale === 'ru' ? 1 : 0}*/}
          {/*locale={locale}*/}
        {/*/>*/}
      </div>
    )
  }
}
