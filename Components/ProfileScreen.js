import React, { Component } from "react";
import { StyleSheet, View, Text, Switch, Image } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import HeaderX from "../Components/Activities/HeaderX";

function Index(props) {
  return (

    <View style={styles.container}>
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
            <Text style={styles.expanded}>Account Settings</Text>
            <View style={styles.subSettings}>
              <View style={styles.editProfileColumn}>
                <View style={styles.editProfile}>
                  <Text style={styles.text10}>Edit Profile</Text>
                  <IoniconsIcon
                    name="ios-arrow-forward"
                    style={styles.icon}
                  ></IoniconsIcon>
                </View>
                <View style={styles.changeConnections}>
                  <Text style={styles.text11}>
                    See who you&#39;re following
                  </Text>
                  <IoniconsIcon
                    name="ios-arrow-forward"
                    style={styles.icon2}
                  ></IoniconsIcon>
                </View>
              </View>
              <View style={styles.editProfileColumnFiller}></View>
              <View style={styles.providerSettings}>
                <Text style={styles.text12}>Edit provider settings</Text>
                <IoniconsIcon
                  name="ios-arrow-forward"
                  style={styles.icon3}
                ></IoniconsIcon>
              </View>
            </View>
          </View>
          <View style={styles.sub2}>
            <View style={styles.notificationsColumn}>
              <View style={styles.notifications}>
                <Switch
                  value={true}
                  trackColor={{ true: "rgba(230, 230, 230,1)" }}
                  thumbColor="rgba(31,178,204,1)"
                  style={styles.switch3}
                ></Switch>
                <Text style={styles.text7}>Notifications</Text>
              </View>
              <View style={styles.backup}>
                <Switch
                  value={false}
                  trackColor={{
                    true: "#1fb2cc",
                    false: "rgba(230, 230, 230,1)"
                  }}
                  style={styles.switch2}
                ></Switch>
                <Text style={styles.text72}>Backup</Text>
              </View>
            </View>
            <View style={styles.notificationsColumnFiller}></View>
            <View style={styles.sponsored}>
              <Switch
                value={false}
                trackColor={{
                  true: "rgba(230, 230, 230,1)",
                  false: "rgba(230, 230, 230,1)"
                }}
                style={styles.switch4}
              ></Switch>
              <Text style={styles.text73}>Sponsored Messages</Text>
            </View>
          </View>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.imageRow}>
            <Image
              source={require("../assets/3963944641_b623e00f45_o.jpg")}
              resizeMode="contain"
              style={styles.image}
            ></Image>
            <Text style={styles.userEmail}>peder@gmail.com</Text>
            <Text style={styles.userName}>Peder Tanberg</Text>
          </View>
        </View>
      </View>
      <Text style={styles.pageName}>SETTINGS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#21164e",
    width: 420,
    height: 660
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
    width: 859,
    height: 890,
    position: "absolute"
  },
  settingsList: {
    left: 51,
    height: 409,
    position: "absolute",
    right: 450,
    bottom: 272
  },
  accountSettings: {
    height: 165,
    marginTop: 15,
    marginLeft: 24,
    marginRight: 24
  },
  expanded: {
    color: "#121212",
    fontSize: 18,
    marginTop: -3
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
    marginTop: -6
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
  editProfileColumn: {
    marginLeft: 10,
    marginRight: 10
  },
  editProfileColumnFiller: {
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
    width: 50,
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
    width: 30,
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
    width: 80,
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
    width: 133,
    height: 118
  },
  userEmail: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginLeft: 43,
    marginTop: 97
  },
  userName: {
    color: "#1fb2cc",
    fontSize: 28,
    marginTop: 22,
    right: "110%"
  },
  imageRow: {
    height: 118,
    flexDirection: "row",
    flex: 1,
    marginRight: 158,
    marginLeft: -14,
    marginTop: -9
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
