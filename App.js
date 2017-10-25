import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DecksView from './components/DecksView'
import DecksNew from './components/DecksNew'

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

export default class App extends React.Component {
  render () {
    return (
        <Tabs />
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
