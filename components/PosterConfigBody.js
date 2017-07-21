import React, { Component, PropTypes } from 'react';
import { View, Image, Text } from 'react-native';
import PosterModel from '../Model/PosterModel';

export default class PosterConfigScreen extends React.Component {

  static propTypes = {
    poster: React.PropTypes.instanceOf(PosterModel).isRequired,
  };

  static defaultProps = {
    poster: null,
  };

  render() {
    let isPortrait = this.props.poster.isPortrait;

    let placeholderImageSource = isPortrait ? require('./../assets/images/poster-placeholder-portrait.png') : require('./../assets/images/poster-placeholder-landscape.png');
    let dimensionsText = this.props.poster.backgroundImageUri.indexOf('file:///') != -1 ? '' : isPortrait ? '24" x 36"' : '36" x 24"';

    let posterFrameMarginVertical = isPortrait ? 50 : 100;
    let posterFrameMarginTop = isPortrait ? 25 : 50;
    let posterFrameStyle = Object.assign({}, styles.posterFrame,
      {
        marginTop: posterFrameMarginTop,
        marginVertical: posterFrameMarginVertical,
        backgroundColor: this.props.poster.backgroundColor
      }
    );

    let splashContainerWidth = isPortrait ? 175 : 250;
    let splashContainerHeight = isPortrait ? 250 : 175;
    let splashContainerStyle = Object.assign({}, styles.splashContainer,
      {
        width: splashContainerWidth,
        height: splashContainerHeight
      }
    );

    return (
      <View
        style={posterFrameStyle}
        collapsable={false}>
        <Image
          source={placeholderImageSource}
          style={splashContainerStyle}>
          <Image
            source={{ uri: this.props.poster.backgroundImageUri }}
            style={splashContainerStyle}>
            <Text style={styles.dimensions}>{dimensionsText}</Text>
            <View style={styles.captionBackground}>
              <Text style={styles.lorem}>{this.props.poster.caption}</Text>
            </View>
          </Image>
        </Image>
      </View>
    );
  }
}

const styles = {
  posterFrame: {
    flexDirection: 'column',
    alignSelf: "center",
    borderStyle: "solid",
    borderWidth: 10,
    borderColor: "#000",
    backgroundColor: "#fff",
    padding: 15,
  },
  splashContainer: {
    flex: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  dimensions: {
    fontSize: 24,
    color: 'darkgray'
  },
  captionBackground: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#eee',
    opacity: .65
  },
  lorem: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    padding: 5,
    bottom: 5,
  },
};
