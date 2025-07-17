import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, AsyncStorage } from 'react-native';

export default class searchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            _item: [],
            _storeid: "",
            path: ""
        };
    }

    componentDidMount() {
        this.getAsync();
    }

    getAsync = async () => {
        const g = await AsyncStorage.getItem('goods');
        const s = await AsyncStorage.getItem('service');
        const uid = await AsyncStorage.getItem('userID');

        if (uid != null) {
            this.setState({
                _id: uid,
                _item: [],
                _storeid: "",

            });
        }

        console.log(this.props.route.params);



        if (this.props.route.params.mode == 'normal') {
            fetch("https://uowfyp2020.herokuapp.com/" + this.props.route.params.type + "/getSearchResult?name=" + this.props.route.params.keyword)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        _item: responseJson,
                    });
                }).catch(error => {
                    console.error(error);
                });
        }
        else if (this.props.route.params.mode == 'advanced') {
            if (this.props.route.params.cID == 'all') {
                fetch('https://uowfyp2020.herokuapp.com/' + this.props.route.params.type + '/searchByCat?cID=' + this.props.route.params.cat + '&name=' + this.props.route.params.keyword)
                    .then(response => response.json())
                    .then(responseJson => {
                        console.log(responseJson);
                        this.setState({
                            _item: responseJson
                        });
                    }).catch(error => {
                        console.error(error);
                    });
            }
            else {
                fetch('https://uowfyp2020.herokuapp.com/' + this.props.route.params.type + '/searchBySubCat?cID=' + this.props.route.params.cID + '&name=' + this.props.route.params.keyword)
                    .then(response => response.json())
                    .then(responseJson => {
                        console.log(responseJson);
                        this.setState({
                            _item: responseJson
                        });
                    }).catch(error => {
                        console.error(error);
                    });
            }
        }
    }

    viewhis = (item) => {
        fetch("https://uowfyp2020.herokuapp.com/viewHis/insertRecord?userID=" + this.state._id + "&name=" + item.productID)
            .then(response => response.json())
            .then(responseJson => {
            }).catch(error => {
                console.error(error);
            });
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={{ marginTop: "5%", marginBottom: "15%", height: "100%" }}>
                    <ScrollView>
                        <FlatList
                            numColumns={2}
                            keyExtractor={(item) => item.index}
                            data={this.state._item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { this.viewhis(item); this.props.navigation.navigate('itemdetail', item) }}>
                                    <View style={styles.itemContainer} >
                                        <Image source={{ uri: item.img }} style={{ width: 150, height: 150 }} />
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemPrice}>HK${item.price}</Text>
                                        <Text style={styles.itemPrice}>From: {item.sellerID}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    },
    itemPrice: {
        fontSize: 12
    },
});