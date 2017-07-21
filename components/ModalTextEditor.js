import React, { Component } from 'react'
import { Text, TouchableOpacity, View, TextInput, Button } from 'react-native'
import Modal from 'react-native-modal'
import { Container, Content, Picker, InputGroup, Input } from 'native-base';

export default class ModalTextEditor extends Component {

  static propTypes = {
    showTextEditor: React.PropTypes.func.isRequired,
    setPosterText: React.PropTypes.func.isRequired,
    posterText: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    showTextEditor: null,
    setPosterText: null,
    posterText: null
  };

  onTextChanged(value) {
    console.log(' the ModalTextEditor is passing ' + value + ' to it\'s parent');
    this.props.setPosterText(value);
  }

  render() {
    const styles = {
      textBackground: {
        backgroundColor: '#eee',
        padding: 15,
        flexDirection: 'column',
      },
    };

    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.props.isModalVisible}>
          <View style={styles.textBackground}>
            <InputGroup regular>
              <Input
                autoFocus={true}
                onChangeText={(text) => this.onTextChanged(text)}
                value={this.props.posterText}
              />
            </InputGroup>
            <Button title="OK" onPress={() => this.props.showTextEditor(false)}></Button>
          </View>
        </Modal>
      </View>
    )
  }

}

const Item = Picker.Item;

