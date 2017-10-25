import { combineReducers } from 'redux'
import { STORE_DECKS, SET_CURRENT_DECK } from '../actions'

function currentDeck (state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_DECK:
      return action.deck
    default:
      return state
  }
}

function decks (state = [], action) {
  switch (action.type) {
    case STORE_DECKS:
      return action.decks
    default:
      return state
  }
}

export default combineReducers({
  currentDeck,
  decks
})
