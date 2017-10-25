import { combineReducers } from 'redux'
import { STORE_DECKS } from '../actions'

function decks (state = [], action) {
  switch (action.type) {
    case STORE_DECKS:
      return action.decks
    default:
      return state
  }
}

export default combineReducers({
  decks
})
