import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList, AsyncStorage, Alert, ScrollView } from 'react-native'

export default class following extends Component {
  constructor(navigation) {
    super(navigation);
    this.state = {
      _id: "",
      _follow: []
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

    console.log(value);

    fetch("https://uowfyp2020.herokuapp.com/following/getList?userID=" + value)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          _follow: responseJson
        });
      }).catch(error => {
        console.error(error);
      });
  };

  unfollow = (followID) => {
    fetch("https://uowfyp2020.herokuapp.com/following/unfollow?userID=" + this.state._id + "&followID=" + followID)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson == "280") {
          Alert.alert(
            'Update Success',
            'Your already success',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
        }
        else if (responseJson == "480") {
          Alert.alert(
            'Update Fail',
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
      this.getAsync();
  }

  render() {
    return (
      <View>
        <View>
          <ScrollView>
            <FlatList
              numColumns={1}
              keyExtractor={(item) => item.index}
              data={this.state._follow}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { this.props.navigation.navigate(('userInfo'),{userID:item.name})}}>
                <View style={styles.itemContainer}>
                    <View style={{ flexDirection: 'row' }}>
                      <View>
                        <Text style={styles.itemName}>{item.userID}</Text>
                        <Text style={styles.name}>{item.name}</Text>
                      </View>
                      <View style={{ position: 'absolute', left: '75%', letterSpacing: 0.5 }}>
                        <Button color='#1979a9' title="UnFollow" onPress={() => this.unfollow(item.userID)} />
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
    alignItems: 'center',
  },
  itemContainer: {
    marginTop: 20,
	marginHorizontal: 30,
    alignItems: "flex-start",
    flexWrap: "wrap",
    borderWidth: 0.5,
    padding: 30,
    marginBottom: 15
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 20,
	letterSpacing: 0.5,
  },
  name: {
    fontSize: 15,
    color: 'lightgray',
  }
});