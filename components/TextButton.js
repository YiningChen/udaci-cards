import React from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'

export default function TextButton ({ text, styleOverrides, underlayColor, ...props }) {
  const buttonStyles = [styles.button, styleOverrides]
  return (
    <TouchableHighlight
      style={buttonStyles}
      underlayColor={underlayColor || 'dodgerblue'}
      {...props}
    >
      <Text style={styles.whiteText}>{text}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    alignSelf: 'center',
    backgroundColor: 'cornflowerblue',
    borderRadius: 5
  },
  whiteText: {
    color: 'white'
  }
})
