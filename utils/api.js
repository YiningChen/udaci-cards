import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'udaciCards:deck-storage-key'

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

function deleteALlData () {
  return AsyncStorage.clear()
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
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(dataString => JSON.parse(dataString))
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
}

export default {
  deleteALlData,
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck
}
