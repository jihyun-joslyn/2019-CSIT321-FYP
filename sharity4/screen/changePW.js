import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Image, Button, TextInput, TouchableWithoutFeedback, Keyboard, AsyncStorage, Alert } from 'react-native';

const dismissKeyboard = () => {
    Keyboard.dismiss();
};

export default class changePW extends Component {
    constructor(navigation) {
        super(navigation);
        this.state = {
            _id: "",
            _oldPW: "",
            _newPW: "",
            _reEntry: ""
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
    }

    UpdatePW = () => {
        if (this.state._newPW != this.state._reEntry) {
            Alert.alert(
                'Please try again',
                'The second input of the new password is not the same as the first input.',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }        
        else if (this.state._newPW == this.state._reEntry) {
            fetch("https://uowfyp2020.herokuapp.com/user/changePwd?nPwd=" + this.state._newPW + "&oPwd=" + this.state._oldPW + "&userID=" + this.state._id)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson == "205") {
                        Alert.alert(
                            'Update Success',
                            'Password update success',
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false }
                        )
                        this.props.navigation.navigate('user');
                    }
                    else if (responseJson == "415") {
                        Alert.alert(
                            'Update Fail',
                            'Please try again.',
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false }
                        )
                    }
                    else if (responseJson == "410") {
                        Alert.alert("The current password incorrect")
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }



    render() {
        return (
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.container}>
                    <View>
                        <View style={styles.infocontainer}>
                            <TextInput
                                onChangeText={(value) => { this.setState({ _oldPW: value }) }}
                                placeholder="Enter your current password"
                                placeholderTextColor="#808080"
                                underlineColorAndroid={'grey'}
                                style={styles.inputtext}
                                value={this.state._oldPW} />

                            <TextInput
                                onChangeText={(value) => { this.setState({ _newPW: value }) }}
                                placeholder="Enter your new password"
                                placeholderTextColor="#808080"
                                underlineColorAndroid={'grey'}
                                style={styles.inputtext}
                                value={this.state._newPW} />

                            <TextInput
                                onChangeText={(value) => { this.setState({ _reEntry: value }) }}
                                placeholder="Re-enter your password again"
                                placeholderTextColor="#808080"
                                underlineColorAndroid={'grey'}
                                style={styles.inputtext}
                                value={this.state._reEntry} />


                        </View>
                        <View style={{ marginTop: 10, padding: 10, width: 200, alignSelf: 'center' }}>
						<Button color='#1979a9' title="Save" onPress={this.UpdatePW} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
         justifyContent: 'center'
    },
    infocontainer: {
        marginTop: 10,
        paddingLeft: 10,
        borderTopColor: '#a9a9a9',
        borderTopWidth: 1,
        borderBottomColor: '#a9a9a9',
        borderBottomWidth: 1
    },
    idtext: {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 8
    },
    infotext: {
        padding: 8,
        fontSize: 15
    },
    inputtext: {
        height: 45,
        paddingLeft: 6,
        fontSize: 15,
        marginBottom: 10,
        color: '#282828',
		marginHorizontal: 10

    },
});