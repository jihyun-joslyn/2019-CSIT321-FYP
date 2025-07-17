import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Image, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class subComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _comment: [],
            _id: "",
            comment: ""
        };
    }

    componentDidMount() {
        this.getAsync();
    }

    getAsync = async () => {
        const value = await AsyncStorage.getItem('userID');
        console.log(this.props.route.params);
        if (value !== null) {
            this.setState({
                _id: value
            });
        }

        this.getComment();

    };

    getComment = () => {
        fetch('https://uowfyp2020.herokuapp.com/comment/getSubComment?commentID=' + this.props.route.params.comment.commentID + '&productID=' + this.props.route.params.product.productID)
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

    addSubComment = () => {
        fetch('https://uowfyp2020.herokuapp.com/comment/submitChildComment?parent=' + this.props.route.params.comment.commentID + '&productID=' + this.props.route.params.product.productID + '&userID=' + this.state._id + '&content=' + this.state.comment)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({
                    _comment: responseJson,
                });

            }).catch(error => {
                console.error(error);
            });
            this.setState({
                comment: ""
            })
    }
    render() {
        var rating;

        if (this.props.route.params.comment.rating == 10) {
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
        else if (this.props.route.params.comment.rating == 9) {
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
        else if (this.props.route.params.comment.rating == 8) {
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
        else if (this.props.route.params.comment.rating == 7) {
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
        else if (this.props.route.params.comment.rating == 6) {
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
        else if (this.props.route.params.comment.rating == 5) {
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
        else if (this.props.route.params.comment.rating == 4) {
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
        else if (this.props.route.params.comment.rating == 3) {
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
        else if (this.props.route.params.comment.rating == 2) {
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
        else if (this.props.route.params.comment.rating == 1) {
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
        else if (this.props.route.params.comment.rating == 0) {
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

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('itemdetail', this.props.route.params.product)}>
                    <View style={styles.itemContainer} onPress={() => this.props.navigation.navigate('itemdetail', this.props.route.params.product)}>
                        <View style={{ flexDirection: 'row' }} >
                            <View>
                                <Image source={{ uri: this.props.route.params.img }} style={{ width: 100, height: 100 }} />
                            </View>
                            <View style={{ paddingLeft: 30, marginTop: 30 }}>
                                <Text style={styles.itemName}>{this.props.route.params.product.name}</Text>
                                <Text style={styles.itemPrice}>HK${this.props.route.params.product.price}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.parentContainer}>
                    <View >

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.parentid}>{this.props.route.params.comment.userID}</Text>
                                <Text style={styles.date}>{this.props.route.params.comment.date_added}</Text>
                            </View>
                            {rating}
                            <Text style={styles.parent}>{this.props.route.params.comment.content}</Text>

                        </View>
                    </View>
                </View>

                <FlatList
                    numColumns={1}
                    data={this.state._comment}
                    keyExtractor={(item) => item.index}
                    renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.parentid}>{this.props.route.params.comment.userID}</Text>
                                <Text style={styles.date}>{this.props.route.params.comment.date_added}</Text>
                            </View>
                            <Text style={styles.CommentHolder}>{item.content}</Text>

                        </View>
                    )}
                />

                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        onChangeText={(value) => this.setState({ comment: value })}
                        value={this.state.comment}
                        placeholder="Type your reply here..."
                        placeholderTextColor="#808080"
                        underlineColorAndroid={'grey'}
                        style={styles.inputtext}
                    />

                    <View style={{marginLeft: 10, marginTop: 5, width: '15%', marginBottom: 25 }}>
                        <Button color='#1979a9' title=" Post " onPress={this.addSubComment} />
                        </View>
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
    itemContainer: {
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
        alignItems: "flex-start",
        flexWrap: "wrap",
        borderWidth: 0.5,
        padding: 10,
        borderColor: 'lightgray',
    },
    itemName: {
        fontWeight: "bold",
        fontSize: 20,
        paddingBottom: 5,
        letterSpacing: 0.5,
        width:"70%"
    },
    itemPrice: {
        fontSize: 15,
        paddingBottom: 5
    },
    parentContainer: {
        marginTop: 10,
        marginHorizontal: 10,
        padding: 15,
        marginBottom: 10,
        backgroundColor: 'azure',
    },
    parentid: {
        fontWeight: "bold",
        fontSize: 15,
        paddingBottom: 5,
        paddingRight: 5,
        letterSpacing: 0.5,
    },
    date: {
        fontSize: 15,
        paddingBottom: 5,
        color: 'lightgray',
        paddingHorizontal: 5
    },
    parent: {
        fontSize: 17,
        paddingBottom: 5,
    },
    commentContainer: {
        marginHorizontal: 10,
        backgroundColor: '#F5FFFA',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderColor: 'lightgray',
    },
    CommentHolder: {
        fontSize: 14,
        padding: 1
    },
    inputtext: {
        height: 45,
        paddingLeft: 6,
        width: '70%',
        fontSize: 15,
        marginHorizontal: 10,
        marginBottom: 25,
        color: '#282828',
    },
})