import React from 'react';
import { AsyncStorage, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Login extends React.component {
	  static navigationOptions = {
    title: 'Login',
  };
  render() {
    return (
      <View style={styles.chatStyle}>
        <Text>Login Here</Text>
        <TextInput 
          style={{height: 40}}
          placeholder="Username"
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput 
          style={{height: 40}}
          placeholder="Password"
          onChangeText={(text) => this.setState({text})}
        />
      </View>
    );
  }
}