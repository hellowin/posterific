import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Button, Text, Icon, View } from 'native-base';

export default class PosterConfigFooterButtons extends React.Component {

  static propTypes = {
    pressHandler: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    pressHandler: null,
  };

  render() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          info
          iconLeft
          block
          rounded
          style={{ margin: 10 }}
          onPress={
            () => this.props.pressHandler('save')
          }
        >
          <Icon name="md-star" />
          <Text>Save       </Text>
        </Button>


        <TouchableOpacity onPress={
          () => {
            console.log('messenger button pressed');
          }
        }>
          <Image source={require('./../assets/images/facebook-messenger.png')} />
        </TouchableOpacity>

        <Button
          info
          iconRight
          block
          rounded
          style={{ margin: 10 }}
          onPress={
            () => this.props.pressHandler('buy')
          }
        >
          <Text>Buy Now</Text>
          <Icon name="md-cart" />
        </Button>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    height: 90,
  },
};
