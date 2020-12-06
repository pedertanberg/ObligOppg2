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

import * as Permissions from 'expo-permissions';
import { ImagePicker } from 'expo-image-picker';
import Camera from "./Camera"



import HeaderX from "../Activities/HeaderX";

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

    uploadImage = async uri => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const ref = firebase.storage().ref('avatar').child(uuid.v4());
            const task = ref.put(blob);
            return new Promise((resolve, reject) => {
                task.on('state_changed', () => { }, reject,
                    () => resolve(task.snapshot.downloadURL));
            });
        } catch (err) {
            console.log('uploadImage error: ' + err.message);
        }
    }


    onImageUpload = async () => {
        const { status: cameraRollPerm } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        try {
            // only if user allows permission to camera roll
            if (cameraRollPerm === 'granted') {
                let pickerResult = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                });
                console.log(
                    'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
                );

                var wantedMaxSize = 150;
                var rawheight = pickerResult.height;
                var rawwidth = pickerResult.width;
                var ratio = rawwidth / rawheight;
                var wantedwidth = wantedMaxSize;
                var wantedheight = wantedMaxSize / ratio;
                // check vertical or horizontal
                if (rawheight > rawwidth) {
                    wantedwidth = wantedMaxSize * ratio;
                    wantedheight = wantedMaxSize;
                }
                let resizedUri = await new Promise((resolve, reject) => {
                    ImageEditor.cropImage(pickerResult.uri,
                        {
                            offset: { x: 0, y: 0 },
                            size: { width: pickerResult.width, height: pickerResult.height },
                            displaySize: { width: wantedwidth, height: wantedheight },
                            resizeMode: 'contain',
                        },
                        (uri) => resolve(uri),
                        () => reject(),
                    );
                });
                let uploadUrl = await uploadImage(resizedUri);
                this.setState({ avatar: uploadUrl });
                await firebaseSvc.updateAvatar(uploadUrl);
            }
        } catch (err) {
            console.log('onImageUpload error:' + err.message);
            alert('Upload image error:' + err.message);
        }
    };




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
                    source={require("../Images/bg.jpg")}
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
                        <Button
                            title="Upload Avatar Image"
                            style={styles.buttonText}
                            onPress={this.onImageUpload}
                        />


                        <Button title="Press to update user info" onPress={this.handleSubmit}></Button>

                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }
}
