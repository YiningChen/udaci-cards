import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

import sharedStyles from '../utils/sharedStyles'
import api from '../utils/api'
import { setCurrentDeck, storeDecks } from '../actions'

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
  constructor (props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(1)
    }
  }

  componentWillMount () {
    api.getDecks()
      .then(data => this.props.dispatch(storeDecks(data)))
  }

  componentWillUpdate () {
    api.getDecks()
      .then(data => this.props.dispatch(storeDecks(data)))
      .then(this.animateIn())
  }

  animateIn () {
    const { opacity } = this.state
    Animated.timing(opacity, { toValue: 1, duration: 500 })
      .start()
  }

  animateOut () {
    const { opacity } = this.state
    Animated.timing(opacity, { toValue: 0, duration: 500 })
      .start()
  }

  onCardPress (title) {
    const { dispatch, navigation } = this.props
    this.animateOut()
    api.getDeck(title)
      .then(data => dispatch(setCurrentDeck(data)))
      .then(() => navigation.navigate('DeckView', { title }))
  }

  render () {
    const { opacity } = this.state
    return (
      <Animated.View style={{ opacity }}>
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
      </Animated.View>
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
