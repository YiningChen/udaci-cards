/* global alert */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { storeDecks } from '../actions'
import api from '../utils/api'
import StyledTextInput from './StyledTextInput'
import TextButton from './TextButton'

class AddDeck extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deckTitle: ''
    }
  }

  validateTitle (title) {
    return api.getDeck(title)
      .then(result => {
        if (title.length <= 0) {
          return Promise.reject('new deck title is empty!') // eslint-disable-line
        }
        if (result) {
          return Promise.reject('title already exists!') // eslint-disable-line
        }
        return true
      })
  }

  saveNewDeck () {
    const { dispatch, navigation } = this.props
    const title = this.state.deckTitle

    this.validateTitle(title)
      .then(() => api.saveDeckTitle(title))
      .then(api.getDecks)
      .then(data => dispatch(storeDecks(data)))
      .then(() => this.setState({ deckTitle: '' }))
      .then(() => navigation.navigate('ViewDecks'))
      .catch(invalidTitle => alert(invalidTitle))
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

export default connect()(AddDeck)
