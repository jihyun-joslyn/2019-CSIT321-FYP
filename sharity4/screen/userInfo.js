import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, FlatList, AsyncStorage, TouchableOpacity, Alert } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleBar: {
        paddingTop: '10%',
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        borderBottomWidth: 0.5
    },

    body: {
        marginTop: "5%",
    },

    typeBtn: {
        color: 'lightgray',
        position: 'absolute',
        width: 215,
    },

    typeBtn1: {
        color: 'lightgray',
        position: 'absolute',
        left: "48%",
        width: 215,
    },

    itemContainer: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        alignItems: "flex-start",
        flexWrap: "wrap",
        width: 180,
        backgroundColor: 'azure',
        padding: 5,
    },

    itemName: {
        fontWeight: "bold",
        fontSize: 15,
        alignItems: 'center'
    },

    itemPrice: {
        fontSize: 12
    },

    item: {
        height: '100%',
        marginTop: 40
    },

    h2Blk: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
    },
});
export default class profile extends Component {
    constructor(navigation) {
        super(navigation);
        this.state = {
            path: "item",
            service: 0,
            _id: "",
            _item: [],
            havefow: 0
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

        fetch("https://uowfyp2020.herokuapp.com/item/getUploadList?uID=" + this.props.route.params.userID)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    _item: responseJson
                });
            }).catch(error => {
                console.error(error);
            });
        this.Checkfow();
    }

    getList = (value) => {
        fetch("https://uowfyp2020.herokuapp.com/" + value + "/getUploadList?uID=" + this.props.route.params.userID)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    _item: responseJson
                });
            }).catch(error => {
                console.error(error);
            });
    }


    onClick = (value) => {
        console.log(value);
        this.setState({
            service: value
        })

        if (value == '1') {
            this.setState({
                path: "service"
            })
            this.getList("service");
        }
        else if (value == '0') {
            this.setState({
                path: "item"
            })
            this.getList("item");
        }
    }

    Addfow = () => {
        console.log("Add Following");
        console.log(this.props.route.params);
        fetch("https://uowfyp2020.herokuapp.com/following/follow?userID=" + this.state._id + "&followID=" + this.props.route.params.userID)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                Alert.alert(
                    'Add Success',
                    'You are following ' + this.props.route.params.userID,
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false }
                )
            }).catch(error => {
                console.error(error);
            });
            this.setState({havefow:1})
    }

    Checkfow = () => {
        fetch("https://uowfyp2020.herokuapp.com/following/checkfollow?userID=" + this.state._id + "&followID=" + this.props.route.params.userID)
            .then(response => response.json())
            .then(responseJson => {
                console.log("Check follow");
                console.log(responseJson);
                this.setState({ havefow: responseJson })
            }).catch(error => {
                console.error(error);
            });
    }

    Unfow = () => {
        fetch("https://uowfyp2020.herokuapp.com/following/unfollow?userID=" + this.state._id + "&followID=" + this.props.route.params.userID)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({ havefow: 0 })
            }).catch(error => {
                console.error(error);
            });
    }

    render() {
        var showBtn;

        if (this.state.service == '1') {
            showBtn = (
                <View>
                    <View style={styles.typeBtn}>
                        <Button
                            title="Goods"
                            color="white"
                            onPress={() => this.onClick('0')}
                        />
                    </View>
                    <View style={styles.typeBtn1}>
                        <Button
                            title="Service"
                            color="#1979a9"
                            onPress={() => this.onClick('1')}
                        />
                    </View>
                </View>
            )
        }
        else if (this.state.service == '0') {
            showBtn = (
                <View>
                    <View style={styles.typeBtn}>
                        <Button
                            title="Goods"
                            color="#1979a9"
                            onPress={() => this.onClick('0')}
                        />
                    </View>
                    <View style={styles.typeBtn1}>
                        <Button
                            title="Service"
                            color="white"
                            onPress={() => this.onClick('1')}
                        />
                    </View>
                </View>
            )
        }

        var followBtn;

        if (this.state._id == this.props.route.params.userID) {
            followBtn = (
                <View>
                    {}
                </View>

            );
        }
        else if ((this.state._id != this.props.route.params.userID) && (this.state.havefow == "0")) {

            followBtn = (
                <View>
                    <Button title="Follow" onPress={this.Addfow} />
                </View>
            );
        } else if ((this.state._id != this.props.route.params.userID) && (this.state.havefow == "1")) {
            followBtn = (
                <View>
                    <Button title="Unfollow" onPress={this.Unfow} />
                </View>
            );
        }

        var check_list;

        if (this.state._id == this.props.route.params.userID) {
            check_list = (
                <View style={styles.item}>
                    <FlatList
                        numColumns={2}
                        keyExtractor={(item) => item.index}
                        data={this.state._item}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('editdetail', { "item": item, "type": this.state.path })}>
                                <View style={styles.itemContainer} >
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemPrice}>HK${item.price}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>

            );
        }
        else {
            check_list = (
                <View style={styles.item}>
                    <FlatList
                        numColumns={2}
                        keyExtractor={(item) => item.index}
                        data={this.state._item}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('moredetail', item)}>
                                <View style={styles.itemContainer} >
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemPrice}>HK${item.price}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <Image source={require('../assets/images/userSample.png')} />
                    <Text style={styles.h2Blk}>{this.props.route.params.userID}</Text>
                </View>


                <View style={styles.body}>
                    <View style={{ marginTop: '50%', height: '81%'}}>
                        {followBtn}
                        {showBtn}
                        {check_list}
                    </View>

                </View>
            </View>
        );
    }
}
