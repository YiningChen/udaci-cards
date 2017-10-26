import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  card: {
    padding: 20,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'dodgerblue',
    backgroundColor: 'cornflowerblue',
    justifyContent: 'center'
  },
  verticallyCenterChildren: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: 'cornflowerblue',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 30
  },
  subText: {
    alignSelf: 'center',
    paddingBottom: 20,
    color: 'darkgray'
  }
})
