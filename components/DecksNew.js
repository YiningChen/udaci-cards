import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { storeDecks } from '../actions'
import api from '../utils/api'
import StyledTextInput from './StyledTextInput'
import TextButton from './TextButton'

class DecksNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deckTitle: ''
    }
  }

  saveNewDeck () {
    const { dispatch, navigation } = this.props
    api.saveDeckTitle(this.state.deckTitle)
      .then(api.getDecks)
      .then(data => dispatch(storeDecks(data)))
      .then(() => navigation.navigate('DecksView'))
  }

  render () {
    return (
      <View>
        <StyledTextInput
          placeholder='new deck title!'
          onChangeText={(text) => this.setState({ deckTitle: text })}
          value={this.state.deckTitle}
        />
        <TextButton text='Submit' onPress={this.saveNewDeck.bind(this)} />
      </View>
    )
  }
}

export default connect()(DecksNew)
