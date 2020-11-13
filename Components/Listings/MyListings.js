import * as React from "react";
import { View, FlatList, StyleSheet, ImageBackground, SafeAreaView, Text } from "react-native";
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
    }
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
                source={require("../Login//luke-chesser-3rWagdKBF7U-unsplash.jpg")}
            >

                <View style={{ height: "90%" }}>
                    <HeaderX
                        icon2Family="Feather"
                        icon2Name="search"
                        style={styles.headerX}
                    ></HeaderX>
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
