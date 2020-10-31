import * as React from "react";
import { View, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Text } from "react-native";
import firebase from "firebase";
import HeaderX from "./Activities/HeaderX";
import MyReservationsItem from "./MyListingsItem";

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
    text: {
        color: 'white',
        alignSelf: "center",



    }
})

export default class MyReservations extends React.Component {
    state = {
        activities: {},
    };

    //Setter opp ref mot database og verdi der skal hentes.
    componentDidMount() {
        firebase
            .database()
            .ref("/booking")
            .on("value", (snapshot) => {
                this.setState({ activities: snapshot.val() });
            });
    }
    //Setter riktig navigation hvis brukeren klikker på den spesifikke aktivitet.
    // Den vil da ta med ID og hente spesfikt element i databasen.
    handleSelectActivity = (id) => {
        this.props.navigation.navigate("MyReservationsDetails", { id });
    };

    render() {
        const { activities } = this.state;
        // Vi viser ingenting hvis der ikke er data
        if (!activities) {
            return null;
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
                source={require("./Login/luke-chesser-3rWagdKBF7U-unsplash.jpg")}
            >

                <View>
                    <HeaderX
                        icon2Family="Feather"
                        icon2Name="search"
                        style={styles.headerX}
                    ></HeaderX>
                    <View>
                        <View>
                            <Text style={styles.text}>Your Reservations</Text>
                        </View>
                    </View>
                    <FlatList
                        data={ActivityArray}
                        // Vi bruger ActivityKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til ActivityListItem
                        keyExtractor={(item, index) => ActivityKeys[index]}
                        renderItem={({ item, index }) => (
                            <MyReservationsItem
                                activity={item}
                                id={ActivityKeys[index]}
                                onSelect={this.handleSelectActivity}
                            />
                        )}
                    />
                    <View>
                        <View>
                            <Text style={styles.text}>Reservation you are hosting</Text>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={ActivityArray}
                    // Vi bruger ActivityKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til ActivityListItem
                    keyExtractor={(item, index) => ActivityKeys[index]}
                    renderItem={({ item, index }) => (
                        <MyReservationsItem
                            activity={item}
                            id={ActivityKeys[index]}
                            onSelect={this.handleSelectActivity}
                        />
                    )}
                />

            </ImageBackground>
        );
    }

}


