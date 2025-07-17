import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Picker, TouchableOpacity, AsyncStorage, Button } from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import { SearchBar } from 'react-native-elements';

export default class Search extends Component {
    constructor(navigation) {
        super(navigation);
        this.state = {
            _id: "",
            _item: [],
            _search: "",
            keyword: [],
            _getcat: [],
            _subCat: [],
            _cID: "all",
            _cat: "c0001",
            advanced: 0
        };
    }

    componentDidMount() {
        this.getAsync();
    }

    getAsync = async () => {
        const g = await AsyncStorage.getItem('goods');
        const s = await AsyncStorage.getItem('service');
        const uid = await AsyncStorage.getItem('userID');

        if (uid != null) {
            this.setState({
                _id: uid,
                _item: [],
                _storeid: "",
                path: "item",

            });
        }

        fetch("https://uowfyp2020.herokuapp.com/item/getAllItems")
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    _item: responseJson,
                });
            }).catch(error => {
                console.error(error);
            });

        fetch("https://uowfyp2020.herokuapp.com/searchHis/getKeywordList?userID=" + uid)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({
                    keyword: responseJson,
                });
            }).catch(error => {
                console.error(error);
            });

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

    showKeyword = () => {
        fetch("https://uowfyp2020.herokuapp.com/searchHis/getKeywordList?userID=" + this.state._id)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({
                    keyword: responseJson,
                });
            }).catch(error => {
                console.error(error);
            });

        fetch("https://uowfyp2020.herokuapp.com/item/getAllItems")
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    _item: responseJson,
                });
            }).catch(error => {
                console.error(error);
            });
    }

    switchMode = (value) => {
        if (value == 0) {
            this.setState({
                path: 'item'
            })
            AsyncStorage.setItem('goods', '1');
            AsyncStorage.setItem('service', '0');
            fetch("https://uowfyp2020.herokuapp.com/item/getAllItems")
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        _item: responseJson,
                    });
                }).catch(error => {
                    console.error(error);
                });
        } else if (value == 1) {
            this.setState({
                path: 'service'
            })
            AsyncStorage.setItem('service', '1');
            AsyncStorage.setItem('goods', '0');

            fetch("https://uowfyp2020.herokuapp.com/service/getAllServices")
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        _item: responseJson,
                    });
                }).catch(error => {
                    console.error(error);
                });
        }

    }

    getsearch = () => {
        fetch("https://uowfyp2020.herokuapp.com/searchHis/insertKeyword?userID=" + this.state._id + "&name=" + this.state._search)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
            }).catch(error => {
                console.error(error);
            });


        this.props.navigation.navigate('searchResult', { mode: 'normal', keyword: this.state._search, type: this.state.path })
    }

    pressKeyword = (value) => {
        this.setState({
            _search: value
        });

        this.props.navigation.navigate('searchResult', { mode: 'normal', keyword: value, type: this.state.path })

    }

    searchCat = () => {
        fetch("https://uowfyp2020.herokuapp.com/searchHis/insertKeyword?userID=" + this.state._id + "&name=" + this.state._search)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
            }).catch(error => {
                console.error(error);
            });

        this.props.navigation.navigate('searchResult', { mode: 'advanced', cat: this.state._cat, cID: this.state._cID, type: this.state.path, keyword: this.state._search });
    }

    render() {
        let catItems = this.state._getcat.map((c, i) => {
            return <Picker.Item key={i} value={c.cid} label={c.name} />
        });
        let sub = this.state._subCat.map((s, i) => {
            return <Picker.Item key={i} value={s.cid} label={s.name} />
        });

        var searchKeyword;
        if (this.state.keyword == [] || this.state.keyword == null || this.state.keyword[0] == "" || this.state.keyword[0] == null) {
            searchKeyword = (
                <View></View>
            )
        }
        else {
            searchKeyword = (
                <View>
                    <FlatList
                        horizontal
                        keyExtractor={(item) => item.index}
                        data={this.state.keyword}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => { this.pressKeyword(item.keyword) }}>
                                <View style={styles.keyword}>
                                    <Text>{item.keyword}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )
        }

        var advancedSearch;

        if (this.state.advanced == 1) {
            advancedSearch = (
                <View style={styles.inputtext}>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={this.state._cat}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ _cat: itemValue });
                                this.getSubCat(itemValue);
                            }
                            }>
                            {catItems}

                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={this.state._cID}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ _cID: itemValue })
                            }>
                            <Picker.Item value="all" label="All" />
                            {sub}
                        </Picker>
                    </View>
                    <View style={styles.buttonholder}>
                        <View style={{ marginVertical: 5, marginHorizontal: 15, width: 100, alignSelf: 'center' }}>
                            <Button color='#1979a9' title="Search" onPress={this.searchCat} />
                        </View>
                        <View style={{ marginVertical: 5, marginHorizontal: 15, width: 100 }}>
                            <Button
                                color='#1979a9'
                                title="Close"
                                onPress={() => { this.setState({ advanced: 0 }) }}
                            />
                        </View>
                    </View>


                </View>
            )
        }
        else {
            advancedSearch = (
                <View></View>
            )
        }


        return (
            <View style={styles.container}>
                <View style={styles.headerbar}>
                    <SearchBar
                        placeholder="Search"
                        containerStyle={{ width: '70%', backgroundColor: 'white', borderBottomColor: 'white', borderTopColor: 'white', marginTop: 30, marginLeft: 5 }}
                        inputStyle={{ backgroundColor: 'white' }}
                        leftIconContainerStyle={{ backgroundColor: 'white' }}
                        inputContainerStyle={{ backgroundColor: 'white' }}
                        underlineColorAndroid='gray'
                        value={this.state._search}
                        onClear={this.showKeyword}
                        onChangeText={(value) => {
                            if (value == "") {
                                this.setState({ _search: "" });
                            } else {
                                this.setState({ _search: value })
                            }
                        }}
                    />
                    {searchKeyword}
                    <View style={styles.buttonholder}>
                        <View style={{ marginVertical: 5, marginHorizontal: 15, width: 150 }}>
                            <Button
                                color='#1979a9'
                                title="Advanced Search"
                                onPress={() => { this.setState({ advanced: 1 }) }}
                            />
                        </View>
                        <View style={{ marginVertical: 5, marginHorizontal: 15, width: 100 }}>
                            <Button color='#1979a9' title="Submit" onPress={this.getsearch} />
                        </View>
                    </View>

                    <SwitchSelector
                        initial={0}
                        onPress={value => this.switchMode(value)}
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


                <View style={{ marginTop: "70%", marginBottom: "35%", height: "100%" }}>
                    {advancedSearch}
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerbar: {
        width: '100%',
        paddingBottom: 10,
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
    inputtext: {
        height: 45,
        paddingBottom: 20,
        marginLeft: 20,
        marginTop: 35,
        width: '50%',
        fontSize: 15,
        color: '#808080',
    },
    itemContainer: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        alignItems: "flex-start",
        flexWrap: "wrap",
        width: 180,
        backgroundColor: 'azure',
        padding: 5,
    },
    itemName: {
        fontWeight: "bold",
        fontSize: 15,
    },
    itemPrice: {
        fontSize: 12
    },
    keyword: {
        backgroundColor: 'lightgray',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginBottom: 10
    },

    buttonholder: {
        position: "relative",
        paddingVertical: 5,
        paddingRight: 5,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    inputtext: {
        paddingLeft: 10,
        flex: 4,
        flexDirection: 'column',

    },

    picker: {
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        marginVertical: 10,
        marginHorizontal: 10
    }
});