import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Image, Button, TextInput, TouchableWithoutFeedback, Keyboard, AsyncStorage, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const dismissKeyboard = () => {
  Keyboard.dismiss();
};

export default class editUserProfile extends Component {
  constructor(navigation) {
    super(navigation);
    this.state = {
      _id: "",
      _email: "",
      _address: "",
      _bio: "",
      _itm: {},
      _name: "",
      editmode: 0,
      accountID: "",
    };
  }
  componentDidMount() {
    this.getAsync();
  }


  getAsync = async () => {
    const value = await AsyncStorage.getItem('userID');
    if (value !== null) {
      this.setState({
        _id: value
      });
    }

    fetch("https://uowfyp2020.herokuapp.com/user/getUserDetail?uID=" + this.state._id)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          _id: responseJson.userID,
          _name: responseJson.name,
          _email: responseJson.email,
          _address: responseJson.address,
          _bio: responseJson.bio,
          accountID: responseJson.accountID,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  UpdateInfo = () => {
    fetch("https://uowfyp2020.herokuapp.com/user/changeUserInfo?accountID=" + this.state.accountID + "&userID=" + this.state._id + "&email=" + this.state._email + "&address=" + this.state._address + "&bio=" + this.state._bio + "&name=" + this.state._name)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson == "205") {
          Alert.alert(
            'Update Success',
            'User info update success',
            [
              {
                text: 'OK', onPress: () => {
                  console.log('OK Pressed')
                  this.setState({ editmode: 0 })
                }
              },
            ],
            { cancelable: false }
          )
        }
        else if (responseJson == "405") {
          Alert.alert(
            'Update Fail',
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
  }



  render() {
    var content;
    if (this.state.editmode == 0) {
      content = (
        <View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.labelcontainer}>
              <Text style={styles.labeltext}>ID</Text>
              <Text style={styles.labeltext}>Name</Text>
              <Text style={styles.labeltext}>Email</Text>
              <Text style={styles.labeltext}>Address</Text>
              <Text style={styles.labeltext}>Bio</Text>
            </View>
            <View style={styles.infocontainer}>
              <Text style={styles.idtext}>{this.state._id}</Text>
              <Text style={styles.infotext}>{this.state._name}</Text>
              <Text style={styles.infotext}>{this.state._email}</Text>
              <Text style={styles.infotext}>{this.state._address}</Text>
              <Text style={styles.infotext}>{this.state._bio}</Text>
            </View>
          </View>
          <View style={{ marginTop: 10, padding: 10, width: 200, alignSelf: 'center' }}>
            <Button color='#1979a9' title="Edit Your Profile" onPress={() => { this.setState({ editmode: 1 }) }} />
          </View>
        </View>

      );
    } else if (this.state.editmode == 1) {
      content = (
        <View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.labelcontainer}>
              <Text style={styles.labeltext}>ID</Text>
              <Text style={styles.labeltext}>Name</Text>
              <Text style={styles.labeltext}>Email</Text>
              <Text style={styles.labeltext}>Address</Text>
              <Text style={styles.labeltext}>Bio</Text>
            </View>
            <View style={styles.infocontainer}>
              <TextInput
                onChangeText={(value) => { this.setState({ _id: value }) }}
                placeholder="User ID"
                placeholderTextColor="#808080"
                underlineColorAndroid={'grey'}
                style={styles.inputtext}
                value={this.state._id} />

              <TextInput
                onChangeText={(value) => { this.setState({ _name: value }) }}
                placeholder="Name"
                placeholderTextColor="#808080"
                underlineColorAndroid={'grey'}
                style={styles.inputtext}
                value={this.state._name} />
              <TextInput
                onChangeText={(value) => { this.setState({ _email: value }) }}
                placeholder="Email"
                placeholderTextColor="#808080"
                underlineColorAndroid={'grey'}
                style={styles.inputtext}
                value={this.state._email} />

              <TextInput
                onChangeText={(value) => { this.setState({ _address: value }) }}
                placeholder="Address"
                placeholderTextColor="#808080"
                underlineColorAndroid={'grey'}
                style={styles.inputtext}
                value={this.state._address} />

              <TextInput
                multiline
                onChangeText={(value) => { this.setState({ _bio: value }) }}
                placeholder="Bio"
                placeholderTextColor="#808080"
                underlineColorAndroid={'grey'}
                style={styles.inputtext}
                value={this.state._bio} />
            </View>
          </View>
          <View style={{ marginTop: 10, padding: 10, width: 200, alignSelf: 'center' }}>
            <Button color='#1979a9' title="Save" onPress={this.UpdateInfo} />
          </View>
          <View style={{ padding: 10, width: 200, alignSelf: 'center' }}>
            <Button color='#1979a9' title="Change Password" onPress={() => this.props.navigation.navigate('changePW')} />
          </View>
        </View>
      );

    }
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View><Image source={require('../assets/images/userSample.png')} /></View>
          {content}
        </View>
      </TouchableWithoutFeedback>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  infocontainer: {
    width: wp('75%'),
    marginTop: 40,
    paddingLeft: 10,
    borderTopColor: '#a9a9a9',
    borderTopWidth: 1,
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  labelcontainer: {
    width: wp('25%'),
    marginTop: 40,
    paddingLeft: 10,
    borderTopColor: '#a9a9a9',
    borderTopWidth: 1,
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  labeltext:{
    padding: 10,
    fontSize: 15,
    color:'grey'
  },
  idtext: {
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10
  },
  infotext: {
    padding: 10,
    fontSize: 15
  },
  inputtext: {
    width: wp('70%'),
    padding: 7,
    fontSize: 15,
    color: '#282828',
  },
  label: {
  }
});