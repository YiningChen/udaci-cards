import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import styles from '../utils/sharedStyles'
import TextButton from './TextButton'

class DeckView extends Component {
  static navigationOptions ({ navigation }) {
    return {
      title: navigation.state.params.title
    }
  }

  render () {
    const { title, questions } = this.props.currentDeck
    const navigate = this.props.navigation.navigate

    return (
      <View style={styles.verticallyCenterChildren}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subText}>{questions.length} cards</Text>
        <TextButton text='Add Card' onPress={() => navigate('AddCard')} />
        <TextButton text='Start Quiz' />
      </View>
    )
  }
}

function mapStateToProps ({ currentDeck }) {
  return { currentDeck }
}

export default connect(mapStateToProps)(DeckView)
