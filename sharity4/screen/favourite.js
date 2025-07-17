import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, AsyncStorage, ScrollView,TouchableOpacity ,Alert,Image } from 'react-native'

export default class favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      _productID:'',
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
    fetch("https://uowfyp2020.herokuapp.com/fav/showFav?userID=" + value)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          _item: responseJson
        });
      }).catch(error => {
        console.error(error);
      });
  };

  deleteFav = (item) => {
    fetch("https://uowfyp2020.herokuapp.com/fav/deleteFav?userID=" + this.state._id + "&productID=" + item.productID)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson == "295") {
          Alert.alert(
            'Delete Success',
            'Delete success',
            [
              { text: 'OK', onPress: () => {console.log('OK Pressed');this.getagain();} },
            ],
            { cancelable: false }
          )
        }
        else if (responseJson == "495") {
          Alert.alert(
            'Delete Fail',
            'Please try again.',
            [
              { text: 'OK', onPress: () => {console.log('OK Pressed');this.getagain();} },
            ],
            { cancelable: false }
          )
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

getagain=()=>{
  fetch("https://uowfyp2020.herokuapp.com/fav/showFav?userID=" + this.state._id)
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
                  <View style={styles.itemContainer} onPress={() => this.props.navigation.navigate('itemdetail', item)}>
                    <View style={{flexDirection:'row'}} >
                      <View>
                    <Image source={{ uri: item.img }} style={{ width: 100, height: 100 }} />
                    </View>
                    <View style={{paddingLeft: 30}}>
				          	<Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>HK${item.price}</Text>
                    <TouchableOpacity onPress={()=>this.deleteFav(item)} style={styles.deleteBtn}>
                      <View>
                        <Text>Unlike</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
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
  },
  itemContainer: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    alignItems: "flex-start",
    flexWrap: "wrap",
    borderWidth: 0.5,
    padding: 30,
    marginBottom: 10
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 15,
    paddingBottom: 5,
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
    marginTop: 10,
    width:85,
  }
});