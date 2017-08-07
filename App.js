import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

class LoginScreen extends React.Component {
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

class SignupScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };
  render() {
    return (
      <View style={styles.chatStyle}>
        <Text>Sign Up Now</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home Page',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.homeStyle}>
        <Text>This is the Home Page.</Text>
        <View style={styles.buttonStyle}>
        <Button
          onPress={() => navigate('Login')}
          title="Login"
          color="#ffffff"
        />
        </View>
        <View style={styles.buttonStyle}>
        <Button
          onPress={() => navigate('Signup')}
          title="Sign Up"
          color="#ffffff"
        />
        </View>
      </View>
    );
  }
}

const ScreenNavigator = StackNavigator({
  Home: { screen: HomeScreen},
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
});

export default class App extends React.Component {
  render() {
    navigate = (screen) => this.props.navigation;
    return (
      <View style={styles.container}>
        <ScreenNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeStyle: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatStyle: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width:200,
    backgroundColor: "#00F",
    marginTop: 20,
  },
});
