const firebase = require('firebase-admin')
const serviceAccount = require('./react-firebase-chat-11658-firebase-adminsdk-r2vld-286945aa85.json')

const ref = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://react-firebase-chat-11658.firebaseio.com',
})

const getUserActiveChat = (activeChat = 'main') => {
  return firebase.database().ref(`/chats/${activeChat}`).orderByChild('created').limitToLast(100).once('value')
}

const resetData = () => {
  const chats         = firebase.database().ref('/chats/')
  const chatMessages  = firebase.database().ref('/chatMessages/')

  const chatsData = {
    ['-LOJQ_XvkMThAZCeR5-A']: { title: 'Chat 1', users: 'Ben, Molly'.split(', '), added: Date.now() },
    ['-LOJQaGFBY-ubGIXf9vO']: { title: 'Chat 2', users: 'Dirk, Michael'.split(', '), added: Date.now() + 1 },
    ['-LOJQaXldVio0iX--1ts']: { title: 'Chat 3', users: 'Donnald, Bobby, Jacob'.split(', '), added: Date.now() + 2 },
  }

  const chatMessagesData = {
    ['-LOJQ_XvkMThAZCeR5-A']: [
      { author: 'Ben', message: 'Hi!', added: Date.now(), isLeft: false, isSameAuthor: false },
      { author: 'Molly', message: 'Hi, first chat!', added: Date.now() + 1, isLeft: true, isSameAuthor: false },
    ],
    ['-LOJQaGFBY-ubGIXf9vO']: [
      { author: 'Dirk', message: 'Hi all!', added: Date.now(), isLeft: false, isSameAuthor: false },
      { author: 'Michael', message: 'Hi, second chat!', added: Date.now() + 1, isLeft: true, isSameAuthor: false },
    ],
    ['-LOJQaXldVio0iX--1ts']: [
      { author: 'Donnald', message: 'Hey!', added: Date.now(), isLeft: false, isSameAuthor: false },
      { author: 'Bobby', message: 'Hi, third chat!', added: Date.now() + 1, isLeft: true, isSameAuthor: false },
      { author: 'Jacob', message: 'Hi, guys!', added: Date.now() + 2, isLeft: false, isSameAuthor: false },
      { author: 'Mike', message: 'Hi, guys, test!', added: Date.now() + 3, isLeft: true, isSameAuthor: false },
    ].concat(new Array(200).fill(null).map((item, index) => ({
      author: 'Mike',
      message: `Test ${index + 1}`,
      added: Date.now() + index + 4,
      isLeft: true,
      isSameAuthor: true,
    }))),
  }

  return Promise.all([
    chats.set(chatsData),
    chatMessages.set(chatMessagesData)
  ])
}

const getChats = () =>
  firebase.database().ref('/chats/')
    .orderByChild('added')
    .limitToLast(25)
    .once('value')
    .then((snap) => snap.val())

const getChatMessages = (activeChat = 'Chat 1') =>
  firebase.database().ref(`/chatMessages/${activeChat}`)
    .orderByChild('added')
    .limitToLast(25)
    .once('value')
    .then((snap) => snap.val())


module.exports = {
  getChats,
  getChatMessages,

  resetData,
  getUserActiveChat,
}
