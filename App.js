import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import reducers from './reducers'
import api from './utils/api'
import ViewDecks from './components/ViewDecks'
import AddDeck from './components/AddDeck'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'

const Tabs = TabNavigator({
  ViewDecks: {
    screen: ViewDecks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='library-plus' size={30} color={tintColor} />
    }
  }
})

const MainNavigator = StackNavigator({
  Decks: {
    screen: Tabs,
    navigationOptions: {
      title: 'Decks'
    }
  },
  DeckView: {
    screen: DeckView
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card'
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: 'Quiz!'
    }
  }
})

export default class App extends React.Component {
  componentDidMount () {
    api.setLocalNotification()
  }

  render () {
    return (
      <Provider store={createStore(reducers)}>
        <MainNavigator />
      </Provider>
    )
  }
}
