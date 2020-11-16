import React, { Component } from 'react';
import { createBottomTabNavigator } from "react-navigation-tabs";
import GoogleLogin from "./GoogleLogin";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { createAppContainer } from "react-navigation";
import MainScreen from "../../MainScreen";



const bottomTabNavigator = createBottomTabNavigator(
    {
        Google: {
            screen: GoogleLogin,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <AntDesign name="google" size={24} color={tintColor} />
                )
            }
        },

    }
);

const AppNav = createAppContainer(bottomTabNavigator);

export default class Login2 extends React.Component {
    state = { user: null };

    UNSAFE_componentWillMount() {
        var firebaseConfig = {
            apiKey: "AIzaSyC2F7jUn4RoL-jP9PFQ6te12Q7_cJj5nic",
            authDomain: "acitivit.firebaseapp.com",
            databaseURL: "https://acitivit.firebaseio.com",
            projectId: "acitivit",
            storageBucket: "acitivit.appspot.com",
            messagingSenderId: "738053182099",
            appId: "1:738053182099:web:d9bbf6187799905b927366",
            measurementId: "G-7P2KPG2KV6"
        };

        // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
        // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });
        });
    }


    render() {
        const { user } = this.state;
        if (!user) {
            return (
                <GoogleLogin />
            )
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
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#add8e6',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});