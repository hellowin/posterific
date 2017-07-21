import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';
import PosterConfigButtonBar from './PosterConfigButtonBar.js';
import PosterConfigBody from './PosterConfigBody.js';
import PosterConfigFooterButtons from './PosterConfigFooterButtons.js';
import { Container, Content, Header, Left, Right, Button, Icon, Body, Title, Picker } from 'native-base';
import ModalBackgroundColorPicker from './ModalBackgroundColorPicker';
import ModalTextEditor from './ModalTextEditor';
import PosterModel from '../Model/PosterModel';
import { takeSnapshot, dirs } from 'react-native-view-shot';
import storage from '../Model/PosterificStorage';

const { DownloadDir } = dirs;

export default class PosterConfigScreen extends React.Component {

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
      isColorPickerVisible: false,
      isTextEditorVisible: false,
    };
  }

  updatePoster = (newPoster) => {
    this.setState({poster: newPoster});
  }
  toggleOrientation = () => {
    this.updatePoster(Object.assign(this.state.poster, { isPortrait: !this.state.poster.isPortrait }));
  }
  setPosterImagePath = (imagePath) => {
    this.updatePoster(Object.assign(this.state.poster, { backgroundImageUri: imagePath }));
  }
  setPosterText = (requestedText) => {
    this.updatePoster(Object.assign(this.state.poster, { caption: requestedText }));
  }
  setBackgroundColor = (requestedColor) => {
    this.updatePoster(Object.assign(this.state.poster, { backgroundColor: requestedColor }));
  }

  showBackgroundColorPicker = (isVisible = true) => {
    this.setState({ isColorPickerVisible: isVisible });
  }
  showTextEditor = (isVisible = true) => {
    this.setState({ isTextEditorVisible: isVisible });
  }


  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  pressHandler = (btn) => {

    let path = '';
    let posterId = '';

    if (this.props.poster.id === "-1") {
      path = DownloadDir + "/Posterific" + Math.random().toString().split('.')[1] + ".jpg";
      posterId = this.guid();
    } else {
      path = this.props.poster.thumbnailUri;
      posterId = this.props.poster.id;
    }

    console.log('saving the poster');
    takeSnapshot(this.refs['snapshot'], {
      path: path,
      format: 'jpeg',
      quality: 0.8,
      result: 'base64'
    }).then(
      (base64data) => {
        let poster = Object.assign(this.state.poster, {id: posterId, thumbnailUri: 'data:image/png;base64,' + base64data});

        storage.load({
          key: 'posters'
        }).then(posters => {

          let foundPosterIndex = posters.findIndex(poster => poster.id === posterId);
          if (foundPosterIndex === -1) {
            posters.push(poster);
          } else {
            posters[foundPosterIndex] = poster;
          }
          storage.save({
            key: 'posters',
            rawData: posters
          });

          switch(btn) {
            case 'save' :
              this.redirectOnSave();
            break;
            case 'buy' :
              this.navigateToConfirmation();
            break;
          }

        }).catch(err => {
          //console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
            case 'ExpiredError':
              storage.save({
                key: 'posters',
                rawData: [poster]
              });
              this.redirectOnSave();
              break;
          }
        });
      },
      error => console.error("Snapshot failed", error)
      );


  }

  navigateToConfirmation = () => {
    this.props.navigator.push({
      name: 'PosterConfirmation',
      passProps: {
        poster: this.state.poster
      }
    })
  }

  redirectOnSave = () => {
    this.props.navigator.push({
      name: 'PosterList'
    })
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#FFF' }}>
        <Image source={require('./../assets/images/poster-editor-bg.jpg')}
          style={styles.backgroundImage}>
          <Header style={{ backgroundColor: '#3770CC' }}>
            <Left>
              <Button transparent>
                <Icon
                  onPress={() => {
                    this.props.navigator.pop();
                  }}
                  name='md-arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title style={{ fontSize: 15 }}>Design Your Poster</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <PosterConfigButtonBar
              orientationToggler={this.toggleOrientation}
              imagePathSetter={this.setPosterImagePath}
              showBackgroundColorPicker={this.showBackgroundColorPicker}
              showTextEditor={this.showTextEditor}
            />

            <PosterConfigBody
              ref="snapshot"
              poster={this.state.poster}
            />

            <ModalBackgroundColorPicker
              isModalVisible={this.state.isColorPickerVisible}
              showBackgroundColorPicker={this.showBackgroundColorPicker}
              setBackgroundColor={this.setBackgroundColor}
              bgColor={this.state.poster.backgroundColor}
            />

            <ModalTextEditor
              isModalVisible={this.state.isTextEditorVisible}
              showTextEditor={this.showTextEditor}
              setPosterText={this.setPosterText}
              posterText={this.state.poster.caption}
            />

          </Content>
          <PosterConfigFooterButtons
            pressHandler={this.pressHandler}
          />

        </Image>
      </Container>
    );
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
};
