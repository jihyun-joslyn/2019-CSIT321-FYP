import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button, Picker, AsyncStorage, Alert, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


export default class upload extends Component {
  constructor(navigation) {
    super(navigation);
    this.state = {
      _id: "",
      _productName: "",
      _cat: "",
      _descr: "",
      _price: "",
      _getcat: [],
      _subCat: [],
      _cID: "c0001",
      mode: "",
      path: "item",
      image: 'https://i.imgur.com/Fi9J6K4.png',
      temp: '',
      imageok: 0,
      nameeok: 0,
      decok: 0,
      priceok: 0,
      notOkWord: ["drug", "bomb", "sex", "crime", "rob"],
      _changed: 0
    };
  }

  componentDidMount() {
    this.getCat();
  };

  getCat = async () => {
    const value = await AsyncStorage.getItem('userID');

    if (value !== null) {
      this.setState({
        _id: value,

      });
    }



    fetch("https://uowfyp2020.herokuapp.com/category/getCatList")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          _getcat: responseJson
        });
      }).catch(error => {
        console.error(error);
      });

    fetch("https://uowfyp2020.herokuapp.com/subCat/getSubCat?cID=c0001")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          _subCat: responseJson
        });
      }).catch(error => {
        console.error(error);
      });
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {

        let base64data = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 })

        let formData = new FormData();
        formData.append('image', base64data);
        formData.append('type', 'base64');

        fetch('https://api.imgur.com/3/image',
          {
            method: 'POST',
            headers: {
              Authorization: 'Client-ID e070b98cb9cedea',
              'Content-Type': 'multipart/form-data'
            },
            body: formData
          })
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson.data.link);
            this.setState({ image: responseJson.data.link });
            this.setState({ imageok: 1 })
          }).catch(error => {
            console.error(error);
          });

      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  checkValid = () => {
    let counter = 0;
    for (var i = 0; i < this.state.notOkWord.length; i++) {
      counter+=1;
      if (this.state._productName.indexOf(this.state.notOkWord[i]) > -1) {
        counter-=1;
        Alert.alert(
          'Violation word detected',
          'Your product name may include some violation words. If you still want to upload, we may have further validation.',
          [
            {
              text: 'Keep upload', onPress: () => {
                this.UploadProductToAdmin();
                return;
              }
            },
            {
              text: 'Back', onPress: () => {
                this.props.navigation.navigate("upload");
                return;
              }
            },
          ],
          { cancelable: false }
        )
      }
      else if (this.state._descr.indexOf(this.state.notOkWord[i]) > -1) {
        counter-=1;
        Alert.alert(
          'Violation word detected',
          'Your description may include some violation words. If you still want to upload, we may have further validation.',
          [
            {
              text: 'Keep upload', onPress: () => {
                this.UploadProductToAdmin();
                return;
              }
            },
            {
              text: 'Back', onPress: () => {
                this.props.navigation.navigate("upload");
                return;
              }
            },
          ],
          { cancelable: false }
        )
      }else if (counter==5){
        this.UploadProduct();
      }
    }
  }

  //set back the type later
  UploadProductToAdmin = () => {
    fetch("https://uowfyp2020.herokuapp.com/admin/adminAdd?userID=" + this.state._id + "&cID=" + this.state._cID + "&name=" + this.state._productName + "&description=" + this.state._descr + "&price=" + this.state._price + "&type=" + this.state.path)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ temp: responseJson })
        this.uploadimg();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  UploadProduct = () => {
    if (this.state.path == "item") {
      fetch("https://uowfyp2020.herokuapp.com/" + this.state.path + "/uploadItem?cID=" + this.state._cID + "&name=" + this.state._productName + "&description=" + this.state._descr + "&seller=" + this.state._id + "&price=" + this.state._price)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({ temp: responseJson })
          this.uploadimg();
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (this.state.path == "service") {
      fetch("https://uowfyp2020.herokuapp.com/" + this.state.path + "/uploadService?cID=" + this.state._cID + "&name=" + this.state._productName + "&descripiton=" + this.state._descr + "&seller=" + this.state._id + "&price=" + this.state._price)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({ temp: responseJson })
          this.uploadimg();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  uploadimg = () => {
    fetch("https://uowfyp2020.herokuapp.com/sPhoto/uploadphoto?productID=" + this.state.temp + "&img=" + this.state.image)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson == "260") {
          Alert.alert(
            'Upload Product Success',
            'Your product is uploaded to the system already',
            [
              {
                text: 'OK', onPress: () => {
                  console.log("OK pressed");
                  this.setState({
                    image: 'https://i.imgur.com/Fi9J6K4.png',
                    _productName: "",
                    _descr: "",
                    _price: "",
                    imageok: 0,
                    decok: 0,
                    nameeok: 0,
                    priceok: 0,
                    path:"item"
                  })
                }
              },
            ],
            { cancelable: false }
          )
        }
        else if (responseJson == "460") {
          Alert.alert(
            'Upload Fail',
            'Please try again.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
        }
      })

  }

  getSubCat = (cID) => {
    fetch("https://uowfyp2020.herokuapp.com/subCat/getSubCat?cID=" + cID)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          _subCat: responseJson
        });
      }).catch(error => {
        console.error(error);
      });
  }
  
  dismissKeyboard = () => {
    console.log('dismissed');
    Keyboard.dismiss();
  };
  
  render() {
    let catItems = this.state._getcat.map((c, i) => {
      return <Picker.Item key={i} value={c.cid} label={c.name} />
    });
    let sub = this.state._subCat.map((s, i) => {
      return <Picker.Item key={i} value={s.cid} label={s.name} />
    });
    let { image } = this.state.image;

    var Ableclick;

    if (this.state.imageok == 1 && this.state.nameok == 1 && this.state.decok == 1 && this.state.priceok == 1) {
      Ableclick = (
        <View style={{ marginTop: 20, width: 100, alignSelf: 'center'}}><Button color='#1979a9' title=" Post " onPress={this.checkValid} /></View>
      );
    }
    else {
      Ableclick = (
        <View style={{ marginTop: 20, width: 100, alignSelf: 'center' }}><Button color='#1979a9' title=" Post " onPress={this.checkValid} disabled /></View>
      );
    }

    return (
            <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={20}
      >
        <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
          <View style={styles.container}>
            <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center', textAlign: 'center',  }}>
              <Image source={{ uri: this.state.image }} style={{ width: 230, height: 230, flex: 1,}} />
            </View>
            <View style={{ width: 100, paddingTop: 5, alignSelf: 'center' }}>
              <Button title="Pick image" onPress={this._pickImage} />
            </View>
            <View style={styles.iteminfo}>
              <View style={styles.labelholder}>
                <View><Text style={styles.labeltext}>Product Name</Text></View>
                <View><Text style={styles.labeltext}>Type</Text></View>
                <View><Text style={styles.labeltext}>Category</Text></View>
                <View><Text style={styles.labeltext}></Text></View>
                <View><Text style={styles.labeltext}>Description</Text></View>
                <View><Text style={styles.labeltext}>Price</Text></View>
              </View>
              <View style={styles.inputholder}>
                <TextInput
                  onChangeText={(name) => { this.setState({ _productName: name }); if (name != "") { this.setState({ nameok: 1 }) } else { this.setState({ nameok: 0 }) } }}
                  value={this.state._productName}
                  placeholder="Product Name"
                  placeholderTextColor="#808080"
                  underlineColorAndroid={'grey'}
                  style={styles.inputtext} />
                <View>
                  <Picker
                    selectedValue={this.state.path}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ path: itemValue })
                    }>
                    <Picker.Item label="item" value="item" />
                    <Picker.Item label="service" value="service" />
                  </Picker>
                </View>
                <Picker
                  selectedValue={this.state._cat}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ _cat: itemValue });
                    this.getSubCat(itemValue);
                  }
                  }>
                  {catItems}
                </Picker>
                <View>
                  <Picker
                    selectedValue={this.state._cID}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ _cID: itemValue })
                    }>
                    {sub}
                  </Picker>
                </View>
                <TextInput
                  multiline
                  onChangeText={(desc) => { this.setState({ _descr: desc }); if (desc != "") { this.setState({ decok: 1 }) } else { this.setState({ decok: 0 }) } }}
                  value={this.state._descr}
                  placeholder="Description"
                  placeholderTextColor="#808080"
                  underlineColorAndroid={'grey'}
                  style={styles.inputtext} />
                <TextInput
                  placeholder="Price"
                  keyboardType="number-pad"
                  onChangeText={(price) => { this.setState({ _price: price }); if (price != "") { this.setState({ priceok: 1 }) } else { this.setState({ priceok: 0 }) } }}
                  value={this.state._price}
                  placeholderTextColor="#808080"
                  underlineColorAndroid={'grey'}
                  style={styles.inputtext} />
              </View>
            </View>
            {Ableclick}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  iteminfo: {
    width: '100%',
    marginTop: 15,
    flexDirection: 'row'
  },
  labelholder: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 5,
    paddingLeft: 10,
    flex: 2,
    flexDirection: 'column',
    width: '40%'
  },
  labeltext: {
    fontSize: 17,
    paddingTop: 15,
    marginBottom: 5,

  },
  inputholder: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingLeft: 10,
    flex: 4,
    flexDirection: 'column',
    width: '80%'
  },
  inputtext: {
    height: 45,
    width: '85%',
    fontSize: 17,
    color: '#282828',
    paddingLeft: 5
  },
});
