import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

function Card ({ title, number }) {
  return (
    <View style={styles.card}>
      <Text>{title}</Text>
      <Text>{number}</Text>
    </View>
  )
}

export default class DecksView extends Component {
  render () {
    return (
      <View>
        <Text>Decks!</Text>
        <Card title='testing' number='0' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d6d7da',
    margin: 10,
    justifyContent: 'center'
  }
})
