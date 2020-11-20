import firebase from "firebase";
import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import ActivityList from "./Components/Activities/ActivityList";
import AddActivity from "./Components/Activities/AddActivity";
import ActivityDetails from "./Components/Activities/ActivityDetails";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import EditActivity from "./Components/Activities/EditActivity";
import ProfileScreen from "./Components/ProfileScreen";
import Profile from "./Components/ProfileScreen";
import Timeline from "./Components/Activities/Timeline";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import CalendarScreen from "./Components/Modal/Calendar";
import HomePage from "./Components/HomePage";
import SellerProfile from "./Components/SellerProfile"
import MyReservations from "./Components/MyReservations";
import MyReservationsDetails from "./Components/MyReservationDetails";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EditReservation from "./Components/EditReservation";
import MyListings from "./Components/Listings/MyListings";
import MyListingDetails from "./Components/Listings/MyListingDetails";
import EditListing from "./Components/Listings/EditListing";
import EditProfile from "./Components/EditProfile";
import Chat from "./Components/chat/Chat";


const StackNavigator = createStackNavigator(
  {
    ActivityList: { screen: ActivityList },
    ActivityDetails: { screen: ActivityDetails },
    EditActivity: { screen: EditActivity },
    EditReservation: { screen: EditReservation },
    ProfileScreen: { screen: Profile },
    SellerProfile: { screen: SellerProfile },
    MyReservationsDetails: { screen: MyReservationsDetails },
    MyReservations: { screen: MyReservations },
    MyListingDetails: { screen: MyListingDetails },
    MyListings: { screen: MyListings },
    EditListing: { screen: EditListing },
    CalendarScreen: { screen: CalendarScreen },
    EditProfile: { screen: EditProfile },
    AddActivity: { screen: AddActivity },


  },
  { initialRouteKey: "Activity List" }
);

const MyDrawerNavigator = createDrawerNavigator({
  Main: {
    screen: StackNavigator,
    navigationOptions: {
      title: "Explore Activities",
      drawerIcon: () => (
        <IoniconsIcon
          name="ios-search"
          style={styles.icon2}
        ></IoniconsIcon>
      )
    }
  },

  AddActivity: {
    screen: AddActivity,
    navigationOptions: {
      title: "Add new activity",
      drawerIcon: () => (
        <IoniconsIcon
          name="ios-add"
          style={styles.icon2}
        ></IoniconsIcon>
      )
    }
  },
  MyReservations: {
    screen: MyReservations,
    navigationOptions: {
      title: "Handle your bookings",
      drawerIcon: () => (
        <IoniconsIcon
          name="md-albums"
          style={styles.icon2}
        ></IoniconsIcon>
      )
    }
  },
  MyListings: {
    screen: MyReservations,
    navigationOptions: {
      title: "Handle your listings",
      drawerIcon: () => (
        <IoniconsIcon
          name="md-albums"
          style={styles.icon2}
        ></IoniconsIcon>
      )
    }
  },

  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      title: "See your profile",
      drawerIcon: () => (
        <IoniconsIcon
          name="md-albums"
          style={styles.icon2}
        ></IoniconsIcon>
      )
    }
  },

  Chat: {
    screen: Chat,
    navigationOptions: {
      title: "Chat",
      drawerIcon: () => (
        <IoniconsIcon
          name="md-albums"
          style={styles.icon2}
        ></IoniconsIcon>
      )
    }
  },






})
const AppNav = createAppContainer(MyDrawerNavigator);






export default class App extends React.Component {
  UNSAFE_componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyC2F7jUn4RoL-jP9PFQ6te12Q7_cJj5nic",
      authDomain: "acitivit.firebaseapp.com",
      databaseURL: "https://acitivit.firebaseio.com",
      projectId: "acitivit",
      storageBucket: "acitivit.appspot.com",
      messagingSenderId: "738053182099",
      appId: "1:738053182099:web:d9bbf6187799905b927366",
      measurementId: "G-7P2KPG2KV6",
    };

    // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
    // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }


  signOut = () => {
    return (dispatch, getState) => {
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'Signout Success' })
      })
    }
  }

  render() {
    return (<AppNav />)



  }

}
const styles = StyleSheet.create({

  icon2: {
    color: "rgba(31,178,204,1)",
    fontSize: 30,
    alignSelf: "flex-end",


  },

});