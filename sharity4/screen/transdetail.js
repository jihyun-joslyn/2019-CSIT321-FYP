import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, AsyncStorage, ScrollView, TouchableOpacity, Image } from 'react-native'

export default class transdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            _transaction: []
        };
    }

    componentDidMount() {
        this.getAsync();
    };

    getAsync = async () => {
        const value = await AsyncStorage.getItem('userID');
        if (value !== null) {
            this.setState({
                _id: value
            });
        }
        fetch("https://uowfyp2020.herokuapp.com/order/getTransactionList?userID=" + value)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({
                    _transaction: responseJson
                });
            }).catch(error => {
                console.error(error);
            });
    };

    render() {
        return (
            <View>
                <View>
                    <ScrollView>
                        <FlatList
                            numColumns={1}
                            keyExtractor={(item) => item.index}
                            data={this.state._transaction}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('purchased', item.transactionID)}>
                                    <View style={styles.itemContainer} >
                                        <View>
                                            <Text style={styles.itemName}>Transaction ID: {item.transactionID}</Text>
                                            <Text style={styles.itemPrice}>Total price: HK${item.tprice}</Text>
                                            <Text style={styles.itemPrice}>Date Added: {item.date_added}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={styles.itemPrice}>Short Cut: </Text>
                                            <Image source={{ uri: item.photo1 }} style={{ width: 75, height: 75 ,marginRight:"5%",marginLeft:"1%"}} />
                                            <Image source={{ uri: item.photo2 }} style={{ width: 75, height: 75 ,marginRight:"5%"}} />
                                            <Image source={{ uri: item.photo3 }} style={{ width: 75, height: 75 ,marginRight:"5%"}} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    itemContainer: {
        backgroundColor: 'white',
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
        alignItems: "flex-start",
        flexWrap: "wrap",
        borderWidth: 0.5,
        padding: 30,
        marginBottom: 20
    },
    itemName: {
        fontWeight: "bold",
        fontSize: 15,
        paddingBottom: 5
    },
    itemPrice: {
        fontSize: 15,
        paddingBottom: 5
    },
    inputtext: {
        marginLeft: 20,
        marginTop: 35,
        width: '50%',
        fontSize: 15,
        color: '#808080',
    },

    deleteBtn: {
        backgroundColor: 'lightgray',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10
    }
});