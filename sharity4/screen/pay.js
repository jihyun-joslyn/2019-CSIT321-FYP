import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Text, Button, Modal } from 'react-native';
import { WebView } from 'react-native-webview';

export default class pay extends Component {
    constructor(props) {
        super(props);
        //setting state for stroing data
        this.state = {
            _id: '',
            accountID: '',
            _tPrice: this.props.route.params.price,
            method: this.props.route.params.method,
            currency: 'HKD',
            intent: 'sale',
            description: this.props.route.params.description,
            showWebView: true,
            timePassed: false,
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
    }

    renderWebView() {
        if (this.state.showWebView === true) {
            return (
                <WebView
                    originWhitelist={['*']}
                    source={{
                        uri: 'https://uowfyp2020.herokuapp.com/pay', method: 'POST', body:
                            'price=' + this.state._tPrice + '&currency=' + this.state.currency + '&method=' + this.state.method + '&intent=' + this.state.intent + '&description=' + this.state.description
                    }}
                    onNavigationStateChange={data =>{
                        this.handleResponse(data)}
                    }
                    style={{ flex: 1 }}
                />
            );
        }
        return null;
    }

    addorder=(paymentID)=>{
        fetch('https://uowfyp2020.herokuapp.com/cart/setOrderList?userID='+this.state._id+"&paymentID="+paymentID)
        
    }

    deletecart=()=>{
        fetch('https://uowfyp2020.herokuapp.com/cart/deleteAllCart?userID='+this.state._id)
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson);
        }).catch(error => {
            console.error(error);
        });
    }

    handleResponse = data => {
        if (data.title === "Success Payment") {
            this.addorder((data.url).substr((data.url).indexOf("PAYID")+6,24));

            setTimeout(() => {
                this.deletecart();
                this.props.navigation.navigate('home')
            }, 3000)
        } else if (data.title === "Fail Payment") {
            setTimeout(() => {
                this.props.navigation.navigate('cart')
            }, 3000)
        } else {
            return;
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderWebView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    registerform: {
        paddingTop: 15
    },
    txtinreg: {
        paddingLeft: 60,
        fontSize: 15
    },
    signup: {
        paddingTop: 20,
        paddingLeft: 120,
        paddingRight: 120,
    }

});