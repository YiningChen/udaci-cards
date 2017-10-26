import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

import sharedStyles from '../utils/sharedStyles'
import api from '../utils/api'
import { setCurrentDeck, storeDecks } from '../actions'
import TextButton from './TextButton'

function Card ({ title, number, onPress }) {
  return (
    <TouchableHighlight style={sharedStyles.card} underlayColor='dodgerblue' onPress={onPress}>
      <View>
        <Text style={[styles.center, styles.white]}>{title}</Text>
        <Text style={[styles.center, styles.gray]}>{number} cards</Text>
      </View>
    </TouchableHighlight>
  )
}

class ViewDecks extends Component {
  componentWillMount () {
    api.getDecks()
      .then(data => this.props.dispatch(storeDecks(data)))
  }

  onCardPress (title) {
    const { dispatch, navigation } = this.props
    api.getDeck(title)
      .then(data => dispatch(setCurrentDeck(data)))
      .then(() => navigation.navigate('DeckView', { title }))
  }

  render () {
    return (
      <View>
        <TextButton text='clear storage' onPress={() => api.deleteAllData()} />
        <FlatList
          data={this.props.decks}
          renderItem={
            ({ item }) =>
              <Card
                title={item.title}
                number={item.questions.length}
                onPress={() => this.onCardPress(item.title)}
              />
          }
          keyExtractor={deck => deck.title}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps)(ViewDecks)
