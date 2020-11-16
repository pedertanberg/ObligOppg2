import * as React from 'react';
import firebase from 'firebase'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    ImageBackground
} from 'react-native';

import HeaderX from "../Components/Activities/HeaderX";

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

    container: { flex: 1, justifyContent: 'center', backgroundColor: "rgb(27,29,37)" },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: { fontWeight: 'bold', width: 100, color: "white" },
    input: { borderWidth: 1, flex: 1, color: "white", borderColor: "white" },
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
});

export default class EditActivity extends React.Component {
    //Setter først staten til blank. 
    state = {

        displayName: '',
        email: '',
        phoneNumber: '',



    };



    // Her loader vi aktivitetens data ut ifra det ID vi får med fra navigationen, gjennom url fra firebase og ref. 

    handleChangePassword = displayName => this.setState({ displayName });
    handlephotoURLChange = email => this.setState({ email });
    handlePhoneChange = phoneNumber => this.setState({ phoneNumber });




    handleSubmit = async () => {



        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: this.state.displayName,
            photoURL: "https://media-exp1.licdn.com/dms/image/C4D03AQH7i_FWmu2SWQ/profile-displayphoto-shrink_200_200/0?e=1609977600&v=beta&t=nNEpmowbG0wdoO4iqtpWTivboVQUsfaRprgezHjWgvQ",
            email: this.state.email,
        }).then(function () {
            // Update successful.
            console.log("hei")
            console.log(user)
        }).catch(function (error) {
            // An error happened.
        });
    }

    render() {
        const { displayName, phoneNumber, email } = this.state;
        return (



            //Her injekter vi all information som skal vises og hvorledes gjenneom styles.
            <View style={styles.container}>
                <HeaderX
                    icon2Family="Feather"
                    icon2displayName="search"
                    style={styles.headerX}
                ></HeaderX>
                <ImageBackground
                    style={styles.rect2}
                    imageStyle={styles.rect2_imageStyle}
                    source={require("./Login/luke-chesser-3rWagdKBF7U-unsplash.jpg")}
                >
                    <ScrollView>
                        <View style={styles.row}>
                            <Text style={styles.label}>displayName</Text>
                            <TextInput
                                value={displayName}
                                onChangeText={this.handleChangePassword}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                value={phoneNumber}
                                onChangeText={this.handlePhoneChange}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={this.handlephotoURLChange}
                                style={styles.input}
                            />
                        </View>

                        <Button title="Press to update user info" onPress={this.handleSubmit}></Button>

                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }
}
