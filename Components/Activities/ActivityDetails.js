
import React, { useState, Fragment } from 'react';
import { View, Text, Platform, ImageBackground, TouchableHighlight, TextInput, Modal, Image, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import HeaderX from "./HeaderX";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SellerProfile from "../Profiles/SellerProfile";
import { ScrollView } from 'react-native-gesture-handler';
import Calendar from "../Modal/Calendar";


YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};
const styles = StyleSheet.create({
    rect2: {
        flex: 1
    },
    calendar: {
        marginBottom: 10,
        backgroundColor: "#000"
      },
      text: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#000',
        color: "#fff",
        fontSize: 16,
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
        borderColor:"#fff",
        marginTop:15

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



export default class ActivityDetails extends React.Component {

    state = {
        activity: null,
        modalVisible: false,
        tid: "",
        seller: "",
        kunde: firebase.auth().currentUser.email,
        activity: "",
        timeofCourse: "",
        location: "",
        image: "https://i.imgur.com/DG8iV3O.jpg",
        rating: ""
        
        
    };

    componentDidMount() {
        // Vi udlæser ID fra navgation parametre og loader bilen når komponenten starter
        const id = this.props.navigation.getParam('id');
        this.LoadActivity(id);
     
        
    }


    LoadActivity = id => {
        firebase
            .database()
            // ID fra funktionens argument sættes ind i stien vi læser fra
            .ref('/activit/' + id)
            .on('value', asds => {
                this.setState({ activity: asds.val() });
            });
    };


    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    handleEdit = () => {
        // Vi navigerer videre til EditActivity skærmen og sender ID med
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        navigation.navigate('EditActivity', { id });
    };

    confirmDelete = () => {
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            Alert.alert('Are you sure?', 'Do you want to delete the Activity?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: this.handleDelete },
            ]);
        } else {
            if (confirm('Er du sikker på du vil slette denne aktivitet?')) {
                this.handleDelete()
            }
        }
    };

    // Vi spørger brugeren om han er sikker

    // Vi sletter den aktuelle aktivitet
    handleDelete = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('id');

        try {
            firebase
                .database()
                // Vi sætter bilens ID ind i stien
                .ref(`/activit/${id}`)
                // Og fjerner data fra den sti
                .remove();
            // Og går tilbage når det er udført
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }

    };



    handleAddBooking = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        const { tid, seller, kunde, activity, image, timeofCourse, location, rating } = this.state;

        try {
            firebase
                .database()
                //Oppretter connection til database
                .ref(`/booking`)
                // Og legger til de parametre fra bookingen
                .push({ tid, seller, kunde, id, activity, image, timeofCourse, location, rating });
            Alert.alert(`Booking confirmed`);
            // Og går tilbage når det er udført
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }

    };

    handleDateChange = (text) => this.setState({ tid: text });

    render() {
        const { activity, tid } = this.state;
        const { modalVisible } = this.state;
      

        if (!activity) {
            return <Text>No data</Text>;
        }
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
                    <ScrollView>

                        <View style={styles.row}>
                            <Image source={{ uri: activity.image }} style={styles.photo} />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Price</Text>
                            <Text style={styles.value}>{activity.price}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Activity</Text>
                            <Text style={styles.value}>{activity.activity}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Hours</Text>
                            <Text style={styles.value}>{activity.timeofCourse}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Location</Text>
                            <Text style={styles.value}>{activity.location}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Header</Text>
                            <Text style={styles.value}>{activity.header}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Description</Text>
                            <Text style={styles.value}>{activity.description}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Seller</Text>
                            <Text style={styles.value}>{activity.seller}</Text>
                        </View>
                        <View style={styles.row}>
                            <Calendar></Calendar>
                        </View>
                        <View style={styles.city}>
                            <FontAwesome5
                                name="calendar"
                                style={styles.icon6}
                            ></FontAwesome5>
                            <TextInput
                                value={tid}
                                onChangeText={this.handleDateChange}
                                placeholder="Date: DD-MM-YYYY"
                                placeholderTextColor="rgba(255,255,255,1)"
                                secureTextEntry={false}
                                style={styles.emailInput}
                            ></TextInput>

                        </View>
                        <Button title="Book" color="#fff" onPress={this.handleAddBooking} style={styles.button} />
                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <SellerProfile />

                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                            onPress={() => {
                                                this.setModalVisible(!modalVisible);
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Hide Seller Profile</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>

                            <TouchableHighlight
                                style={styles.openButton}
                                onPress={() => {
                                    this.setModalVisible(true);
                                }}
                            >
                                <Text style={styles.textStyle}>Show Seller Profile</Text>
                            </TouchableHighlight>
                        </View>



                    </ScrollView>

                </ImageBackground>
            </View>
        );
    }
}
