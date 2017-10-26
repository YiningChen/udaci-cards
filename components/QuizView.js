import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import api from '../utils/api'
import sharedStyles from '../utils/sharedStyles'
import TextButton from './TextButton'
import FlippableCard from './FlippableCard'

const DEFAULT_STATE = {
  quizMode: true,
  index: 0,
  nCorrect: 0
}

function Quiz ({questions, index, onPress}) {
  return (
    <View style={sharedStyles.verticallyCenterChildren}>
      <FlippableCard card={questions[index]} />
      <TextButton text='I got it correct!' onPress={() => onPress(true)} />
      <TextButton text='I got it wrong!' onPress={() => onPress(false)} />
    </View>
  )
}

function QuizCompleted ({nCorrect, retakeQuiz, goBack}) {
  return (
    <View style={sharedStyles.verticallyCenterChildren}>
      <Text style={sharedStyles.title}>
        Congrats! You got {nCorrect} correct!
      </Text>
      <TextButton text='Take Quiz Again' onPress={retakeQuiz} />
      <TextButton text='Go Back to Deck' onPress={goBack} />
    </View>
  )
}

class QuizView extends Component {
  constructor (props) {
    super(props)
    this.state = DEFAULT_STATE
  }

  incrementIndex (currentDeck, correct) {
    const length = currentDeck ? currentDeck.questions.length : 0

    this.setState(prevState => {
      let { index, quizMode, nCorrect } = prevState

      if (index < length - 1) {
        index = prevState.index + 1
      } else {
        quizMode = false
      }

      return {
        quizMode,
        index,
        nCorrect: correct ? nCorrect + 1 : nCorrect
      }
    })
  }

  render () {
    const { currentDeck, navigation } = this.props
    const questions = currentDeck && currentDeck.questions
    const { index, quizMode, nCorrect } = this.state
    const onPress = (correct) => this.incrementIndex(currentDeck, correct)
    const retakeQuiz = () => this.setState(DEFAULT_STATE)
    const goBack = () => navigation.goBack()

    return (
      <View style={{flex: 1}}>
        <Text style={{padding: 5}}>
          {index + 1} / {questions.length}
        </Text>
        {quizMode
          ? <Quiz index={index} questions={questions} onPress={onPress} />
          : <QuizCompleted nCorrect={nCorrect} retakeQuiz={retakeQuiz} goBack={goBack} />
        }
      </View>
    )
  }
}

function mapStateToProps ({ currentDeck }) {
  return ({ currentDeck })
}

export default connect(mapStateToProps)(QuizView)
