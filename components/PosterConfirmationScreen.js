import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, ToastAndroid } from 'react-native';
import { Container, Content, Header, Left, Button, Icon, Body, Title } from 'native-base';
import PosterModel from '../Model/PosterModel';

export default class PosterConfirmationScreen extends React.Component {

  static propTypes = {
    poster: React.PropTypes.instanceOf(PosterModel).isRequired,
  };

  static defaultProps = {
    poster: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      poster: this.props.poster
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
                  this.props.navigator.pop();
                }
              }>
                <Icon name='md-arrow-round-back' />
              </Button>
            </Left>
            <Body>
              <Title style={{ fontSize: 15 }}>Order Confirmation</Title>
            </Body>
          </Header>
          <Content contentContainerStyle={styles.contentContainer}>
            <View style={styles.imageTextWrapper}>
              <View style={styles.textWrapper}>
                <View>
                  <Text style={[styles.topText, styles.labels]}>Size:</Text>
                  <Text style={[styles.topText, styles.notlabels]}>{this.state.poster.isPortrait ? '24" x 36"' : '36" x 24"'}</Text>
                </View>
                <View>
                  <Text style={[styles.topText, styles.labels]}>Price:</Text>
                  <Text style={[styles.topText, styles.notlabels]}>$42.95</Text>
                </View>
              </View>
              <View style={styles.imgWrapper}>
                <Image
                  ref="snapshotForSharing"
                  resizeMode="contain"
                  style={styles.img}
                  source={{ uri: this.state.poster.thumbnailUri }}
                />
              </View>
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                info
                iconRight
                block
                rounded
                style={{ margin: 10 }}
                onPress={() => {
                  this.props.navigator.push({
                    name: 'Checkout',
                    passProps: {
                      poster: this.state.poster
                    }
                  })
                }}
              >
                <Text style={[styles.btnText]}>Proceed to Checkout</Text>
                <Icon name="md-cart" />
              </Button>
            </View>
          </Content>
        </Container>
      </Image>
    )
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
  imageTextWrapper: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  textWrapper: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
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
  topText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  labels: {
    fontSize: 14,
  },
  notlabels: {
    fontSize: 20,
  },
  buttonWrapper: {
    padding: 2,
  },

});
