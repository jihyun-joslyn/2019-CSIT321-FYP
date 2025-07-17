import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView, FlatList, TouchableOpacity, Image, StyleSheet,Button } from 'react-native';

export default class viewHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _item: []
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
        this.getviewhis(value);
    };

    getviewhis=(value)=>{
        fetch("https://uowfyp2020.herokuapp.com/viewHis/viewRecord?userID=" + value)
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

    deleteRecord=(value)=>{
        console.log(value);
        fetch("https://uowfyp2020.herokuapp.com/viewHis/deleteRecord?productID="+value+"&userID=" + this.state._id)
        .then(response => response.json())
        .then(responseJson => {
            this.getviewhis(this.state._id);
        }).catch(error => {
            console.error(error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <ScrollView>
                        <FlatList
                            keyExtractor={(item) => item.index}
                            data={this.state._item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('itemdetail', item)}>
                                    <View style={styles.itemContainer} onPress={() => this.props.navigation.navigate('itemdetail', {item,type:item.type})}>
                                        <View style={{ flexDirection: 'row' }} >
                                            <View>
                                                <Image source={{ uri: item.img }} style={{ width: 100, height: 100 }} />
                                            </View>
                                            <View style={{ paddingLeft: 30}}>
                                                <Text style={styles.itemName}>{item.name}</Text>
                                                <Text style={styles.itemPrice}>HK${item.price}</Text>
                                                <View style={{padding: 10, width: 200, alignSelf: 'center' }}>
                                                    <Button color='#1979a9' title="Delete History" onPress={()=>{this.deleteRecord(item.productID)}} />
                                                </View>
                                            </View>
                                        </View>
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
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
        alignItems: "flex-start",
        flexWrap: "wrap",
        borderWidth: 0.5,
        padding: 30,
        marginBottom: 10,
    },
    itemName: {
        fontWeight: "bold",
        fontSize: 20,
        paddingBottom: 5,
        letterSpacing: 0.5,
        width:200

    },
    itemPrice: {
        fontSize: 15,
        paddingBottom: 5
    },
})
