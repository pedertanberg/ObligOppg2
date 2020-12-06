import * as React from "react";
import { View, FlatList, StyleSheet, ImageBackground, SafeAreaView, Text, TouchableOpacity} from "react-native";
import firebase from "firebase";
import HeaderX from "../Activities/HeaderX";

import MyListingsItem from "./MyListingsItem";
import { ScrollView } from "react-native-gesture-handler";

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
    card: {
    },

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
    tabs: {
        height: 80,
        backgroundColor: "rgba(0,0,0,0)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        elevation: 0,
        shadowOffset: {
          height: 0,
          width: 0
        },
        shadowColor: "rgba(0,0,0,1)",
        shadowRadius: 0
      },
      following: {
        width: 100,
        height: 38,
        backgroundColor: "rgba(247,247,247,0)",
        alignSelf: "center",
        justifyContent:"center"
        
      },
      text: {
        color: "rgba(255,255,255,1)",
        alignSelf: "center"
      },
      popular: {
        width: 140,
        height: 38,
        backgroundColor: "rgba(247,247,247,0)",
        alignSelf: "center",
        borderRadius: 100
      },
      friends: {
        color: "rgba(255,255,255,1)",
        marginTop: 9,
        marginLeft: 26,
        
      },
      button: {
        width: 100,
        height: 38,
        backgroundColor: "rgba(247,247,247,0)",
        alignSelf: "center",
        borderRadius: 100,
        justifyContent: "center",
        borderRadius: 5,
        borderColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        justifyContent: "center"
      },
      text3: {
        color: "rgba(255,255,255,1)",
        alignSelf: "center"
      },
})

export default class ActivityList extends React.Component {
    state = {
        activities: {},
    };

    //.orderByChild("price").equalTo("200")

    //Setter opp ref mot database og verdi der skal hentes. 
    componentDidMount() {
        firebase
            .database()
            .ref("/activit").orderByChild("seller").equalTo(firebase.auth().currentUser.email,)
            .on("value", (snapshot) => {
                this.setState({ activities: snapshot.val() });
            });
    }
    //Setter riktig navigation hvis brukeren klikker på den spesifikke aktivitet. 
    // Den vil da ta med ID og hente spesfikt element i databasen. 
    handleSelectActivity = (id) => {
        this.props.navigation.navigate("MyListingDetails", { id });
    };
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 3,
                    width: "100%",
                    backgroundColor: "#CED0CE",

                }}
            />
        );
    };

    render() {
        const { activities } = this.state;
        // Vi viser ingenting hvis der ikke er data
        if (!activities) {
            return <Text>You have no listings. Please go to "Add New Activity" from the menu, to add one. </Text>;
        }
        // Flatlist forventer et array. Derfor tar vi alle values fra vårt activity objekt, og bruke som array til listen
        const ActivityArray = Object.values(activities);
        // Vi skal også bruke alle IDer, så vi tar alle keys også.
        const ActivityKeys = Object.keys(activities);
        return (

            //Setter gradient bildet fra Login mappen og bruker som bakgrunnsbildet med styling. 
            <ImageBackground
                style={styles.rect2}
                imageStyle={styles.rect2_imageStyle}
                source={require("../Images/bg.jpg")}
            >

                <View style={{ height: "80%" }}>
                    <HeaderX
                        icon2Family="Feather"
                        icon2Name="search"
                        style={styles.headerX}
                    ></HeaderX>
                    <View style={styles.tabs}>
                        <TouchableOpacity style={styles.following}>
                        <Text style={styles.text} onPress={() => this.props.navigation.navigate("ActivityList")} >Activity List</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.popular}>
                        <Text style={styles.friends} onPress={() => this.props.navigation.navigate("MyReservations")} >My Reservations</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                        <Text style={styles.text3} onPress={() => this.props.navigation.navigate("MyListings")}>My Listings</Text>
                        </TouchableOpacity>
                    </View>
                    <SafeAreaView>
                        <FlatList style={styles.card}
                            data={ActivityArray}
                            // Vi bruger ActivityKeys til at finde ID på den aktuelle aktivitet og returnerer dette som key, og giver det med som ID til MyListingsItem
                            keyExtractor={(item, index) => ActivityKeys[index]}
                            ItemSeparatorComponent={this.renderSeparator}
                            renderItem={({ item, index }) => (
                                <MyListingsItem
                                    activity={item}
                                    id={ActivityKeys[index]}
                                    onSelect={this.handleSelectActivity}
                                    style={styles.card}
                                />


                            )}
                        />
                    </SafeAreaView>
                </View>

            </ImageBackground>
        );
    }
}
