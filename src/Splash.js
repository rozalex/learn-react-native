import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { strings } from '../locales/i18n'

export default class App extends React.Component {
	static navigationOptions = {
		header: null
	}

	
	componentWillMount() {
		setTimeout(() => {
      		this.props.navigation.navigate('mainScreen')
		}, 6000)
	}

  	render() {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{strings('splashMessage')}</Text>
          <Text></Text>
        </View>
  	)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
  	color: '#fff',
  	fontSize: 30
  }
});
