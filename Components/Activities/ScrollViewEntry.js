import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";

function ScrollViewEntry(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.text2Stack}>
        <Text style={styles.text2}>
          John Oskar just rated &quot;Peder&quot; with 5 stars!
        </Text>
       
        <View style={styles.rect2}>
          <View style={styles.icon2Row}>
            <Icon name="clock" style={styles.icon2}></Icon>
            <Text style={styles.oct52020}>Oct 5, 2020</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text2: {
    top: 0,
    left: 0,
    width: 320,
    height: 56,
    color:"rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 16,
    lineHeight: 20
  },
  rect2: {
    left: 0,
    width: 274,
    position: "absolute",
    bottom: 0,
    height: 20,
    flexDirection: "row"
  },
  icon2: {
    color: "grey",
    fontSize: 18
  },
  oct52020: {
    color:"rgba(255,255,255,1)",
    fontSize: 14,
    marginLeft: 17,
    marginTop: 3
  },
  icon2Row: {
    height: 20,
    flexDirection: "row",
    flex: 1,
    marginRight: 25,
    marginLeft: 144
  },
  text2Stack: {
    width: 320,
    height: 72,
    marginTop: 9,
    marginLeft: 22
  }
});

export default ScrollViewEntry;
