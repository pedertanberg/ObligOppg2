import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ImageBackground,
  Text,
  ScrollView
} from "react-native";
import HeaderX from "../Activities/HeaderX";
import ScrollViewEntry from "./ScrollViewEntry";

function Timeline(props) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <HeaderX button="Settings" style={styles.headerX}></HeaderX>
      <ImageBackground
      style={styles.rect2}
      imageStyle={styles.rect2_imageStyle}
      source={require("../Login//luke-chesser-3rWagdKBF7U-unsplash.jpg")}
    >
      <View style={styles.body}>
        <View style={styles.headline}>
          <ImageBackground
            source={require("./Images/fly.jpg")}
            resizeMode="contain"
            style={styles.image2}
            imageStyle={styles.image2_imageStyle}
          >
            <View style={styles.overlay}>
              <View style={styles.actionStack}>
                <Text style={styles.action}>Action</Text>
                <Text style={styles.loremIpsum}></Text>
              </View>
              <View style={styles.following}>
                <Text style={styles.text}>Following</Text>
              </View>
              <Text style={styles.followers}>777K Followers</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.scrollArea}>
          <ScrollView
            horizontal={false}
            contentContainerStyle={styles.scrollArea_contentContainerStyle}
          >
      
            <ScrollViewEntry style={styles.scrollViewEntry}></ScrollViewEntry>
            <ScrollViewEntry style={styles.scrollViewEntry4}></ScrollViewEntry>
            <ScrollViewEntry style={styles.scrollViewEntry2}></ScrollViewEntry>
            <ScrollViewEntry style={styles.scrollViewEntry3}></ScrollViewEntry>
          
          </ScrollView>

        </View>
      </View>
      </ImageBackground>
    </View>
  );
}

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
  
  root: {
    flex: 1,
 
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
  body: {
    flex: 1
  },
  headline: {
    height: 246,
    overflow: "hidden"
  },
  image2: {
    width: 450,
    height: 316,
    marginTop: -30,
    marginLeft: -17
    },
  image2_imageStyle: {},
  overlay: {
    backgroundColor: "rgba(30,26,26,0.4)",
    flex: 1,
    marginBottom: 40,
    marginTop: 30,
    marginLeft: 7
  },
  action: {
    top: 0,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 24,
    left: 40
  },
  loremIpsum: {
    top: 16,
    left: 33,
    position: "absolute",
    
    color: "#121212"
  },
  actionStack: {
    width: 74,
    height: 32,
    marginTop: 48,
    marginLeft: 147
  },
  following: {
    width: 90,
    height: 40,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 23,
    alignSelf: "center"
  },
  text: {
    color: "rgba(31,178,204,1)",
    fontSize: 14,
    alignSelf: "center"
  },
  followers: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    marginTop: 39,
    alignSelf: "center"
  },
  scrollArea: {
    height: 413
  },
  scrollArea_contentContainerStyle: {
    height: 413
  },
  scrollViewEntry: {
    height: 100,
    
  },
  scrollViewEntry4: {
    width: 360,
    height: 100
  },
  scrollViewEntry2: {
    width: 360,
    height: 100
  },
  scrollViewEntry3: {
    width: 360,
    height: 100
  }
});

export default Timeline;
