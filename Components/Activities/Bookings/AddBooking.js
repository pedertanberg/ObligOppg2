//Coming
import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Button,
    ScrollView,
    SafeAreaView,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    TextInput
} from "react-native";
import firebase from "firebase";
import HeaderX from "../Activities/HeaderX";

import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";




export default class AddActivity extends React.Component {
    state = {
        price: "",
        activity: "",
        header: "",
        description: "",
    };

    handlePriceChange = (text) => this.setState({ price: text });

    handleActivityChange = (text) => this.setState({ activity: text });

    handleHeaderChange = (text) => this.setState({ header: text });

    handleDescriptionChange = (text) => this.setState({ description: text });

    handleSave = () => {
        const { price, activity, header, description } = this.state;
        try {
            const reference = firebase
                .database()
                .ref("/activit/")
                .push({ price, activity, header, description });
            Alert.alert(`Saved`);
            this.setState({
                price: "",
                activity: "",
                header: "",
                description: "",
            });
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };

    render() {
        const { price, activity, header, description } = this.state;

        return (
            <View style={styles.root}>
                <HeaderX
                    icon2Family="Feather"
                    icon2Name="search"
                    style={styles.headerX}
                ></HeaderX>
                <View style={styles.root}>
                    <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
                    <View style={styles.background}>
                        <ImageBackground
                            style={styles.rect2}
                            imageStyle={styles.rect2_imageStyle}
                            source={require("../Images/bg.jpg")}
                        >

                            <Text style={styles.text3}>Create Activity</Text>
                            <View style={styles.form}>
                                <View style={styles.nameColumn}>
                                    <View style={styles.name}>
                                        <FontAwesome5
                                            name="dollar-sign"
                                            style={styles.icon5}
                                        ></FontAwesome5>
                                        <TextInput
                                            value={price}
                                            onChangeText={this.handlePriceChange}
                                            placeholder="Price"
                                            placeholderTextColor="rgba(255,255,255,1)"
                                            secureTextEntry={false}
                                            style={styles.nameInput}
                                        ></TextInput>
                                    </View>
                                    <View style={styles.email}>
                                        <FontAwesome5
                                            name="volleyball-ball"
                                            style={styles.icon6}
                                        ></FontAwesome5>
                                        <TextInput
                                            value={activity}
                                            onChangeText={this.handleActivityChange}
                                            placeholder="Category"
                                            placeholderTextColor="rgba(255,255,255,1)"
                                            secureTextEntry={false}
                                            style={styles.emailInput}
                                        ></TextInput>
                                    </View>
                                    <View style={styles.description}>
                                        <EntypoIcon
                                            name="text"
                                            style={styles.icon6}
                                        ></EntypoIcon>
                                        <TextInput
                                            value={description}
                                            onChangeText={this.handleDescriptionChange}
                                            placeholder="Description"
                                            placeholderTextColor="rgba(255,255,255,1)"
                                            secureTextEntry={false}
                                            style={styles.emailInput}
                                        ></TextInput>

                                    </View>
                                    <View style={styles.nameColumnFiller}></View>
                                    <View style={styles.password}>
                                        <FontAwesome5 name="heading" style={styles.icon7}></FontAwesome5>
                                        <TextInput
                                            value={header}
                                            onChangeText={this.handleHeaderChange}
                                            placeholder="Heading"
                                            placeholderTextColor="rgba(255,255,255,1)"
                                            secureTextEntry={false}
                                            style={styles.headerInput}
                                        ></TextInput>
                                    </View>
                                </View>

                                <View style={styles.buttonColumn}>
                                    <TouchableOpacity
                                        onPress={this.handleSave}

                                        //  onPress={() => props.navigation.navigate("Timeline")}
                                        style={styles.button}
                                    >
                                        <Text style={styles.text2}>Continue</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.text4}>Terms &amp; Conditions</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "rgb(255,255,255)"
    },
    background: {
        flex: 1
    },
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
    icon2: {
        color: "rgba(30,174,199,1)",
        fontSize: 40,
        width: 33,
        height: 40
    },
    rect4: {
        width: 50,
        height: 7,
        backgroundColor: "rgba(31,178,204,1)",
        borderRadius: 40,
        marginLeft: 6,
        marginTop: 16
    },
    icon3: {
        color: "#1fb2cc",
        fontSize: 35,
        width: 40,
        height: 36,
        marginLeft: 4,
        marginTop: 4
    },
    rect5: {
        width: 50,
        height: 7,
        backgroundColor: "rgba(230, 230, 230,1)",
        opacity: 0.75,
        borderRadius: 40,
        marginTop: 16
    },
    icon2Row: {
        height: 40,
        flexDirection: "row"
    },
    icon2RowFiller: {
        flex: 1,
        flexDirection: "row"
    },
    icon4: {
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        width: 34,
        height: 40,
        opacity: 0.75
    },
    text3: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        marginTop: 67,
        alignSelf: "center"
    },
    form: {
        height: 230,
        marginTop: 108
    },
    name: {
        height: 59,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 5,
        flexDirection: "row"
    },
    icon5: {
        color: "rgba(255,255,255,1)",
        fontSize: 33,
        width: 33,
        height: 33,
        marginLeft: 15,
        alignSelf: "center"
    },
    nameInput: {
        height: 30,
        color: "rgba(255,255,255,1)",
        fontSize: 14,
        flex: 1,
        marginRight: 17,
        marginLeft: 13,
        marginTop: 14
    },
    email: {
        height: 59,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 5,
        flexDirection: "row",
        marginTop: 27
    },

    description: {
        height: 59,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 5,
        flexDirection: "row",
        marginTop: 27
    },
    icon6: {
        color: "rgba(255,255,255,1)",
        fontSize: 33,
        marginLeft: 15,
        alignSelf: "center"
    },
    emailInput: {
        height: 30,
        color: "rgba(255,255,255,1)",
        flex: 1,
        marginRight: 17,
        marginLeft: 13,
        marginTop: 14
    },
    nameColumn: {},
    nameColumnFiller: {
        flex: 1
    },
    password: {
        height: 59,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 5,
        flexDirection: "row",
        top: "6%"
    },
    icon7: {
        color: "rgba(255,255,255,1)",
        fontSize: 33,
        marginLeft: 15,
        marginTop: 13
    },
    passwordInput: {
        height: 30,
        color: "rgba(255,255,255,1)",
        flex: 1,
        marginRight: 17,
        marginLeft: 13,
        marginTop: 14
    },

    headerInput: {
        height: 30,
        color: "rgba(255,255,255,1)",
        flex: 1,
        marginRight: 17,
        marginLeft: 13,
        marginTop: 18
    },
    progressBarColumn: {
        marginTop: 53,
        marginLeft: 41,
        marginRight: 41
    },
    progressBarColumnFiller: {
        flex: 1
    },
    button: {
        height: 55,
        backgroundColor: "rgba(247,247,247,0)",
        borderRadius: 5,
        borderColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        justifyContent: "center",
        marginBottom: 200
    },
    text2: {
        width: 66,
        color: "rgba(255,255,255,1)",
        alignSelf: "center",
        top: "0%"
    },
    text4: {
        color: "rgba(255,255,255,0.5)",
        alignSelf: "center"
    },
    buttonColumn: {
        bottom: "-25%",
        marginLeft: 41,
        marginRight: 41
    }
});

