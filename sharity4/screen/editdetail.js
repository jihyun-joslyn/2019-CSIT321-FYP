import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Image, Button, TextInput, TouchableWithoutFeedback, Keyboard, AsyncStorage, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const dismissKeyboard = () => {
    Keyboard.dismiss();
};

export default class editdetail extends Component {
    constructor(navigation) {
        super(navigation);
        this.state = {
            _id: "",
            _item: [],
            _name: "",
            _dec: "",
            _price: "",
            _image: "",
            _quantity: ""
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
        console.log(this.props);
        if (this.props.route.params.type == "item") {
            fetch("https://uowfyp2020.herokuapp.com/" + this.props.route.params.type + "/getItemDetails?pID=" + this.props.route.params.item.productID)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({
                        _item: responseJson,
                        _name: responseJson.name,
                        _dec: responseJson.description,
                        _price: responseJson.editPrice,
                        _quantity: responseJson.editQuantity,
                        _image: this.props.route.params.item.img,
                    })
                })
                .catch((error) => {
                    console.error(error);
                });

        } else if (this.props.route.params.type == "service") {

            fetch("https://uowfyp2020.herokuapp.com/" + this.props.route.params.type + "/getServiceDetails?pID=" + this.props.route.params.item.productID)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({
                        _item: responseJson,
                        _name: responseJson.name,
                        _dec: responseJson.description,
                        _price: responseJson.editPrice,
                        _image: this.props.route.params.item.img,

                    })
                })
                .catch((error) => {
                    console.error(error);
                });
        }



    }

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {

                let base64data = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 })

                let formData = new FormData();
                formData.append('image', base64data);
                formData.append('type', 'base64');

                fetch('https://api.imgur.com/3/image',
                    {
                        method: 'POST',
                        headers: {
                            Authorization: 'Client-ID e070b98cb9cedea',
                            'Content-Type': 'multipart/form-data'
                        },
                        body: formData
                    })
                    .then(response => response.json())
                    .then(responseJson => {
                        console.log(responseJson.data.link);
                        this.setState({ _image: responseJson.data.link });
                    }).catch(error => {
                        console.error(error);
                    });

            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    UpdateInfo = () => {
        if (this.props.route.params.type == "item") {
            fetch("https://uowfyp2020.herokuapp.com/" + this.props.route.params.type + "/updateItem?itemID=" + this.state._item.productID + "&cID=" + this.props.route.params.item.cid + "&name=" + this.state._name + "&descripiton=" + this.state._dec + "&price=" + this.state._price+ "&quantity=" + this.state._quantity)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                })
                .catch((error) => {
                    console.error(error);
                });

        } else if (this.props.route.params.type == "service") {
            fetch("https://uowfyp2020.herokuapp.com/" + this.props.route.params.type + "/updateService?ServiceID=" + this.state._item.productID + "&cID=" + this.props.route.params.item.cid + "&name=" + this.state._name + "&descripiton=" + this.state._dec + "&price=" + this.state._price)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        fetch("https://uowfyp2020.herokuapp.com/sPhoto/updatephoto?productID=" + this.state._item.productID + "&img=" + this.state._image)
            .then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(
                    'Update Success',
                    'Please check for your change.',
                    [
                        { text: 'OK', onPress: () => this.props.navigation.navigate('userInfo', { userID: this.state._id, update: 1}) },
                    ],
                    { cancelable: false }
                )
            })
    }


    render() {
        var quan;
        if (this.props.route.params.type == "item") {
            quan = (
                <TextInput
                    onChangeText={(value) => { this.setState({ _quantity: value }) }}
                    placeholder="Quantity"
                    placeholderTextColor="#808080"
                    underlineColorAndroid={'grey'}
                    style={styles.inputtext}
                    keyboardType={'numeric'}
                    value={this.state._quantity} />)
        }else if (this.props.route.params.type == "service"){
            quan = (
                <TextInput
                    onChangeText={(value) => { }}
                    placeholder="Quantity"
                    placeholderTextColor="#808080"
                    underlineColorAndroid={'grey'}
                    style={styles.inputtext}
                    editable={false}
                    value="Not applicable" />)
        }
        return (
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.container}>
                    <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' ,paddingTop:20}}>
                        <Image source={{ uri: this.state._image }} style={{ width: 230, height: 230, flex: 1 }} />
                    </View>
                    <View style={{ marginTop: "2%" }}>
                        <Button title="Pick image " onPress={this._pickImage} />
                    </View>
                    <View>
                        <View style={styles.infocontainer}>
							<View style={{padding:10}}>
                            <Text style={{ fontSize: 15,margin:4 }}>Name:</Text>
                            <TextInput
                                onChangeText={(value) => { this.setState({ _name: value }) }}
                                placeholder="Product Name"
                                placeholderTextColor="#808080"
                                underlineColorAndroid={'grey'}
                                style={styles.inputtext}
                                value={this.state._name} />

                            <Text style={{ fontSize: 15,margin:4  }}>Description:</Text>
                            <TextInput
                                onChangeText={(value) => { this.setState({ _dec: value }) }}
                                placeholder="Description"
                                placeholderTextColor="#808080"
                                multiline
                                numberOfLines={4}
                                underlineColorAndroid={'grey'}
                                value={this.state._dec} />

                            <Text style={{ fontSize: 15,margin:4  }}>Price:</Text>
                            <TextInput
                                onChangeText={(value) => { this.setState({ _price: value }) }}
                                placeholder="Price"
                                placeholderTextColor="#808080"
                                underlineColorAndroid={'grey'}
                                style={styles.inputtext}
                                keyboardType={'numeric'}
                                value={this.state._price} />
                            <Text style={{ fontSize: 15,margin:4  }}>Quantity:</Text>
                            {quan}
						</View>
                        </View>
                        <View style={{padding: 10, width: 200, alignSelf: 'center' }}><Button color='#1979a9' title="Save" onPress={this.UpdateInfo} /></View>
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
        alignItems: 'center',
    },
    infocontainer: {
        width: wp('100%'),
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
        paddingLeft: 10,
        fontSize: 15,
        marginBottom: 10,
        color: '#282828',
    },
});