import * as React from 'react';
import { View, Text, Platform, Image, ImageBackground, TouchableHighlight, FlatList, Linking, StyleSheet, Modal, Alert } from 'react-native';
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import HeaderX from "../Activities/HeaderX";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { ScrollView } from 'react-native-gesture-handler';
import SellerProfile from "../Profiles/SellerProfile";
import { SocialIcon } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
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
  button: {
    padding:15,
  },
  container: { flex: 1, justifyContent: 'flex-start', backgroundColor: "rgb(27,29,37)" },
  row: {
    margin: 6,
    padding: 5,
    flexDirection: 'row',
  },
  label: { width: 100, fontWeight: 'bold', color: "white", fontSize: 15 },
  value: { flex: 1, color: "white" },
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
  icon2: {
    color: "rgba(31,178,204,1)",
    fontSize: 30,
    alignSelf: "flex-end",
    marginTop: -15,
    padding: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  photo: {
    flex: 1,
    width: "100%",
    height: 180
  },
 
});

export default class MyReservationsDetails extends React.Component {
  state = { activity: null, modalVisible: false, postContent: "Sjekk ut mitt nyeste kjøp, gjort på activit", facebookShareURL: "https://i.imgur.com/DG8iV3O.jpg" };

  componentDidMount() {
    // Vi udlæser ID fra navgation parametre og loader bilen når komponenten starter
    const id = this.props.navigation.getParam('id');
    this.LoadActivity(id);
    this.LoadBooking(id);


  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  LoadBooking = id => {
    firebase
      .database()
      // ID fra funktionens argument sættes ind i stien vi læser fra
      .ref('/booking/' + id)
      .on('value', asds => {
        this.setState({ booking: asds.val() });
      });
  };
  LoadActivity = id => {
    firebase
      .database()
      // ID fra funktionens argument sættes ind i stien vi læser fra
      .ref('/booking/' + id + '/activity')
      .on('value', asds => {
        this.setState({ activity: asds.val() });
      });
  };

  handleEdit = () => {
    // Vi navigerer videre til EditActivity skærmen og sender ID med
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    navigation.navigate('EditReservation', { id });
  };

  confirmDelete = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Alert.alert('Are you sure?', 'Do you want to delete the Activity?', [
        { text: 'Cancel', style: 'cancel' },
        // Vi bruger this.handleDelete som eventHandler til onPress
        { text: 'Delete', style: 'destructive', onPress: this.handleDelete },
      ]);
    } else {
      if (confirm('Er du sikker på du vil slette denne aktivitet?')) {
        this.handleDelete1();
        this.handleDelete2();
      }
    }
  };

  // Vi spørger brugeren om han er sikker

  // Vi sletter den aktuelle bil
  handleDelete1 = () => {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    try {
      firebase
        .database()
        // Vi sætter aktivitetens ID ind i stien
        .ref(`/booking/${id}`)
        // Og fjerner data fra den sti
        .remove();
      // Og går tilbage når det er udført
      navigation.goBack();
    } catch (error) {
      Alert.alert(error.message);
    }

  };
  handleDelete2 = () => {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    try {
      firebase
        .database()
        // Vi sætter aktivitetens ID ind i stien
        .ref(`/booking/${id}/activity`)
        // Og fjerner data fra den sti
        .remove();
      // Og går tilbage når det er udført
      navigation.goBack();
    } catch (error) {
      Alert.alert(error.message);
    }

  };

  deleteAll() {
    this.handleDelete1();
    this.handleDelete2();
  }

  postOnFacebook = () => {
    let facebookParameters = [this.state.activity];
    if (this.state.facebookShareURL)
      facebookParameters.push('u=' + encodeURI(this.state.facebookShareURL));
    if (this.state.postContent)
      facebookParameters.push('quote=' + encodeURI(this.state.postContent));
    const url =
      'https://www.facebook.com/sharer/sharer.php?'
      + facebookParameters.join('&');

    Linking.openURL(url)
      .then((data) => {
        alert('Facebook Opened');
      })
      .catch(() => {
        alert('Something went wrong');
      });
  };

  render() {
    const { activity } = this.state;
    const { booking } = this.state;
    const { modalVisible } = this.state;


    if (!booking) {
      return <Text>No data</Text>;
    }
    return (
      <View style={styles.container}>
        <HeaderX
          icon2Family="Feather"
          icon2Name="search"
          style={styles.headerX}
        ></HeaderX>
        <ImageBackground
          style={styles.rect2}
          imageStyle={styles.rect2_imageStyle}
          source={require("../Images/bg.jpg")}
        >
          <ScrollView>
            <View style={styles.row}>
              <Image source={{ uri: activity.image }} style={styles.photo} />
            </View>
            <View style={styles.row}>
              <IoniconsIcon
                name="ios-eye"
                style={styles.icon2}
              ></IoniconsIcon>
              <Text style={styles.label}>Aktivitens ID</Text>
              <Text style={styles.value}>{booking.id}</Text>
            </View>
            <View style={styles.row}>
              <IoniconsIcon
                name="ios-person"
                style={styles.icon2}
              ></IoniconsIcon>
              <Text style={styles.label}>Kunde</Text>
              <Text style={styles.value}>{booking.kunde}</Text>
            </View>
            <View style={styles.row}>
              <IoniconsIcon
                name="ios-person"
                style={styles.icon2}
              ></IoniconsIcon>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>{booking.timeofCourse} hours</Text>
            </View>
            <View style={styles.row}>
              <IoniconsIcon
                name="ios-person"
                style={styles.icon2}
              ></IoniconsIcon>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.value}>{booking.location}</Text>
            </View>
            <View style={styles.row}>
              <IoniconsIcon
                name="md-person"
                style={styles.icon2}
              ></IoniconsIcon>
              <Text style={styles.label}>Selger</Text>
              <Text style={styles.value}>{activity.seller}</Text>
            </View>
            <View style={styles.row}>
              <IoniconsIcon
                name="md-calendar"
                style={styles.icon2}
              ></IoniconsIcon>
              <Text style={styles.label}>Tid</Text>
              <Text style={styles.value}>{booking.tid}</Text>
            </View>

            <View style={styles.row}>
              <IoniconsIcon
                name="ios-tennisball"
                style={styles.icon2}
              ></IoniconsIcon>
              <Text style={styles.label}>Aktivitet</Text>
              <Text style={styles.value}>{activity.activity}</Text>
            </View>
            <View style={styles.row}>
              <IoniconsIcon
                name="md-text"
                style={styles.icon2}
              ></IoniconsIcon>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.value}>{activity.description}</Text>
            </View>
            <View style={styles.row}>
              <IoniconsIcon
                name="ios-card"
                style={styles.icon2}
              ></IoniconsIcon>

              <Text style={styles.label}>Price</Text>
              <Text style={styles.value}>{activity.price}</Text>
            </View>
            <View style={styles.row}>
              <IoniconsIcon
                name="ios-star"
                style={styles.icon2}
              ></IoniconsIcon>

              <Text style={styles.label}>Your Rating</Text>
              <Text style={styles.value}>{booking.rating}</Text>
            </View>
            <SocialIcon
              title='share'
              button
              type='facebook'
              onPress={this.postOnFacebook}
            />
            <Button 
              icon={
                <Icon
                  name="edit"
                  size={15}
                  color="white"
                />
              }
                title="Edit/Rate" 
                type="outline"
                onPress={this.handleEdit} 
                style={styles.button} />

            <Button 
            icon={
              <Icon
                name="trash"
                size={15}
                color="white"
              />
            }
            title="Cancel" 
            type="outline"  
            onPress={this.confirmDelete}
            style={styles.button}/>


            <Button 
              icon={
                <Icon
                  name="comment"
                  size={15}
                  color="white"
                />
              }
            title="Chat"  
            type="outline"  
            onPress={() => this.props.navigation.navigate("Chat")} 
            style={styles.button} />

            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <SellerProfile />

                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => {
                        this.setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle}>Hide Seller Profile</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>

              <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                  this.setModalVisible(true);
                }}
              >
                <Text style={styles.textStyle}>Show Seller Profile</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}