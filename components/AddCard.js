/* global alert */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView } from 'react-native'
import api from '../utils/api'
import styles from '../utils/sharedStyles'
import { setCurrentDeck } from '../actions'
import StyledTextInput from './StyledTextInput'
import TextButton from './TextButton'

class AddCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      question: '',
      answer: ''
    }
  }

  emptyInputs (question, answer) {
    if (!question || !answer) {
      alert('Please input a question and answer')
      return true
    }
    return false
  }

  addNewCard () {
    const { question, answer } = this.state
    const { dispatch, navigation, currentDeck } = this.props
    const title = currentDeck.title

    if (this.emptyInputs(question, answer)) {
      navigation.goBack()
    }

    api.addCardToDeck(title, { question, answer })
      .then(() => api.getDeck(title))
      .then(data => dispatch(setCurrentDeck(data)))
      .then(() => this.setState({ question: '', answer: '' }))
      .then(() => navigation.goBack())
  }

  render () {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.verticallyCenterChildren}>
        <StyledTextInput
          placeholder='new question'
          onChangeText={(text) => this.setState({ question: text })}
          value={this.state.question}
        />
        <StyledTextInput
          placeholder='new answer'
          onChangeText={(text) => this.setState({ answer: text })}
          value={this.state.answer}
        />
        <TextButton text='Submit' onPress={this.addNewCard.bind(this)} />
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps ({ currentDeck }) {
  return { currentDeck }
}

export default connect(mapStateToProps)(AddCard)
