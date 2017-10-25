import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from '../utils/api'
import { storeDecks } from '../actions'
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

class DecksView extends Component {
  componentWillMount () {
    api.getDecks()
      .then(data => this.props.dispatch(storeDecks(data)))
  }

  render () {
    const { decks } = this.props

    return (
      <View>
        <Text>Decks!</Text>
        {decks && decks.map(
          ({title, questions}) => <Card key={title} title={title} number={questions.length} />
        )}
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

function mapStateToProps ({ decks }) {
  return { decks }
}

export default connect(mapStateToProps)(DecksView)
