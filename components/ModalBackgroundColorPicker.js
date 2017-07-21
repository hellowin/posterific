import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Button } from 'react-native'
import Modal from 'react-native-modal'
import { Container, Content, Picker } from 'native-base';

export default class ModalBackgroundColorPicker extends Component {

  static propTypes = {
    showBackgroundColorPicker: React.PropTypes.func.isRequired,
    setBackgroundColor: React.PropTypes.func.isRequired,
    bgColor: React.PropTypes.string.isRequired,
  };

  static defaultProps = {
    showBackgroundColorPicker: null,
    setBackgroundColor: null,
    bgColor: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.bgColor
    }
  }

  onValueChange(value) {
    this.setState({
      selectedValue: value
    });
    this.props.setBackgroundColor(value)
  }

  render() {
    const styles = {
      modalWrapper: {
        backgroundColor: '#eee',
        padding: 15,
        flexDirection: 'column',
      },
    };
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.props.isModalVisible} style={{ flex: 1 }}>
          <View style={styles.modalWrapper}>
            <Picker
              prompt="Select a color"
              mode="dialog"
              selectedValue={this.state.selectedValue}
              onValueChange={this.onValueChange.bind(this)}>
              <Item label="White" value="white" />
              <Item label="Bisque" value="bisque" />
              <Item label="Cornsilk" value="cornsilk" />
              <Item label="SaddleBrown" value="saddlebrown" />
              <Item label="OliveDrab" value="olivedrab" />
              <Item label="CadetBlue" value="cadetblue" />
              <Item label="MidnightBlue" value="midnightblue" />
              <Item label="HoneyDew" value="honeydew" />
              <Item label="NavajoWhite" value="navajowhite" />
            </Picker>
            <Button title="OK" onPress={() => this.props.showBackgroundColorPicker(false)}></Button>
          </View>
        </Modal>
      </View>
    )
  }

}

const Item = Picker.Item;
