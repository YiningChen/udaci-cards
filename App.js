import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import reducers from './reducers'
import DecksView from './components/DecksView'
import DecksNew from './components/DecksNew'
import DeckView from './components/DeckView'

const Tabs = TabNavigator({
  DecksView: {
    screen: DecksView,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  DecksNew: {
    screen: DecksNew,
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
  }
})

export default class App extends React.Component {
  render () {
    return (
      <Provider store={createStore(reducers)}>
        <MainNavigator />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
