import React, { Component } from 'react'
import { Text, View, StyleSheet, AsyncStorage, TouchableOpacity, Alert, Image } from 'react-native'

export default class payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      _tPrice: 0,
      method: '',
      description: this.props.route.params.desc
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


    fetch("https://uowfyp2020.herokuapp.com/user/getUID?userid=" + value)
      .then(response => response.json())
      .then(responseJson => {
        this.getTPrice(responseJson.accountID);
      }).catch(error => {
        console.error(error);
      });
    this.getTPrice();

  };

  getTPrice = (accountID) => {
    fetch('https://uowfyp2020.herokuapp.com/cart/getTPrice?acc=' + accountID)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          _tPrice: responseJson
        });
      }).catch(error => {
        console.error(error);
      });
  }

  //alert box sending confirm message
  masterHandler = (dec) => {
    this.setState({ method: 'Master Card' });
    Alert.alert(
      'Confirm message',
      'You are choosing Paypal\n to pay for $ ' + this.state._tPrice,
      [
        { text: 'Comfirm', onPress: () => this.props.navigation.navigate('pay', { price: this.state._tPrice, description: dec, method: 'paypal' }) },
        { text: 'Cancel', onPress: () => this.props.navigation.navigate('payment') }
      ]
    )
  }


  render() {
    let description = this.state.description;
    let temp2 = "";
    for (let i = 0; i <= description.length - 1; i++) {
      temp2 += description[i].productID + " $" + description[i].price + "x" + description[i].quantity + " ";
    }

    
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Total Price:  <Text style={styles.intitle}>${this.state._tPrice}</Text></Text>
        </View>
        <View>
          <Text>Choose your payment method:</Text>
        </View>
        <View style={styles.methodcontainer}>
          <TouchableOpacity onPress={() => this.masterHandler(temp2)}>
            <Image style={styles.method} source={{uri:"https://www.pcmarket.com.hk/wp-content/uploads/2017/05/paypal.png"}} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  intitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  method: {
    width: 245,
    height: 150,
    marginTop: 16,
  },
  methodcontainer: {
    flex: 1,
    flexDirection: 'column'

  },

});