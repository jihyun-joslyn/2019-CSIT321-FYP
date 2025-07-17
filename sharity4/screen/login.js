import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard, AsyncStorage, Image, Linking } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  iconcontainer: {
    marginTop: 35,
    marginBottom: 10,
    backgroundColor: '#1979a9',
    width: '100%',
    height: '50%',
    alignContent: 'center',
    justifyContent: 'center'
  },
  inputtext: {
    height: 45,
    paddingLeft: 6,
    width: '70%',
    fontSize: 15,
    marginBottom: 5,
    color: '#282828',
  },
});

export default class login extends Component {
  constructor(navigation) {
    super(navigation);
    this.state = {
      userID: "",
      pwd: "",
      code: "",
    };
  }

  checkInput = () => {
    console.log("into check input");
    if (this.state.userID == "" || this.state.userID == null || this.state.pwd == "" || this.state.pwd == null) {
      Alert.alert(
        'Error',
        'All fields should not be blank.',
        [
          {
            text: 'OK', onPress: () => {
              console.log('OK Pressed');

              this.setState({
                pwd: ""
              })
            }
          },
        ],
        { cancelable: false }
      )
    }
    else {
      console.log("into else");
      fetch('https://uowfyp2020.herokuapp.com/user/checkUser?userID=' + this.state.userID + "&pwd=" + this.state.pwd)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);

          if (responseJson == "210") {
            this.saveUserId(this.state.userID);
            console.log(this.state.userID);
            console.log(this.saveUserId(this.state.userID));
            this.props.navigation.navigate("menu");
          }
          else if (responseJson == "410")
            Alert.alert(
              'Wrong Password',
              'Please enter the password again.',
              [
                {
                  text: 'OK', onPress: () => {
                    console.log('OK Pressed');
                    this.setState({
                      pwd: ""
                    })
                  }
                },
              ],
              { cancelable: false }
            )
          else if (responseJson == "405")
            Alert.alert(
              'User not exists',
              'Wrong userID or please register first.',
              [
                {
                  text: 'OK', onPress: () => {
                    this.props.navigation.navigate('register');
                    console.log('OK Pressed')
                  }
                },
              ],
              { cancelable: false }
            )
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  saveUserId = async userID => {
    try {
      await AsyncStorage.setItem('userID', userID);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  dismissKeyboard = () => {
    console.log('dismissed');
    Keyboard.dismiss();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
        <View style={styles.container}>
          <View style={styles.iconcontainer}>
            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
              <Image style={{ width: '85%' }} source={require('../assets/images/logotwo.png')} />
            </View>
          </View>

          <TextInput
            onChangeText={(id) => this.setState({ userID: id })}
            placeholder="User ID"
            placeholderTextColor="#808080"
            underlineColorAndroid={'grey'}
            style={styles.inputtext} />

          <TextInput
            secureTextEntry
            onChangeText={(pwd) => this.setState({ pwd: pwd })}
            placeholder="Password"
            placeholderTextColor="#808080"
            underlineColorAndroid={'grey'}
            style={styles.inputtext} />

          <View style={{ marginTop: 15, width: '70%' }}>
            <Button color='#1979a9' title="Login" onPress={this.checkInput} />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text onPress={() => this.props.navigation.navigate('register')} style={{ color: '#808080' }}>
              Create an account
              </Text>
          </View>

          <View style={{ marginTop: 5 }}>
            <Text style={{ textAlign:'center',color: '#808080' }}>Remender: Read the &nbsp;
            <Text style={{ textAlign:'center',color: 'blue' }}
                onPress={() => Linking.openURL('https://uowgoodstudent.wixsite.com/projectplanning/about-1')}>
                Disclaimer
            </Text>
            &nbsp; before the register of the application.
            </Text>
          </View>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}
