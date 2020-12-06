import React, { Component } from "react";
import { StyleSheet, View, Text, Switch, Image, SafeAreaView, ScrollView } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import HeaderX from "../Activities/HeaderX";
import { Avatar, Accessory, ListItem, Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native-gesture-handler";

function Index(props) {
  return (



    <ScrollView style={styles.container}>
      <SafeAreaView>

        <HeaderX
          icon2Family="Feather"
          icon2Name="search"
          style={styles.headerX}
        ></HeaderX>
        <View style={styles.ellipseStack}>
          <Svg viewBox="0 0 859.43 890.3" style={styles.ellipse}>
            <Ellipse
              strokeWidth={1}
              fill="rgba(255,255,255,1)"
              cx={430}
              cy={445}
              rx={429}
              ry={445}
            ></Ellipse>
          </Svg>





          <View style={styles.settingsList}>
            <View style={styles.accountSettings}>
              <Text style={styles.expanded}>Seller profile{'\n'}
              </Text>
              <Text style={styles.userTitle}>Sports and Music</Text>
              <Text style={styles.userBio}>Hey, my name is John Skjeldrum, and i hope you are ready for my courses </Text>
              <View style={styles.subSettings}>
                <TouchableOpacity>
              <Button 
              icon={
                <Icon2
                  name="comment"
                  size={15}
                  color="white"
                />
              }
            title="Chat"  
            type="outline"  
            onPress={() => this.props.navigation.navigate("Chat")} 
            style={styles.button} />
            </TouchableOpacity>

               
              </View>
            </View>
            <View style={styles.sub2}>
              <View style={styles.notificationsColumn}>


              </View>
              <View style={styles.notificationsColumnFiller}></View>

            </View>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.imageRow}>
              <Avatar
                size="xlarge"
                rounded
                source={{
                  uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Fmix-color-4%2F502%2FUntitled-1-512.png&f=1&nofb=1'
                }}
              />

            </View>
          </View>

        </View>
        <Text style={styles.pageName}>John Skjeldrum</Text>
      </SafeAreaView>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#21164e",
    width: '100%',
    height: '100%'
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
  ellipse: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: "absolute"
  },
  settingsList: {
    left: 51,
    height: 409,
    position: "absolute",
    right: 450,
    bottom: 272,
    marginTop: '30%'
  },
  accountSettings: {
    height: 165,
    marginTop: '10%',
    marginLeft: '10%',
    marginRight: 24
  },
  expanded: {
    color: "#121212",
    fontSize: 18,
    marginTop: -3,
    marginBottom: "5%"
  },
  subSettings: {
    height: 118,
    marginTop: 33
  },
  editProfile: {
    height: 30
  },
  text10: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 6
  },
  icon: {
    color: "rgba(31,178,204,1)",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -8
  },
  changeConnections: {
    height: 30,
    marginTop: 11
  },
  text11: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 6
  },
  icon2: {
    color: "rgba(31,178,204,1)",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -6
  },
  sellerProfileColumns: {
    marginLeft: 10,
    marginRight: '10%'
  },
  sellerProfileColumnFiller: {
    flex: 1
  },
  providerSettings: {
    height: 30,
    marginLeft: 10,
    marginRight: 10
  },
  text12: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 6
  },
  icon3: {
    color: "#1fb2cc",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -6
  },
  sub2: {
    height: 186,
    marginTop: 18,
    marginLeft: 29,
    marginRight: 29
  },
  notifications: {
    height: 27,
    alignSelf: "center"
  },
  switch3: {
    width: '100%',
    alignSelf: "flex-end"
  },
  text7: {
    color: "#121212",
    fontSize: 18,
    top: "-100%",
    left: "-20%"
  },
  backup: {
    height: 27,
    alignSelf: "center",
    marginTop: 53
  },
  switch2: {
    width: '30%',
    alignSelf: "flex-end",
    marginRight: -2
  },
  text72: {
    color: "#121212",
    fontSize: 18,
    top: "-100%",
    left: "-20%"
  },
  notificationsColumn: {},
  notificationsColumnFiller: {
    flex: 1
  },
  sponsored: {
    height: 27,
    alignSelf: "center",

  },
  switch4: {
    width: '80%',
    alignSelf: "flex-end"
  },
  text73: {
    color: "#121212",
    fontSize: 18,
    top: "-100%",
    left: "-25%"
  },
  userInfo: {
    top: 55,
    left: 87,
    height: 125,
    position: "absolute",
    right: 452,
    flexDirection: "row"
  },
  image: {
    width: '100%',
    height: '100%',

  },
  userBio: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginLeft: '10%',
    marginTop: 50,
    marginRight: '10%',
  },
  userTitle: {
    color: "#1fb2cc",
    fontSize: 24,
    marginTop: '20%',
    right: "0%"
  },
  imageRow: {
    height: 118,
    flexDirection: "column",
    flex: 2,
    marginRight: '10%',
    marginLeft: '-10%',
    marginTop: '-5%',
    marginBottom: '5%'
  },
  ellipseStack: {
    height: 890,
    marginTop: 43,
    marginLeft: -50,
    marginRight: -450
  },
  pageName: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginTop: -899,
    marginLeft: 35
  }
});

export default Index;