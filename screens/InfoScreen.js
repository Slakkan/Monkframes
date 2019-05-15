import React from 'react';
import { connect } from 'react-redux'
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'

import { clearStorage } from '../actions/albums'
import { setUser } from '../actions/auth'
import {  } from 'react-native-gesture-handler';

class InfoScreen extends React.Component {
  static navigationOptions = {
    title: 'Info',
  };

  changeUser(num) {
    this.props.setUser(num)
    clearStorage()
  }

  renderLoginButtons() {
    buttons = []
    for (let i = 1; i <= 10; i++) {
      const button = <Button
        title={`Login as user ${i}`}
        key={i}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        onPress={() => this.changeUser(i)} />
      buttons.push(button)
    }
    return buttons
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.renderLoginButtons()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    alignSelf: 'center',
    width: 250,
    padding: 25
  },
  button: {
    backgroundColor: '#f50'
  }
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (num) => dispatch(setUser(num))
})

export default connect(undefined, mapDispatchToProps)(InfoScreen)