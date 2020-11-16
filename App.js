import firebase from 'firebase';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Login2 from "./Components/Login2/Login2";


export default class App extends React.Component {
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

    //Returnerer log in View med en gang
    render() {

        // const {user} = this.state;
        {
            return <Login2 />;

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