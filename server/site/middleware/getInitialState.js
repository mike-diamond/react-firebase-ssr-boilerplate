import getCookies from './getCookies'


const getInitialState = async (headers) => {
  const { __session = {} } = getCookies(headers)

  const me = {
    locale: 'en',
    ...__session.me,
  }

  const activeChat = {
    name: '-LOJQ_XvkMThAZCeR5-A',
    endAt: null,
    ...__session.activeChat,
  }

  const { getChats, getChatMessages } = require('./firebase-db')

  const [ chats, chatMessages ] = await Promise.all([
    getChats(),
    getChatMessages(activeChat.name),
  ])

  return {
    me,
    activeChat,
    preload: {
      chats,
      chatMessages: {
        [activeChat.name]: chatMessages,
      },
    },
  }
}

export default getInitialState
