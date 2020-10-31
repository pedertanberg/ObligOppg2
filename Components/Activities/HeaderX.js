import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import FeatherIcon from "react-native-vector-icons/Feather";

function HeaderX(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.group}>
        <View style={styles.iconRow}>
          <MaterialIconsIcon
            name="dehaze"
            style={styles.icon}
          ></MaterialIconsIcon>
          <Text style={styles.iRate}>ActivIT</Text>
        </View>
        <View style={styles.iconRowFiller}></View>
        <TouchableOpacity /* Conditional navigation not supported at the moment */
          onPress={() => console.log("Navigate to Settings")}
          style={styles.button}
        >
          <FeatherIcon
            name={props.icon2Name || "settings"}

            style={styles.icon2}
          ></FeatherIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#21164e"
  },
  group: {
    height: 55,
    backgroundColor: "#21164e",
    flexDirection: "row",
    marginTop: 25
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    width: 18,
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

export default HeaderX;
