import React, { Component } from 'react';
import { TouchableOpacity, Image, Dimensions } from 'react-native';
import PhotoGrid from 'react-native-photo-grid';
import { Container, Content, Header, Left, Right, Button, Text, Icon, Body, Title, Fab, View, List, ListItem, Thumbnail } from 'native-base';
import storage from '../Model/PosterificStorage';
import PosterModel from '../Model/PosterModel';
var { height } = Dimensions.get('window');

export default class PosterListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listMode: false,
      posters: [],
    };
  }

  componentWillMount = () => {
    let tmpThis = this;

    // load saved posters from storage
    storage.load({
      key: 'posters'
    }).then(posters => {
      tmpThis.setState({ posters: posters });
    }).catch(err => {
      console.log("no posters found: " + err.message);
    });
  };

  navigateToConfig = (poster) => {
    this.props.navigator.push({
      name: 'PosterConfig',
      passProps: {
        poster: poster
      }
    })
  }

  navigateToConfirmation = (poster) => {
    this.props.navigator.push({
      name: 'PosterConfirmation',
      passProps: {
        poster: poster
      }
    })
  }

  removeFromStorage = (posterToRemove) => {
    let tmpThis = this;
    let posters = this.state.posters;
    let indexOfPosterToRemove = posters.findIndex(poster => poster.id === posterToRemove.id);
    if (indexOfPosterToRemove !== -1) {
      posters.splice(indexOfPosterToRemove, 1);
    } else {
      console.log("something is broken, can't delete");
    }
    storage.save({
      key: 'posters',
      rawData: posters
    }).then(() => {
      tmpThis.setState({ posters: posters});
    });
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Header
          style={{
            backgroundColor: '#3770CC',
          }}
        >
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigator.pop();
              }}
            >
              <Icon name='md-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 15 }}>Your Saved Posters</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.setState({ listMode: !this.state.listMode });
              }}
            >
              <Icon name={this.state.listMode ? 'md-grid' : 'md-list'} />
            </Button>
          </Right>
        </Header>
        <Content>
          {this.state.posters.length === 0 ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ paddingTop: height / 3, fontSize: 24 }}>
                Click the button below to get started.
              </Text>
            </View>
            :
            this.renderPosters()
          }
        </Content>
        <Fab
          style={{ backgroundColor: '#3770CC' }}
          position="bottomRight"
          onPress={() => {
            this.navigateToConfig(new PosterModel("-1", false, 'Poster Text', './../assets/images/poster-placeholder-landscape.png', 'white', ''))
          }}
        >
          <Icon name="md-add" />
        </Fab>
      </Container>
    );
  }

  renderPosters = () => {
    return (
      this.state.listMode ? this.renderPhotoList() : this.renderPhotoGrid()
    )
  }

  renderPhotoGrid = () => {
    return (
      <PhotoGrid
        data={this.state.posters}
        itemsPerRow={2}
        itemMargin={2}
        renderItem={this.renderGridItem}
      />
    )
  }

  renderGridItem = (item, itemSize) => {
    let poster = new PosterModel(item.id, item.isPortrait, item.caption, item.backgroundImageUri, item.backgroundColor, item.thumbnailUri)
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={poster.id}
        style={{ width: itemSize, height: itemSize }}
        onPress={() => {
          this.navigateToConfig(poster);
        }}
      >
        <Image
          resizeMode="contain"
          style={{ flex: 1, margin: 3 }}
          source={{ uri: item.thumbnailUri }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            small
            info
            rounded
            style={{ margin: 10 }}
            onPress={() => {
              this.removeFromStorage(poster);
            }}
          >
            <Icon name="md-trash" />
          </Button>
          <Button
            small
            info
            rounded
            style={{ marginTop: 10, marginBottom: 10 }}
            onPress={() => {
              this.navigateToConfirmation(poster);
            }}
          >
            <Icon name="md-cart" />
          </Button>
        </View>
      </TouchableOpacity>
    )
  }

  renderPhotoList = () => {
    return (
      <List
        dataArray={this.state.posters}
        renderRow={this.renderListRow}
      />
    )
  }

  renderListRow = (data) => {
    let poster = new PosterModel(data.id, data.isPortrait, data.caption, data.backgroundImageUri, data.backgroundColor, data.thumbnailUri)
    return (
      <ListItem
        thumbnail
        onPress={() => {
          this.navigateToConfig(poster);
        }}
      >
        <Left>
          <Thumbnail source={{ uri: poster.thumbnailUri }} />
        </Left>
        <Body>
          <Text style={{ margin: 8 }}>{poster.caption}</Text>
        </Body>
        <Right>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button
              small
              info
              rounded
              style={{ margin: 4 }}
              onPress={
                () => this.removeFromStorage(poster)
              }
            >
              <Icon name="md-trash" />
            </Button>
            <Button
              small
              info
              rounded
              style={{ margin: 4 }}
              onPress={
                () => this.navigateToConfirmation(poster)
              }
            >
              <Icon name="md-cart" />
            </Button>
          </View>
        </Right>
      </ListItem>
    )
  }

}
