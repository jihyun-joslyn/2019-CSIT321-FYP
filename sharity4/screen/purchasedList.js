import React, { Component } from 'react'
import { Image,Text, View, StyleSheet, FlatList, AsyncStorage, ScrollView, TouchableOpacity,Button } from 'react-native'

export default class purchasedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      _item: [],
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
    console.log(this.props);
    fetch("https://uowfyp2020.herokuapp.com/order/getOrderList?userID=" + value + "&transactionID=" + this.props.route.params)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          _item: responseJson,
        });
      }).catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            keyExtractor={(item) => item.index}
            data={this.state._item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('itemdetail', item)}>
                <View style={styles.itemContainer} onPress={() => this.props.navigation.navigate('itemdetail', item)}>
                  <View style={{ flexDirection: 'row' }} >
                    <View>
                      <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                    </View>
                    <View style={{paddingLeft:30}}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={{marginBottom: 5}}><Text style={{color:'grey', }}>Seller: </Text>{item.sellerID}</Text>
                      <Text style={styles.itemPrice}>HK${item.price}</Text>
                      <View style={{width:"80%"}}> 
                    <Button color='#1979a9' title="Add Comment" onPress={() => this.props.navigation.navigate('addComment', item)} />
                  </View>
                    </View>
                  </View>
             </View>
              </TouchableOpacity>
            )}
          />
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
  itemContainer: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    alignItems: "flex-start",
    flexWrap: "wrap",
    borderWidth: 0.5,
    paddingVertical: 30,
    paddingHorizontal: 40,
    marginBottom: 20
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 15,
	 letterSpacing: 0.5,
    width: 200
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