import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class PosterConfigScreen extends React.Component {

  static defaultProps = {
    orientationToggler: null,
    showBackgroundColorPicker: null,
    showTextEditor: null,
    imagePathSetter: null
  };

  static propTypes = {
    orientationToggler: React.PropTypes.func.isRequired,
    showBackgroundColorPicker: React.PropTypes.func.isRequired,
    showTextEditor: React.PropTypes.func.isRequired,
    imagePathSetter: React.PropTypes.func.isRequired
  };

  openPhotoPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400
    }).then(image => {
      console.log(image);
      // console.log(image.path);
      this.props.imagePathSetter(image.path)
    });
  }

  render() {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={
            () => this.props.orientationToggler()
          }>
            <View style={styles.buttonWrapper}>
              <Image source={require('./../assets/images/config-rotate.png')} />
              <Text>Rotate</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={
            () => this.openPhotoPicker()
          }>
            <View style={styles.buttonWrapper}>
              <Image source={require('./../assets/images/config-photo.png')} />
              <Text>Photo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={
            () => {
              this.props.showTextEditor()
            }
          }>
            <View style={styles.buttonWrapper}>
              <Image source={require('./../assets/images/config-caption.png')} />
              <Text>Caption</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={
            () => {
              this.props.showBackgroundColorPicker()
            }
          }>
            <View style={styles.buttonWrapper}>
              <Image source={require('./../assets/images/config-background.png')} />
              <Text>Background</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    backgroundColor: '#eee',
    opacity: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    height: 90,
  },
  buttonWrapper: {
    backgroundColor: '#eee',
    opacity: 0.8,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 2,
  },
};
