import { StyleSheet, Text, View, AsyncStorage } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    backgroundColor: 'skyblue',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    backgroundColor: 'skyblue',
  },
  footer: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 0,
    backgroundColor: 'skyblue',
  }
});

export default styles;