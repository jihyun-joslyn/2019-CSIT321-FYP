import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import SwitchSelector from "react-native-switch-selector";
import { ScrollView } from 'react-native-gesture-handler';


export default class category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _cid: "",
            _item: [],
            _categoryName: "",
            _search: "",
            _type:"0"
        };
    }
   
    componentDidMount() {
        this.getCat();
    }

    getCat = async () => {
        const g = await AsyncStorage.getItem('goods');
        const s = await AsyncStorage.getItem('service');
        const uid = await AsyncStorage.getItem('userID');

        this.setState({
            _id: uid,
            _cid: this.props.route.params.categoryid,
            _type: this.props.route.params.gettype
        });

        if (g == '1' && s == '0') {
            this.fetchGoods();
        }
        else if (g == '0' && s == '1') {

            this.fetchService();
        }

    }

    fetchGoods = () => {
         if (this.state._cid.match('all'))
            fetch('https://uowfyp2020.herokuapp.com/item/getAllItems')
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        _item: responseJson
                    });
                }).catch(error => {
                    console.error(error);
                });
        fetch('https://uowfyp2020.herokuapp.com/item/getItemByCat?cID=' + this.state._cid)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    _item: responseJson
                });
            }).catch(error => {
                console.error(error);
            });
    }

    fetchService = () => {
         if (this.state._cid.match('all'))
            fetch('https://uowfyp2020.herokuapp.com/item/getAllServices')
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        _item: responseJson
                    });
                }).catch(error => {
                    console.error(error);
                });
        fetch('https://uowfyp2020.herokuapp.com/service/getServiceByCat?cID=' + this.state._cid)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    _item: responseJson
                });
            }).catch(error => {
                console.error(error);
            });
    }

    getsearch = (value) => {
        if(this.state._type=="0")
        fetch('https://uowfyp2020.herokuapp.com/item/searchByCat?cID=' + this.state._cid+'&name='+value)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({
                    _item: responseJson
                });
            }).catch(error => {
                console.error(error);
            });
        else if(this.state._type=="1"){
            fetch('https://uowfyp2020.herokuapp.com/service/searchByCat?cID=' + this.state._cid+'&name='+value)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    _item: responseJson
                });
            }).catch(error => {
                console.error(error);
            });
        }
    }

    viewhis=(item)=>{
        fetch("https://uowfyp2020.herokuapp.com/viewHis/insertRecord?userID="+this.state._id+"&name=" + item.productID)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
            }).catch(error => {
                console.error(error);
            });
    }

    switchMode = (value) => {
        if (value == "0") {
            AsyncStorage.setItem('goods', '1');
            AsyncStorage.setItem('service', '0');
            this.setState({_type:"0"})
           this.fetchGoods();
        } else if (value == "1") {
            AsyncStorage.setItem('service', '1');
            AsyncStorage.setItem('goods', '0');
            this.setState({_type:"1"})
            this.fetchService();
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerbar}>
                    <SearchBar
                        placeholder="Search"
                        containerStyle={{ width: '70%', backgroundColor: 'white', borderBottomColor: 'white', borderTopColor: 'white', marginLeft: 5 }}
                        inputStyle={{ backgroundColor: 'white' }}
                        leftIconContainerStyle={{ backgroundColor: 'white' }}
                        inputContainerStyle={{ backgroundColor: 'white' }}
                        underlineColorAndroid='gray'
                        value={this.state._search}
                        onChangeText={(value) => {this.setState({ _search: value });this.getsearch(value)}}
                    />
                    <SwitchSelector
                        initial={this.props.route.params.gettype}
                        onPress={(value) => this.switchMode(value)}
                        textColor='#1979a9' 
                        selectedColor='#fff'
                        buttonColor='#1979a9'
                        borderColor='#1979a9'
                        height={30}
                        hasPadding
                        options={[
                            { label: "Goods", value: "0" },
                            { label: "Service", value: "1" }
                        ]}
                        style={styles.switch}
                    />
                </View>

                <View>
                </View>

                <ScrollView style={{ marginTop: 80,paddingLeft:10 }}>
                    <View>
                        <FlatList
                            numColumns={2}
                            keyExtractor={(item) => item.index}
                            data={this.state._item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {this.viewhis(item);this.props.navigation.navigate('itemdetail', item)}}>
                                    <View style={styles.itemContainer}>
                                        <Image source={{ uri: item.img }} style={{ width: 150, height: 150 }} />
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemSeller}>{item.SellerName}</Text>
                                        <Text style={styles.itemPrice}>HKD {item.price}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerbar: {
        width: '100%',
        paddingBottom: 5,
        borderBottomColor: 'silver',
        borderBottomWidth: 1.25,
        position: 'absolute'
    },
    switch: {
        width: '25%',
        position: 'absolute',
        right: 1,
        marginTop: 20,
        marginRight: 23,

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
        fontSize: 20,
    },
    itemSeller: {
        fontWeight: "bold",
        fontSize: 15,
    },
    itemPrice: {
        fontSize: 12
    }

});