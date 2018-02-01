import React from 'react'
import { StackNavigator } from 'react-navigation'
import Splash from './src/Splash'
import HomeScreen from './src/HomeScreen'

const AppNavigator = StackNavigator({
  // Home: { screen: Splash },
  Home: { screen: HomeScreen }
})

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    )
  }
}
