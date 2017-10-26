import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const DECK_STORAGE_KEY = 'udaciCards:deck-storage-key'
const NOTIFICATION_KEY = 'udaciCards:notifications'

const DUMMY_DATA = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

function setDummyData () {
  return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(DUMMY_DATA))
}

function getDecksFromStorage () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(dataString => JSON.parse(dataString))
}

function getDecksAsArray () {
  return getDecksFromStorage()
    .then(data => data && Object.values(data))
}

function getDecks () {
  return getDecksAsArray()
    .then(data => (data && data.length > 0) ? data : setDummyData().then(getDecksAsArray))
}

function getDeck (id) {
  return getDecksFromStorage()
    .then(data => data && data[id])
}

function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

function addCardToDeck (title, card) {
  return getDeck(title)
    .then(deck => deck.questions.push(card) && deck)
    .then(deck => AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ [title]: deck })))
}

function createNotification () {
  return {
    title: 'Quiz Time!',
    body: 'Don\'t forget to take the quiz today!',
    ios: {
      sound: true
    }
  }
}

function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(data => JSON.parse(data))
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export default {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck,
  setLocalNotification,
  clearLocalNotification
}
