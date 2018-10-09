import React, { PureComponent } from 'react'
import cx from 'classnames'

import cssModules from 'react-css-modules'
import styles from './Search.scss'

import Input from 'components/form/Input/Input'


@cssModules(styles, { allowMultiple: true })
export default class Search extends PureComponent {

  render() {
    const { fields, isToggleActive, isTabletPortrait, toggleOpen } = this.props

    const id = 'Search'
    const placeholder      = !isTabletPortrait ? { id, message: 'search' } : ''
    const searchStyleName  = cx('search', {
      'active': isToggleActive,
    })

    return (
      <label styleName={searchStyleName} onClick={toggleOpen}>
        <div>
          <div styleName="icon" />
        </div>
        {
          (!isTabletPortrait || isToggleActive) && (
            <Input
              styleName="input"
              valueLink={fields.search}
              placeholder={placeholder}
              autoFocus={isTabletPortrait}
            />
          )
        }
        {
          isTabletPortrait && (
            <div styleName="close" data-toggle="close" />
          )
        }
      </label>
    )
  }
}
