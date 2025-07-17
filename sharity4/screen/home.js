import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView, AsyncStorage, Image } from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import { Feather, Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons, Fontisto, AntDesign } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _search: "",
            sell_item: [],
            rent_item: [],
			RecItem:[],
            RecRent:[],
            toRent: 0,
            _type: 0,
        };
    }

    componentDidMount() {
        this.first();
    }

    first = async () => {
        const uid = await AsyncStorage.getItem('userID');
        if (uid != null) {
            this.setState({
                _id: uid,
            });
        }
        this.fetchRecItem(uid);
    }

    saveMode = async (value) => {

        if (value == 'goods') {
            try {
                await AsyncStorage.setItem('goods', '1');
                await AsyncStorage.setItem('service', '0');
            } catch (error) {
                // Error retrieving data
                console.log(error.message + "one");
            }
        }
        else if (value == 'service') {
            try {
                await AsyncStorage.setItem('service', '1');
                await AsyncStorage.setItem('goods', '0');
            } catch (error) {
                // Error retrieving data
                console.log(error.message + "two");
            }
        }
    };


    toServicePage = (value) => {
        if (value == 0) {
            this.setState({ _type: 0 })
            console.log("change to 0")
            this.fetchRecItem(this.state._id);


        }
        else if (value == 1)
        {
            this.setState({ _type: 1 })
            console.log("change to 1")
            this.fetchRecSer(this.state._id);


        }
    }



    fetchRecItem = (uid) =>{
        console.log(this.state._id);
        fetch('https://uowfyp2020.herokuapp.com/item/viewCatRecord?uID='+uid)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({RecItem:responseJson});
        }).catch(error => {
            console.error(error+'recommand item');
        });
        this.saveMode('goods');
    }
    fetchRecSer = (uid) =>{
        fetch('https://uowfyp2020.herokuapp.com/service/viewCatRecord?uID='+uid)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({RecRent:responseJson});
        }).catch(error => {
            console.error(error+'recommand item');
        });
        this.saveMode('service');
    }


    toCatPage = (cID) => {
        if (this.state._type == 0) {
            this.props.navigation.navigate('category', { categoryid: cID, gettype: 0 });
        } else if(this.state._type == 1){
            this.props.navigation.navigate('category', { categoryid: cID, gettype: 1 });
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



    render() {
        var ShowContent;



        if (this.state.RecItem.length == 0 && this.state._type == 0){
            ShowContent = (
                <ScrollView >
                <FlatList
                    numColumns={2}
                    keyExtractor={(item) => item.index}
                    data={this.state.sell_item}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {this.viewhis(item);this.props.navigation.navigate('itemdetail', item)}}>
                            <View style={styles.itemContainer} onPress={() => this.props.navigation.navigate('itemdetail', item)}>
                                <Image source={{ uri: item.img }} style={{ width: 150, height: 150}} />
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>HK${item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
            )
        } else if (this.state.RecItem.length != 0 && this.state._type == 0){
            ShowContent =(
                <ScrollView >
                <FlatList
                    numColumns={2}
                    keyExtractor={(item) => item.index}
                    data={this.state.RecItem}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {this.viewhis(item);this.props.navigation.navigate('itemdetail', item)}}>
                            <View style={styles.itemContainer} onPress={() => this.props.navigation.navigate('itemdetail', item)}>
                                <Image source={{ uri: item.img }} style={{ width: 150, height: 150 }} />
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>HK${item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
            )
        } else if (this.state.RecRent.length == 0 && this.state._type == 1){
            ShowContent = (
                <ScrollView >
                <FlatList
                    numColumns={2}
                    keyExtractor={(item) => item.index}
                    data={this.state.sell_item}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {this.viewhis(item);this.props.navigation.navigate('itemdetail', item)}}>
                            <View style={styles.itemContainer} onPress={() => this.props.navigation.navigate('itemdetail', item)}>
                                <Image source={{ uri: item.img }} style={{ width: 150, height: 150,display:'flex',margin:'auto' }} />
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>HK${item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
            )
        } else if (this.state.RecRent.length != 0 && this.state._type == 1){
            ShowContent = (
                <ScrollView>
                <FlatList
                    numColumns={2}
                    keyExtractor={(item) => item.index}
                    data={this.state.RecRent}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {this.viewhis(item);this.props.navigation.navigate('itemdetail', item)}}>
                            <View style={styles.itemContainer} onPress={() => this.props.navigation.navigate('itemdetail', item)}>
                                <Image source={{ uri: item.img }} style={{ width: 150, height: 150,display:'flex',margin:'auto' }} />
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>HK${item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.headerbar}>
                    <TouchableOpacity style={styles.searchBtn} onPress={() => this.props.navigation.navigate('search')}>
                        <Text style={styles.inputtext}>Search...</Text>
                    </TouchableOpacity>
                    <SwitchSelector
                        initial={0}
                        onPress={(value) => this.toServicePage(value)}
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

                <View style={{ position: 'absolute', marginTop: '25%' }}>
                    <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>
                        <View style={styles.scroll}>
                            <View style={styles.scrollRow}>
                                <TouchableOpacity onPress={() => this.toCatPage("c0001")}>
                                    <View style={styles.cirBtn} >
                                        <Feather name="hard-drive" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Electronics</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("c0002")}>
                                    <View style={styles.cirBtn}>
                                        <Entypo name="game-controller" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Video Games</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("c0003")}>
                                    <View style={styles.cirBtn}>
                                        <FontAwesome name="camera-retro" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Photography</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("c0004")}>
                                    <View style={styles.cirBtn}>
                                        <Feather name="box" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Toys</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("c0005")}>
                                    <View style={styles.cirBtn}>
                                        <MaterialCommunityIcons name="tshirt-crew" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Fashion</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("c0006")}>
                                    <View style={styles.cirBtn}>
                                        <MaterialCommunityIcons name="ring" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Accessories</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("c0007")}>
                                    <View style={styles.cirBtn}>
                                        <Entypo name="flat-brush" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Cosmetics</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("c0008")}>
                                    <View style={styles.cirBtn}>
                                        <FontAwesome name="automobile" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Automobile</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.scrollRow}>
                                <TouchableOpacity onPress={() => this.toCatPage("c0009")}>
                                    <View style={styles.cirBtn}>
                                        <FontAwesome5 name="music" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Music</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("c0010")}>
                                    <View style={styles.cirBtn}>
                                        <FontAwesome5 name="baby-carriage" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Baby Goods</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("c0011")}>
                                    <View style={styles.cirBtn}>
                                        <Fontisto name="blood-test" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Health</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("c0012")}>
                                    <View style={styles.cirBtn}>
                                        <FontAwesome name="scissors" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Crafts</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("c0013")}>
                                    <View style={styles.cirBtn}>
                                        <FontAwesome5 name="football-ball" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Sports</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("c0014")}>
                                    <View style={styles.cirBtn}>
                                        <FontAwesome5 name="cat" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Pet Supplies</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("c0015")}>
                                    <View style={styles.cirBtn}>
                                        <Entypo name="modern-mic" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Idol Goods</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toCatPage("all")}>
                                    <View style={styles.cirBtn}>
                                        <AntDesign name="profile" size={40} style={styles.icon} />
                                    </View>
                                    <Text style={styles.iconT}>Everything</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ marginTop: 350, padding: 5 }}>
                    <Text style={styles.title}>Recommandation</Text>
                </View>


                <View style={styles.scrollCon}>
                {ShowContent}
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    headerbar: {
        width: '100%',
        paddingBottom: 5,
        borderBottomColor: 'silver',
        borderBottomWidth: 1.25,
        position: 'absolute'
    },

    switch: {
        width: 110,
        position: 'absolute',
        right: 1,
        marginTop: 50,
        marginRight: 23,

    },

    icon: {
        color: '#56abd6',

    },

    cirBtn: {
        backgroundColor: 'aliceblue',
        borderRadius: 50,
        padding: 16,
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 5,
    },

    iconT: {
        textAlign: 'center',
        display: 'flex'

    },

    scrollRow: {
        flexDirection: 'row'
    },

    scroll: {
        flexDirection: "column",
    },
    contentContainer: {
        flexGrow: 1,
    },
    bannerholder: {
        marginTop: '90%',
        position: 'absolute',
    },
    title: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 20,
        color: '#1979a9',
    },
    itemContainer: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        alignItems: "flex-start",
        justifyContent:'space-between',
	    maxWidth:200,
        maxHeight:220,
        width:170,
        height:210,
        backgroundColor: 'azure',
        padding: 5,
    },
    itemName: {
        fontWeight: "bold",
        fontSize: 15,
	    alignItems: 'center',
        maxWidth:180,
        width: '90%',
        overflow:'hidden'
    },
    itemPrice: {
        fontSize: 12
    },
    inputtext: {
        marginLeft: 5,
        marginTop: 35,
        width: 180,
        fontSize: 15,
        color: '#808080',
    },

    searchBtn: {
        borderBottomColor: 'grey',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 15,
        borderBottomWidth: 1,
        width: '60%',
        marginBottom: 20,
        marginTop: 10,
        marginLeft: 10,

     },
    scrollCon:{
        paddingBottom:"10%",
        paddingLeft:10,
        width:wp('100%'),
        height:hp ('55%')
    }
});