import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'

import TextButton from './TextButton'

class DeckView extends Component {
  static navigationOptions ({ navigation }) {
    return {
      title: navigation.state.params.title
    }
  }

  render () {
    const { title, questions } = this.props.currentDeck

    return (
      <View style={styles.verticallyCenterChildren}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subText}>{questions.length} cards</Text>
        <TextButton text='Add Card' />
        <TextButton text='Start Quiz' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  verticallyCenterChildren: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    alignSelf: 'center',
    fontSize: 30
  },
  subText: {
    alignSelf: 'center',
    paddingBottom: 20,
    color: 'darkgray'
  }
})

function mapStateToProps ({ currentDeck }) {
  return { currentDeck }
}

export default connect(mapStateToProps)(DeckView)
