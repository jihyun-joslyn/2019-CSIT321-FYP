import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

const dismissKeyboard = () => {
  Keyboard.dismiss();
};

export default function register({ navigation }) {
  const [userID, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [repwd, setRepwd] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("230");
  const [phone, setPhone] = useState("");


  const UserRegister = () => {
    if (pwd == repwd) {
      fetch('https://uowfyp2020.herokuapp.com/user/userRegister?userID=' + userID + '&pwd=' + pwd + '&name=' + name + '&phone=' + phone + '&email=' + email)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson == "220") {
            Alert.alert(
              'Register Success',
              'Register success! Welcome to Sharity',
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: false }
            )

            navigation.navigate('login');
          }
          else if (responseJson == "420") {
            Alert.alert(
              'Register Fail',
              'Please try again.',
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: false }
            )
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Alert.alert('Password Error', 'Re-enter Password is different with Password')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View ><Text style={styles.titletext}>Register</Text></View>
        <View style={styles.formcontainer}>
          <View><Text>&nbsp;</Text></View>
          <TextInput
            onChangeText={(userID) => setId(userID)}
            placeholder="User ID"
            placeholderTextColor="#808080"
            underlineColorAndroid={'grey'}
            style={styles.inputtext} />

          <TextInput
            onChangeText={(name) => setName(name)}
            placeholder="Name"
            placeholderTextColor="#808080"
            underlineColorAndroid={'grey'}
            style={styles.inputtext} />

          <TextInput
            secureTextEntry
            onChangeText={(password) => setPwd(password)}
            placeholder="Password"
            placeholderTextColor="#808080"
            underlineColorAndroid={'grey'}
            style={styles.inputtext} />

          <TextInput
            secureTextEntry
            onChangeText={(repwd) => setRepwd(repwd)}
            placeholder="Re-Enter Password"
            placeholderTextColor="#808080"
            underlineColorAndroid={'grey'}
            style={styles.inputtext} />

          <TextInput
            onChangeText={(phone) => setPhone(phone)}
            placeholder="Phone"
            placeholderTextColor="#808080"
            underlineColorAndroid={'grey'}
            style={styles.inputtext} />

          <TextInput
            onChangeText={(email) => setEmail(email)}
            placeholder="Email"
            placeholderTextColor="#808080"
            underlineColorAndroid={'grey'}
            style={styles.inputtext} />

          <View style={{ marginTop: 30, width: '75%', borderRadius: 15, alignSelf: 'center' }}>
            <Button color='#1979a9' title="Create Your Sharity Account" onPress={UserRegister} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1979a9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlebar: {
    backgroundColor: '#1979a9',
    paddingTop: 45,
    paddingBottom: 85,
    width: '100%',
    position: 'absolute',
    height: '100%',
    alignItems: 'center',
  },
  titletext: {
    color: 'white',
    fontSize: 60,
    textAlign: 'center',
    fontFamily: 'roboto-bold',
    marginBottom: 0
  },
  formcontainer: {
    backgroundColor: 'white',
    width: '80%',
    paddingTop: 35,
    paddingBottom: 35,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  inputtext: {
    height: 45,
    paddingLeft: 6,
    width: '90%',
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
    color: '#282828',
  },
});