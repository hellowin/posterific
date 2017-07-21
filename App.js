import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import HomeScreen from './components/HomeScreen';
import PosterConfigScreen from './components/PosterConfigScreen';
import PosterListScreen from './components/PosterListScreen';
import PosterConfirmationScreen from './components/PosterConfirmationScreen';
import CheckoutScreen from './components/CheckoutScreen';

export default class Posterific extends Component {

  renderScene(route, navigator) {
    if (route.name === 'Home') {
      return <HomeScreen navigator={navigator} />
    }
    if (route.name === 'PosterList') {
      return <PosterListScreen navigator={navigator} />
    }
    if (route.name === 'PosterConfig') {
      return <PosterConfigScreen navigator={navigator} {...route.passProps} />
    }
    if (route.name === 'PosterConfirmation') {
      return <PosterConfirmationScreen navigator={navigator} {...route.passProps} />
    }
    if (route.name === 'Checkout') {
      return <CheckoutScreen navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ name: 'Home' }}
        renderScene={this.renderScene}
      />
    )
  }
}

AppRegistry.registerComponent('posterific', () => Posterific);
