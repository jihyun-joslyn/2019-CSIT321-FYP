import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Feather, MaterialCommunityIcons} from '@expo/vector-icons';

export default class user extends Component {
    constructor(navigation) {
        super(navigation);
        this.state = {
            _id: ""
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

            console.log("id: " + value);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <Image source={require('../assets/images/userSample.png')} />
                    <Text style={styles.h2Blk}>{this.state._id}</Text>
                </View>
                <View style={styles.userfunctions}>
                    <TouchableOpacity>
                        <View style={styles.cirBtn}>
                            <Feather name="edit" size={40} style={styles.icon} onPress={() => this.props.navigation.navigate('editprofile')}/>
                        </View>
                        <Text style={styles.iconT}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.cirBtn}>
                            <Feather name="list" size={40} style={styles.icon} onPress={() => this.props.navigation.navigate('transdetail')}/>
                        </View>
                        <Text style={styles.iconT}>Purchased</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.cirBtn}>
                            <Feather name="heart" size={40} style={styles.icon} onPress={() => this.props.navigation.navigate('favourite')}/>
                        </View>
                       <Text style={styles.iconT}>Favourite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.cirBtn}>
                            <Feather name="shopping-cart" size={40} style={styles.icon} onPress={() => this.props.navigation.navigate('cart')}/>
                        </View>
                        <Text style={styles.iconT}>Cart</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.userfunctions1}>
                <TouchableOpacity>
                        <View style={styles.cirBtn}>
                            <MaterialCommunityIcons name="history" size={40} style={styles.icon} onPress={() => this.props.navigation.navigate(('viewHistory'), {userID: this.state._id})}/>
                        </View>
                        <Text style={styles.iconT}>View History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.cirBtn}>
                            <Feather name="eye" size={40} style={styles.icon} onPress={() => this.props.navigation.navigate(('userInfo'), {userID: this.state._id})}/>
                        </View>
                        <Text style={styles.iconT}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.cirBtn}>
                            <Feather name="user" size={40} style={styles.icon} onPress={() => this.props.navigation.navigate('following')}/>
                        </View>
                        <Text style={styles.iconT}>Following</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.cirBtn}>
                            <Feather name="log-out" size={40} style={styles.icon} onPress={() => this.props.navigation.navigate('login')}/>
                        </View>
                        <Text style={styles.iconT}>Log out</Text>
                    </TouchableOpacity>
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
    titleBar: {
        paddingTop:'15%',
        paddingBottom: '20%',
        width: '100%',
        alignItems: 'center',
        position: 'absolute'
    },
    userfunctions: {
        marginTop: 250,
        marginBottom:5,
        flexDirection: 'row',
    },
    userfunctions1: {
        flexDirection: 'row',

    },
    cirBtn: {
        backgroundColor: '#f0f2f0',
        borderRadius: 50,
       padding: 16,
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
    },
    icon: {
        color: 'grey',

    },

    iconT: {
        textAlign: 'center',
        display: 'flex'

    },
    h2Blk: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
    },
});