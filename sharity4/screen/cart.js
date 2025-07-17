import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, AsyncStorage, ScrollView, TouchableOpacity, Alert, Image, Button } from 'react-native'


export default class cart extends Component {
  constructor(navigation) {
    super(navigation);
    this.state = {
      _id: "",
      _productid: "",
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

      console.log("id: " + this.state._id);
    }
    fetch("https://uowfyp2020.herokuapp.com/cart/getCartList?userID=" + value)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          _item: responseJson
        });
      }).catch(error => {
        console.error(error);
      });
    this.forceUpdate();

  };

  showCart = (value) => {
    fetch("https://uowfyp2020.herokuapp.com/cart/getCartList?userID=" + value)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          _item: responseJson
        });
      }).catch(error => {
        console.error(error);
      });
  }

  deletecartservice = (pID,type) => {
    fetch("https://uowfyp2020.herokuapp.com/cart/deleteCart?userID=" + this.state._id + "&productID=" + pID+"&type="+type)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson == "285") {
          Alert.alert(
            'Delete Success',
            'Item deleted',
            [
              {
                text: 'OK', onPress: () => {
                  console.log('OK Pressed');
                  this.showCart(this.state._id);
                }
              },
            ],
            { cancelable: false }
          )
        }
        else if (responseJson == "485") {
          Alert.alert(
            'Delete Fail',
            'Please try again.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  deletecartgoods = (pID,quantity,type) => {
    fetch("https://uowfyp2020.herokuapp.com/cart/deleteCart?userID=" + this.state._id + "&productID=" + pID+"&quantity=" + quantity+"&type=" + type)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson == "285") {
          Alert.alert(
            'Delete Success',
            'Item deleted',
            [
              {
                text: 'OK', onPress: () => {
                  console.log('OK Pressed');
                  this.showCart(this.state._id);
                }
              },
            ],
            { cancelable: false }
          )
        }
        else if (responseJson == "485") {
          Alert.alert(
            'Delete Fail',
            'Please try again.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  doSub = (id, quantity) => {
    if (quantity - 1 == 0) {
      fetch("https://uowfyp2020.herokuapp.com/cart/deleteCart?userID=" + this.state._id + "&productID=" + id+"&quantity=" + quantity+"&type=goods")
        .then(response => response.json())
        .then(responseJson => {
          this.showCart(this.state._id);
        }).catch(error => {
          console.error(error);
        });

    } else {
      fetch("https://uowfyp2020.herokuapp.com/cart/changeAmount?userID=" + this.state._id + "&ItemID=" + id + "&amount=" + quantity + "&method=sub")
        .then(response => response.json())
        .then(responseJson => {
          this.showCart(this.state._id);
        }).catch(error => {
          console.error(error);
        });
    }
  }

  doAdd = (id, quantity) => {
    fetch("https://uowfyp2020.herokuapp.com/cart/changeAmount?userID=" + this.state._id + "&ItemID=" + id + "&amount=" + quantity + "&method=add")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.showCart(this.state._id);
      }).catch(error => {
        console.error(error);
      });
  }

  selecter = (item) => {
    if (item.type == "goods") {
      return (<TouchableOpacity onPress={() => this.props.navigation.navigate('itemdetail', item)}>
        <View style={styles.itemContainer} onPress={() => this.props.navigation.navigate('itemdetail', item)}>
          <View style={styles.itemview}>
            <View>
              <Image source={{ uri: item.img }} style={{ width: 100, height: 100 }} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>HK${item.price}</Text>
            </View>


            <View style={styles.counter}>
              <TouchableOpacity onPress={() => this.doSub(item.productID, item.quantity)}>
                <Text style={styles.qtext}> - </Text>
              </TouchableOpacity>
              <Text style={styles.qtext}>  {item.quantity}  </Text>
              <TouchableOpacity onPress={() => this.doAdd(item.productID, item.quantity)}>
                <Text style={styles.qtext}> + </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
              <TouchableOpacity onPress={() => this.deletecartgoods(item.productID,item.quantity,item.type)}>
			  <View style={{ marginTop: '170%' }}>
                <Image style={{ width: 30, height: 30 }} source={require('../assets/delete.png')} />
				</View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>)
    } else {
      return (<TouchableOpacity onPress={() => this.props.navigation.navigate('itemdetail', item)}>
        <View style={styles.itemContainer} onPress={() => this.props.navigation.navigate('itemdetail', item)}>
          <View style={styles.itemview}>
            <View>
              <Image source={{ uri: item.img }} style={{ width: 100, height: 100 }} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>HK${item.price}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
              <TouchableOpacity onPress={() => this.deletecartservice(item.productID,item.type)}>
			    <View style={{ marginTop: '170%' }}>
                <Image style={{ width: 30, height: 30 }} source={require('../assets/delete.png')} />
				</View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>)
    }
  }

  render() {

    return (
      <View style={styles.container}>
		<View style={{ flex: 10 }}>
          <View style={{ width: 400 }}>
            <ScrollView>
              <FlatList
                numColumns={1}
                keyExtractor={(item) => item.index}
                data={this.state._item}
                renderItem={({ item }) => this.selecter(item)}
              />
            </ScrollView>
          </View>

        </View>
        <View style={{ flex: 1, marginTop: 20, padding: 10, width: 200, alignSelf: 'center' }}>
          <Button onPress={() => this.props.navigation.navigate('payment', { desc: this.state._item })} title="Go to checkout" />
		</View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 11,
    backgroundColor: 'white',
    alignItems: 'center',

  },
  itemContainer: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    alignItems: "flex-start",
    flexWrap: "wrap",
    borderWidth: 0.5,
    padding: 10,
    marginBottom: 10
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 15,
    paddingBottom: 5,
	width: 150,
    letterSpacing: 0.5,
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
  },
  checkoutButtonStyle: {
    flex: 1,
    backgroundColor: '#f39c12',
    padding: 10,
    paddingRight: 60,
    paddingLeft: 160,
    borderRadius: 3,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
  },

  qtext: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20,
  },
  itemview: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
    color: "#20232a",
  },
  counter: {
    flexDirection: 'row',
    color: "#20232a",
    paddingTop: '15%',
    width: '50%',
  }
});