export const STORE_DECKS = 'STORE_DECKS'
export const SET_CURRENT_DECK = 'SET_CURRENT_DECK'

export function storeDecks (decks) {
  return {
    type: STORE_DECKS,
    decks
  }
}

export function setCurrentDeck (deck) {
  return {
    type: SET_CURRENT_DECK,
    deck
  }
}
