import React, { Component } from 'react';
import { Rating } from 'react-native-elements';
import { View, Text, StyleSheet, TextInput, Button, Alert, AsyncStorage, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default class addComment extends Component {
    constructor(navigation) {
        super(navigation);
        this.state = {
            _id: "",
            _detail: [],
            rating: 0,
            comment: ""
        };
    }

    dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    componentDidMount() {
        this.getAsync();
    };

    getAsync = async () => {
        const value = await AsyncStorage.getItem('userID');
        console.log(this.props.route.params);
        if (value !== null) {
            this.setState({
                _id: value
            });
        }
    };

    postComment = () => {
        fetch("https://uowfyp2020.herokuapp.com/comment/submitComment?productID=" + this.props.route.params.productID + "&userID=" + this.state._id + "&content=" + this.state.comment)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson != "450") {
                    fetch("https://uowfyp2020.herokuapp.com/rating/addRating?productID=" + this.props.route.params.productID + "&userID=" + this.state._id + "&rating=" + this.state.rating + "&commentID=" + responseJson.commentID)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);
                            if (responseJson == "230") {
                                Alert.alert(
                                    'Comment Success!',
                                    'Your comment had posted',
                                    [
                                        { text: 'OK' }
                                    ],
                                    { cancelable: false }
                                )
                                this.props.navigation.navigate('purchased');
                            }
                        })
                }
                else if (responseJson == "450") {
                    Alert.alert(
                        'Cannot post your comment',
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

    ratingCompleted=(inrating)=>{
        this.setState({ rating: inrating });
        console.log(inrating);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Write Your Comment: </Text>

                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View><Text style={{ margin: 5, fontSize: 20, width: 100, paddingTop: 5, paddingLeft: 5 }}>Rate: </Text>
                            </View>
                            <View><Rating
                                type="star"
                                fractions={0}
                                startingValue={5}
                                ratingCount={10}
                                imageSize={30}
                                onFinishRating={this.ratingCompleted}
                                style={styles.ratePicker}
                            /></View>
                        </View>
                        <View style={{ marginTop: 50 }}>
                            <View><Text style={{ padding: 10, fontSize: 15, marginBottom: 15 }}>Write down your comment!</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <TextInput
                                    style={styles.commentHolder}
                                    multiline={true}
                                    numberOfLines={12}
                                    onChangeText={(text) => this.setState({ comment: text })}
                                    value={this.state.comment} />
                            </View>
                            <View style={{ width: 200, paddingTop: 10, alignSelf: 'center' }}>
                                <Button color='#1979a9' title="Submit" onPress={this.postComment} />
                            </View>
                        </View>
                    </View>
                </View >
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    heading: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10
    },
    ratePicker: {
        marginTop:"4%",
        marginLeft:"25%",
        height: 50,
        width: 100
    },
    commentHolder: {
        width: '90%',
        borderWidth: 1,
        paddingLeft: 5,
        textAlignVertical: 'top'
    }
});