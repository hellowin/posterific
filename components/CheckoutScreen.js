import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, ToastAndroid } from 'react-native';
import { Container, Content, Header, Left, Button, Icon, Body, Title } from 'native-base';
import PosterModel from '../Model/PosterModel';

export default class CheckoutScreen extends React.Component {

  static propTypes = {
    poster: React.PropTypes.instanceOf(PosterModel).isRequired,
  };

  static defaultProps = {
    poster: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      poster: this.props.poster,
    };
  }

  render() {
    return (
      <Image
        resizeMode="cover"
        source={require('./../assets/images/login-splash-bg.jpg')}
        style={styles.splashContainer}
      >
        <Container>
          <Header style={{ backgroundColor: '#3770CC' }}>
            <Left>
              <Button transparent onPress={
                () => {
                  this.props.navigator.pop()
                }
              }>
                <Icon name='md-arrow-round-back' />
              </Button>
            </Left>
            <Body>
              <Title style={{ fontSize: 15 }}>Checkout</Title>
            </Body>
          </Header>
          <Content contentContainerStyle={styles.contentContainer}>
            <View style={styles.imageTextWrapper}>
              <View style={styles.congratsWrapper}>
                <Text style={[styles.congrats]}>Thank You!</Text>
              </View>
              <View style={styles.imgWrapper}>
                <Image
                  resizeMode="contain"
                  style={styles.img}
                  source={{ uri: this.state.poster.thumbnailUri }}
                />
              </View>
            </View>

            <Button
              info
              iconRight
              block
              rounded
              style={{ margin: 10 }}
              onPress={() => {
                this.logUserPurchase();
              }}
            >
              <Text style={[styles.btnText]}>Buy Now</Text>
            </Button>

          </Content>
        </Container>
      </Image>
    )
  }

  logUserPurchase() {
    // assume that the "transaction" succeeded and the purchase was made
    ToastAndroid.showWithGravity("Your purchase was successful", ToastAndroid.LONG, ToastAndroid.CENTER);
  }
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 10,
  },

  congratsWrapper: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  congrats: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  imgWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  img: {
    width: 300,
    height: 300,
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

});
