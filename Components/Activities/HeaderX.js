import React, { Component } from "react";
import firebase from "firebase";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { DrawerActions } from 'react-navigation-drawer';


export default class HeaderX extends React.Component {

  constructor(props) {
    super(props);

    this.state = ({

    });
  }
  render() {


    return (
      <View style={[styles.container]}>
        <View style={styles.group}>
          <View style={styles.iconRow}>
            <FeatherIcon
              name="plus"
              style={styles.icon}
              onPress={() => this.props.navigation.navigate("AddActivity")}

            ></FeatherIcon>
            <Text style={styles.iRate}>ActivIT</Text>
          </View>
          <View style={styles.iconRowFiller}></View>

          <FeatherIcon
            name="log-out"
            style={styles.icon}
            onPress={() =>

              firebase
                .auth()
                .signOut()
                .then(() => {
                  this.props.navigation.navigate("ProfileScreen");
                })
                .catch(function (error) {
                  // An error happened.
                })
            }

          ></FeatherIcon>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000"
  },
  group: {
    height: 55,
    backgroundColor: "#000",
    flexDirection: "row",
    marginTop: 25
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    width: 30,
    height: 25,
    marginTop: 15
  },
  iRate: {

    color: "rgba(255,255,255,1)",
    height: 48,
    width: 165,
    fontSize: 30,
    marginLeft: 109
  },
  iconRow: {
    height: 48,
    flexDirection: "row",
    marginLeft: 10
  },
  iconRowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  button: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginTop: 15
  },
  icon2: {
    color: "rgba(250,250,250,1)",
    fontSize: 25
  }
});

