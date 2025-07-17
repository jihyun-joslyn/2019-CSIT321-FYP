import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Button, TextInput, AsyncStorage, Alert, TouchableOpacity, Linking, ScrollView, FlatList } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

export default class itemdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      _item: [],
      state: '',
      path: '',
      phone: '',
      _comment: [],
      _sub: [],
      type: ''
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.getAsync();
  }

  getAsync = async () => {
    const g = await AsyncStorage.getItem('goods');
    const s = await AsyncStorage.getItem('service');
    const uid = await AsyncStorage.getItem('userID');

    console.log(uid);
    console.log(g);
    console.log(s);
    if (uid != null) {
      this.setState({
        _id: uid,
        _item: [],
        _storeid: "",
        photo: '',

      });
    }

    console.log(this.props.route.params)

    if (this.props.route.params.type == "goods") {
      console.log("route goods");
      this.setState({
        path: 'item/getItemDetails',
        type: 'item'
      })
    }
    else if (this.props.route.params.type == 'service') {
      console.log("route service");
      this.setState({
        path: 'service/getServiceDetails',
        type: 'service'
      })
    }
    else if (g == 1 && s == 0) {
      console.log("storage goods");
      this.setState({
        path: 'item/getItemDetails',
        type: 'item'
      })

    }
    else if (s == 1 && g == 0) {
      console.log("storage service");

      this.setState({
        path: 'service/getServiceDetails',
        type: 'service'
      })
    }

    this.getItem();
    this.getComment();

  }

  getItem = () => {
    fetch("https://uowfyp2020.herokuapp.com/" + this.state.path + "?pID=" + this.props.route.params.productID)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          _item: responseJson
        });
        this.getphone(responseJson);
      }).catch(error => {
        console.error(error);
      });
    fetch("https://uowfyp2020.herokuapp.com/sPhoto/getphoto?productID=" + this.props.route.params.productID)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson[0].photoID.img);
        this.setState({
          photo: responseJson[0].photoID.img
        });
      }).catch(error => {
        console.error(error);
      });
      
  }

  getphone = (responseJson) => {
    fetch("https://uowfyp2020.herokuapp.com/user/getPhone?sellerID=" + responseJson.seller)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          phone: responseJson
        });
      }).catch(error => {
        console.error(error);
      });

  }

  getComment = () => {
    console.log('loading comment and rating');
    fetch('https://uowfyp2020.herokuapp.com/comment/getParentComment?productID=' + this.props.route.params.productID)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          _comment: responseJson,
        });

      }).catch(error => {
        console.error(error + "Fail to load comments");
      });
  }

  getSubComment = (cID) => {
    console.log('loading comment and rating');
    fetch('https://uowfyp2020.herokuapp.com/comment/getChiidComment?productID=' + this.props.route.params.productID)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          _comment: responseJson,
        });

      }).catch(error => {
        console.error(error + "Fail to load comments");
      });
  }

  AddFav = () => {
    console.log("fav");
    fetch("https://uowfyp2020.herokuapp.com/fav/addFav?userID=" + this.state._id + "&productID=" + this.state._item.productID)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        Alert.alert(
          'Add Success',
          this.state._item.name + ' has been added to the favourites',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      }).catch(error => {
        console.error(error);
      });
  }

  Addcart = () => {
    if (this.state.type == 'item') {
      fetch("https://uowfyp2020.herokuapp.com/cart/addCart?userID=" + this.state._id + "&productID=" + this.state._item.productID + "&quantity=1")
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          Alert.alert(
            'Add Success',
            this.state._item.name + ' has been added to your cart.',
            [
              { text: 'OK', onPress: () => this.changeQuantity() },
            ],
            { cancelable: false }
          )
        }).catch(error => {
          console.error(error);
        });
    } else {
      fetch("https://uowfyp2020.herokuapp.com/cart/addCart?userID=" + this.state._id + "&productID=" + this.state._item.productID + "&quantity=-1")
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          Alert.alert(
            'Add Success',
            this.state._item.name + ' has been added to your cart.',
            [
              { text: 'OK' },
            ],
            { cancelable: false }
          )
        }).catch(error => {
          console.error(error);
        });
    }
  }

  changeQuantity = () => {
    fetch("https://uowfyp2020.herokuapp.com/item/changeQuantity?quantity=" + (this.state._item.quantity - 1) + "&pID=" + this.state._item.productID)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      }).catch(error => {
        console.error(error);
      });
    this.getItem();
  }


  rating = (value) => {
    var rating;
    if (value == '10') {
      rating = (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
        </View>
      )
    }
    else if (value == 9) {
      rating = (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
        </View>
      )
    }
    else if (value == 8) {
      rating = (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
        </View>
      )
    }
    else if (value == 7) {
      rating = (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
        </View>
      )
    }
    else if (value == 6) {
      rating = (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
        </View>
      )
    }
    else if (value == 5) {
      rating = (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
        </View>
      )
    }
    else if (value == 4) {
      rating = (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
        </View>
      )
    }
    else if (value == 3) {
      rating = (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
        </View>
      )
    }
    else if (value == 2) {
      rating = (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
        </View>
      )
    }
    else if (value == 1) {
      rating = (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="star" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
        </View>
      )
    }
    else if (value == 0) {
      rating = (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
          <FontAwesome name="star-o" size={14} color="gold" />
        </View>
      )
    }

    return rating;
  }



  render() {
    var addToCart;

    if (this.state.type == 'item') {
      if (this.state._item.quantity > 0) {
        addToCart = (<View style={styles.cartbtn}>
          <Button title="Add To Cart" onPress={this.Addcart} />
        </View>)
      } else {
        addToCart = (<View style={styles.cartbtn}>
          <Button title="Sold out" disabled />
        </View>)
      }

    } else {
      addToCart = (<View style={styles.cartbtn}>
        <Button title="Add To Cart" onPress={this.Addcart} />
      </View>)
    }

    var loadSubComment;



    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imgconinter}><Image source={{ uri: this.state.photo }} style={{ width: 250, height: 200, textAlign: 'center' }} /></View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.infocontainer}>
            <Text style={styles.catinfo}>{this.state._item.category}</Text>
            <Text style={styles.title}>{this.state._item.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity>
                <Text style={styles.sellerinfo}><Text style={{ color: 'grey', fontWeight: 'normal' }}>Comes from: </Text>{this.state._item.seller}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 0.1, alignItems: 'flex-end' }} onPress={() => { Linking.openURL("https://wa.me/852"+this.state.phone); }}>
                <View style={{ marginTop: 4 }}><FontAwesome5 name="whatsapp" size={19} color="black" /></View>
              </TouchableOpacity >
            </View>
            <Text style={styles.priceinfo}>HKD {this.state._item.price}</Text>
            <Text style={styles.info}>{this.state._item.description}</Text>
          </View>

          <View style={styles.buttonholder}>
            {addToCart}

            <View style={styles.favbtn}>
              <Button title="Add To Favourite" onPress={this.AddFav} />
            </View>
          </View>
          <View style={{ marginTop: 50 }}>

            <FlatList
              style={{ marginTop: 10, marginBottom: 15 }}
              numColumns={1}
              data={this.state._comment}
              keyExtractor={(item) => item.index}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.userName}>
                      {item.userID}</Text>
                    <Text style={styles.itemDate}>
                      Date: {item.date_added}
                    </Text>
                  </View>
                  {this.rating(item.rating)}
                  <Text style={styles.CommentHolder}>{item.content}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ marginRight: 5 }}>
                      <Text style={{ fontWeight: 'bold', color: 'gray' }}>Reply</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: 10, fontWeight: 'bold' }} onPress={() => { this.props.navigation.navigate('subComment', { comment: item, product: this.state._item, img: this.state.photo }) }}>
                      <Text style={{ fontWeight: 'bold', color: 'gray' }}>Show replies</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imgconinter: {
    position: "absolute",
    alignSelf: 'center',
    paddingTop: 15
  },
  infocontainer: {
    marginTop: "55%",
    padding: 5,
    position: "relative"
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    padding: 5
  },
  info: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 14
  },
  priceinfo: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: 'bold'
  },
  catinfo: {
    paddingTop: 5,
    marginTop: 10,
    paddingLeft: 5,
    fontSize: 14,
    color: 'grey'
  },
  buttonholder: {
    position: "relative",
    paddingVertical: 5,
    paddingRight: 5
  },
  sellerinfo: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1979a9'
  },
  cartbtn: {
    paddingVertical: 10,
    paddingLeft: 5,
    left: 5,
    position: 'absolute',
    marginLeft: 4
  },
  favbtn: {
    position: "absolute",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
    marginLeft: "40%"
  },
  itemContainer: {
    margin: 10,
    backgroundColor: 'azure',
    padding: 10,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
    alignItems: 'flex-start',
    padding: 1
  },
  initemContainer: {
    marginTop: 15,
    width: 250,
    paddingLeft: 40
  },
  itemDate: {
    fontWeight: "bold",
    fontSize: 14,
    padding: 3,
    position: 'absolute',
    right: 16,
    fontWeight: 'normal',
    color: 'grey',
    textAlign: "right"
  },
  CommentHolder: {
    fontSize: 17,
    padding: 1
  },

  userName: {
    fontWeight: "bold",
    fontSize: 16,
    alignItems: 'flex-start',
    padding: 1,
    marginRight: 30,
  }
});