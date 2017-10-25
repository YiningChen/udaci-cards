import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from '../utils/api'
import { storeDecks } from '../actions'
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native'

function Card ({ title, number }) {
  return (
    <View style={styles.card}>
      <Text style={[styles.center, styles.white]}>{title}</Text>
      <Text style={[styles.center, styles.gray]}>{number} cards</Text>
    </View>
  )
}

class DecksView extends Component {
  componentWillMount () {
    api.getDecks()
      .then(data => this.props.dispatch(storeDecks(data)))
  }

  render () {
    return (
      <FlatList
        data={this.props.decks}
        renderItem={({ item }) => <Card title={item.title} number={item.questions.length} />}
        keyExtractor={deck => deck.title}
      />
    )
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'dodgerblue',
    backgroundColor: 'cornflowerblue',
    justifyContent: 'center'
  },
  center: {
    alignSelf: 'center'
  },
  white: {
    color: 'white'
  },
  gray: {
    color: 'lightgray'
  }
})

function mapStateToProps ({ decks }) {
  return { decks }
}

export default connect(mapStateToProps)(DecksView)
