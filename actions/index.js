export const STORE_DECKS = 'STORE_DECKS'

export function storeDecks (decks) {
  return {
    type: STORE_DECKS,
    decks
  }
}
