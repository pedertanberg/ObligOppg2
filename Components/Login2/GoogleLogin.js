//import React, { Component } from 'react';
import * as React from 'react';
import { Text, View, ImageBackground, StyleSheet, ScrollView, Button, Alert, Image, KeyboardAvoidingView } from 'react-native';
import * as Google from 'expo-google-app-auth';
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { Card } from 'react-native-paper';
import MainScreen from '../../MainScreen';
import Biometrics from './Biometrics';
import HeaderX from "../Activities/HeaderX";

const googleConfig = {
    /*Android/IOS ID behøver ikke at blive skiftet */
    clientId: '581168810002-buvtrj88js68ch38iiau4556c23i1br6.apps.googleusercontent.com',
    iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
    androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
    iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
    androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>'
};


export default class GoogleLogin extends React.Component {
    state = {
        isLoggedIn: false,
        googleUser: "",
        googleToken: ""
    };
    /*Metode der kaldes for at logge ind med Async! */
    handleGoogleLogin = async () => {
        try {
            /*Returnere et true false med type og en bruger du logger ind med*/
            const { type, accessToken, user } = await Google.logInAsync(googleConfig);

            /*Er det et en success?*/
            if (type === "success") {
                this.setState({ isLoggedIn: true });
                this.setState({ googleUser: user });
                this.setState({ googleToken: accessToken });
                /*Debug til om der et token sat*/
                console.log(accessToken + ' her er token')

                /*Jeg går ikke igennem med login*/
            } else if (type === "cancel") {
                Alert.alert(
                    'Cancelled!',
                    'Login was cancelled!',
                );
                /*Hvis alt andet fejler så vis en fejl*/
            } else {
                Alert.alert(
                    'Oops!',
                    'Login failed!',
                );
            }
            /*Håndter fejl med catchs*/
        } catch (e) {
            console.log(e)
        }
    };


    /*Logger ud*/
    _handleLogOut = async () => {
        try {
            const { type } = await Google.logOutAsync({ accessToken: this.state.googleToken, ...googleConfig });
            this.setState({ isLoggedIn: false, googleUser: "", googleToke: "" });
            console.log('dette er min ' + type)
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        const { googleUser, isLoggedIn } = this.state;

        if (!isLoggedIn) {
            return (

                <KeyboardAvoidingView behaviour="padding" style={styles.root}>

                    <ImageBackground
                        style={styles.rect}
                        imageStyle={styles.rect_imageStyle}
                        source={require("../Images/bg.jpg")}
                    >


                        <KeyboardAvoidingView behaviour="padding" style={styles.background}>

                            <ScrollView style={styles.background}>

                                <Text style={styles.paragraph}>

                                </Text>
                                <Button
                                    title="Login med Google"
                                    onPress={this.handleGoogleLogin}
                                />

                                <Text style={styles.paragraph}>
                                    Eller opprett og logg inn med en activItkonto
                        </Text>
                                <Card>
                                    <SignUpForm />
                                </Card>
                                <Card>
                                    <LoginForm />
                                </Card>
                            </ScrollView>

                        </KeyboardAvoidingView>
                    </ImageBackground>

                </KeyboardAvoidingView>

            );
        } else {
            return (
                <MainScreen />
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
    },
    root: {
        flex: 1,

    },
    background: {
        flex: 1
    },
    rect: {
        flex: 1
    },
    rect_imageStyle: {},
    logo: {
        width: 102,
        height: 111,
        alignSelf: "center"
    },
    stackFiller: {
        flex: 1
    },
    activIt: {

        position: "absolute",
        bottom: 4,
        fontSize: 96
    },
    rect7: {
        left: 93,
        height: 8,

        position: "absolute",
        right: 94,
        bottom: 0
    },
    activItStack: {
        height: 132,
        marginBottom: 6,
        marginLeft: -91,
        marginRight: -91
    },
    form: {
        height: 230,
        marginTop: 59
    },
    username: {
        height: 59,

        borderRadius: 5,
        flexDirection: "row"
    },
    icon22: {

        fontSize: 30,
        marginLeft: 20,
        alignSelf: "center"
    },
    usernameInput: {
        height: 30,

        flex: 1,
        marginRight: 11,
        marginLeft: 11,
        marginTop: 14
    },
    password: {
        height: 59,

        borderRadius: 5,
        flexDirection: "row",
        marginTop: 27
    },
    icon2: {

        fontSize: 33,
        marginLeft: 20,
        alignSelf: "center"
    },
    passwordInput: {
        height: 30,

        flex: 1,
        marginRight: 17,
        marginLeft: 8,
        marginTop: 14
    },
    usernameColumn: {},
    usernameColumnFiller: {
        flex: 1
    },
    button: {
        height: 59,
        backgroundColor: "#21164e",
        borderRadius: 5,
        justifyContent: "center"
    },
    text2: {

        alignSelf: "center"
    },
    logoColumn: {
        marginTop: 130,
        marginLeft: 41,
        marginRight: 41
    },
    logoColumnFiller: {
        flex: 1
    },
    footerTexts: {
        height: 14,
        flexDirection: "row",
        marginBottom: 36,
        marginLeft: 37,
        marginRight: 36
    },
    button2: {
        width: 104,
        height: 14,
        alignSelf: "flex-end"
    },
    createAccountFiller: {
        flex: 1
    },
    createAccount: {

    },
    button2Filler: {
        flex: 1,
        flexDirection: "row"
    },
    needHelp: {

        alignSelf: "flex-end",
        marginRight: -1
    }
});


