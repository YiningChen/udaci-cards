import React, { Component } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import sharedStyles from '../utils/sharedStyles'
import TextButton from './TextButton'

// flipping take from this:
// https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native
export default class FlippableCard extends Component {
  componentWillMount () {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  componentWillUpdate () {
    this.flipCard()
  }

  flipCard () {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start()
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start()
    }
  }

  render () {
    const { question, answer } = this.props.card
    const { onPress } = this.props
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    }
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    }

    return (
      <View style={styles.container}>

        <View>
          <Animated.View style={[sharedStyles.card, styles.cardFront, frontAnimatedStyle]}>
            <Text style={styles.cardText}>{question}</Text>
          </Animated.View>
          <Animated.View style={[sharedStyles.card, styles.cardBack, backAnimatedStyle]}>
            <Text style={styles.cardText}>{answer}</Text>
          </Animated.View>
        </View>

        <TextButton
          text='See Answer'
          styleOverrides={{backgroundColor: 'orange'}}
          onPress={() => {
            onPress && onPress()
            this.flipCard()
          }}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardFront: {
    height: 200,
    width: 300,
    backgroundColor: 'orange',
    borderColor: 'darkorange',
    backfaceVisibility: 'hidden'
  },
  cardBack: {
    height: 200,
    width: 300,
    backgroundColor: 'darkorange',
    borderColor: 'orange',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0
  },
  cardText: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 25
  }
})
