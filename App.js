import Expo, { SQLite, Constants } from 'expo';
import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

const db = SQLite.openDatabase({ name: 'db.db' });

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home Page',
  };

  render () {
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
          onPress={() => navigate('Register')}
          title="Register"
          color="#ffffff"
        />
        </View>
        <View style={styles.buttonStyle}>
        <Button
          onPress={() => navigate('Users')}
          title="List All Users"
          color="#ffffff"
        />
        </View>
      </View>
    );
  }
}

class Items extends React.Component {
  state = {
    items: null,
  };

  componentDidMount() {
    this.update();
  }
      
  render() {
    const { items } = this.state;
    if (items === null || items.length === 0) {
      return null;
    }
    return (
      <ScrollView>
        <View style={{ margin: 5 }}>
          {items.map(({ id, done, value, firstname, lastname, username }) => (
              <TouchableOpacity
                key={id}
                style={{
                  padding: 5,
                  backgroundColor: done ? '#aaffaa' : 'white',
                  borderColor: 'black',
                  borderWidth: 1,
                }}>
                <Text>{id, value}</Text>
              </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  update() {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items;`,
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }
}

class Register extends React.Component {
  state = {
    value: null,
    firstname: null,
    lastname: null,
    username: null,
    password: null,
  };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, value text);'
      );
      tx.executeSql(
        'delete from items where done;'
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ValueScreen/>
      </View>
    );
  }
}

class ValueScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.state = {firstname: ''};
    this.state = {lastname: ''};
    this.state = {password: ''};
  }

  render () {
    return (
      <View>
      <View
        style={{
        flexDirection: 'row',
        }}>
          <TextInput
            style={{
              flex: 1,
              padding: 5,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            placeholder="First Name"
            value={this.state.firstname}
            onChangeText={firstname => this.setState({ firstname })}
            onSubmitEditing={() => {
              // this.gather(this.state.firstname);
            }}
            returnKeyType="next"
          />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
          <TextInput
            style={{
              flex: 1,
              padding: 5,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            placeholder="Last Name"
            value={this.state.lastname}
            onChangeText={lastname => this.setState({ lastname })}
            onSubmitEditing={() => {
              // this.gather(this.state.lastname);
            }}
            returnKeyType="next"
          />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
          <TextInput
            style={{
              flex: 1,
              padding: 5,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            placeholder="Username"
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            onSubmitEditing={() => {
              // this.gather(this.state.username);
            }}
            returnKeyType="next"
          />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
          <TextInput
            style={{
              flex: 1,
              padding: 5,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            onSubmitEditing={() => {
              // this.gather(this.state.password);
            }}
            returnKeyType="done"
          />
      </View>
      <View>
        <Button
          onPress={this.submitHandler}
          title="Submit"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      </View>
    );
  }

  submitHandler = () => {
    this.gather(this.state.firstname);
    this.gather(this.state.lastname);
    this.gather(this.state.username);
    this.gather(this.state.password);
    this.setState({ firstname: null });
    this.setState({ lastname: null });
    this.setState({ username: null });
    this.setState({ password: null });
  }

  gather = (firstname, lastname, username, password) => {
    const firstnameState = this.state.firstname;
    const lastnameState = this.state.lastname;
    const usernameState = this.state.username;
    const passwordState = this.state.password;

    if (firstnameState === null || lastnameState === null || usernameState === null || passwordState === null) {
      return null;
    } else {
      this.add(firstnameState, lastnameState, usernameState, passwordState);
    }
  }

  add = (firstname, lastname, username, password) => {
    db.transaction(
      tx => {
        tx.executeSql('insert into items (firstname, lastname, username, password) values (?, ?, ?, ?)', [firstname, lastname, username, password]);
        tx.executeSql('select * from items', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      // this.update
    );
  }
}

class UserList extends React.Component {
  navigationOptions = {
    title: 'Users',
  };
  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
        style={{ 
          flex: 1, backgroundColor: 'gray' 
        }}
        onPress={() => navigate('Profile')}>
            <Items
            />
        </TouchableOpacity>
      </View>
    );
  }
}

class Profile extends React.Component {
  navigationOptions = {
    title: 'Profile',
  };

  render () {
    return (
      <View style={styles.container}>
        <Text>
          user
        </Text>
      </View>
    );
  }
}

const ScreenNavigator = StackNavigator({
  Welcome: { screen: WelcomeScreen},
  Register: { screen: Register },
  Users: { screen: UserList },
  Profile: { screen: Profile },
});

export default class App extends React.Component {
  render () {
    navigate = (screen) =>this.props.navigation;

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
    paddingTop: Expo.Constants.statusBarHeight,
  },
  homeStyle: {
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

Expo.registerRootComponent(App);