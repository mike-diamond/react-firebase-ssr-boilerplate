import React, { PureComponent } from 'react'
import cx from 'classnames'

import cssModules from 'react-css-modules'
import styles from './ChatsList.scss'

import Search from './Search/Search'
import AddChat from './AddChat/AddChat'


@cssModules(styles, { allowMultiple: true })
export default class ChatsList extends PureComponent {

  render() {
    const {
      className, chats, fields, isMobile, isTabletPortrait, isToggleActive, toggleOpen, addChat, setActiveChatName,
    } = this.props

    const isTextVisible = (!isTabletPortrait && !isMobile) || isToggleActive

    return (
      <div styleName="users" className={className}>
        <Search
          fields={fields}
          toggleOpen={toggleOpen}
          isToggleActive={isToggleActive}
          isMobile={isMobile}
          isTabletPortrait={isTabletPortrait}
        />
        <div styleName="list">
          {
            chats.map(({ id, title, users, isActive }) => {
              const userStyleName = cx('user', {
                'active': isActive,
              })

              return (
                <div key={id} styleName={userStyleName} onClick={() => setActiveChatName(id)}>
                  <div>
                    <div styleName="image" />
                  </div>
                  {
                    isTextVisible && (
                      <div styleName="text">
                        <div>{title}</div>
                        <div styleName="usernames">{users.join(', ')}</div>
                      </div>
                    )
                  }
                </div>
              )
            })
          }
        </div>
        <AddChat isTextVisible={isTextVisible} onClick={addChat}/>
      </div>
    )
  }
}
