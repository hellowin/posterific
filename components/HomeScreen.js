import React, { Component } from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import storage from '../Model/PosterificStorage';
import { LoginButton } from 'react-native-fbsdk';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image
        resizeMode="cover"
        source={require('./../assets/images/login-splash-bg.jpg')}
        style={styles.splashContainer}
      >
      <Text style={styles.mainTitle}>Posterific!</Text>
        <Text style={styles.subTitle}>Poster making made easy.</Text>
        <LoginButton
          onLoginFinished={(err, res) => {
            console.log(res);
            if (err) {
              alert(`Error: ${err.toString()}`);
            } else if (res.isCancelled) {
              alert('Login was cancelled.');
            } else {
              alert('Login was ok.');
            }
          }}
        />
        <TouchableOpacity
          onPress={
            () => {
              this.props.navigator.push({
                name: 'PosterList'
              });
            }
          }
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: 180, height: 28, backgroundColor: '#4167ae', borderRadius: 3, margin: 20 }}>
            <Text style={{ margin: 3, color: 'white', fontWeight: 'bold' }}>Get Started</Text>
          </View>
        </TouchableOpacity>

      </Image>
    );
  }
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  mainTitle: {
    fontSize: 72,
    color: 'white'
  },
  subTitle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    fontSize: 18,
    color: 'white',
    marginBottom: 50
  }
});
