import React, { useState, useCallback, useEffect } from 'react'

import HeaderX from "../Activities/HeaderX";
import { GiftedChat } from 'react-native-gifted-chat';

import { View, Text, Platform, ImageBackground, TouchableHighlight, TextInput, Modal, Image, StyleSheet, Button, Alert } from 'react-native';


export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.onSend = this.onSend.bind(this);
    }
    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello Peder, jeg vil gjerne booke din aktivitet den 12.12.2020, har du mulighet for det? Så du var fleksibel på hvor aktiviteten tar sted, kan vi være hos meg? Jeg bor like ved Nyhavn. Hva med kl 19:00.',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Henrik Stangeland',
                        avatar: 'https://media-exp1.licdn.com/dms/image/C4D03AQH7i_FWmu2SWQ/profile-displayphoto-shrink_200_200/0?e=1609977600&v=beta&t=nNEpmowbG0wdoO4iqtpWTivboVQUsfaRprgezHjWgvQ',
                    },
                },
            ],
        });
    }
    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <HeaderX
                    icon2Family="Feather"
                    icon2Name="search"
                    style={styles.headerX}
                ></HeaderX>
                <ImageBackground
                    style={styles.rect2}
                    imageStyle={styles.rect2_imageStyle}
                    source={require("../Images/bg.jpg")}
                >
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={this.onSend}
                        user={{
                            _id: 1,
                        }}
                    />
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rect2: {
        flex: 1
    },
    rect2_imageStyle: {},
    progressBar: {
        height: 40,
        flexDirection: "row",
        marginLeft: 28,
        marginRight: 28
    },
    rect2: {
        flex: 1,
        width: "100%",
    },
    photo: {
        flex: 1,
        width: "100%",
        height: 180
    },
    button: {

    },
    container: { flex: 1, justifyContent: 'flex-start', backgroundColor: "rgb(27,29,37)" },
    row: {
        margin: 6,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold', color: "white", fontSize: 15 },
    value: { flex: 1, color: "white" },
    headerX: {
        height: 80,
        elevation: 15,
        shadowOffset: {
            height: 7,
            width: 1
        },
        shadowColor: "rgba(0,0,0,1)",
        shadowOpacity: 0.1,
        shadowRadius: 5
    },
    icon6: {
        color: "rgba(255,255,255,1)",
        fontSize: 33,
        marginLeft: 15,
        alignSelf: "center"
    },
    city: {
        height: 59,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 5,
        flexDirection: "row",
        marginTop: 20
    },
    emailInput: {
        height: 30,
        color: "rgba(255,255,255,1)",
        flex: 1,
        marginRight: 17,
        marginLeft: 13,
        marginTop: 14
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#000",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});