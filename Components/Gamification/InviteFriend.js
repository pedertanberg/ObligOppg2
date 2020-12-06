import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Button, Linking, SafeAreaView, TextInput, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Avatar, Caption, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import Feather from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SocialIcon } from 'react-native-elements';



//Importer klassene manage bookings, oppdater interesser, oppdater info



export default class InviteFriend extends React.Component {
  state = {postContent: "Prøv Activit gratis her, bruk koden RS27-QR1A", facebookShareURL: "https://i.imgur.com/DG8iV3O.jpg"};


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
    return (

      <ImageBackground style={styles.background}
      source={require("../Images/bg.jpg")}>

        <ScrollView>
          <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Avatar.Image
                  source={{ uri: firebase.auth().currentUser.photoURL }}
                  size={100}
                />
                <View style={{ marginLeft: 20 }}>
                  <Title style={styles.title, {
                    marginTop: 15,
                    marginBottom: 5,
                    color: "#fff"

                  }}> {firebase.auth().currentUser.phoneNumber} </Title>
                  <Caption style={styles.caption}> {firebase.auth().currentUser.displayName} </Caption>
                  <Caption style={styles.caption}> {firebase.auth().currentUser.email} </Caption>
                </View>
              </View>
            </View>


            <View style={styles.userInfoSection}>
              <View style={styles.row}>
                <IoniconsIcon name="ios-wallet" color="#fff" size={30} />
                <Text style={{ color: "#fff", marginLeft: 20, fontSize: 30 }}> 700 kr </Text>
              </View>
              
            </View>
            <View style={styles.borderLine} />

            <View>
              <Text style={styles.text3}>Invite your friends and get 1 free activity, on our expense.</Text>
              <Text style={styles.text4}>Copy the code below, and send it to your friends. After they have pasted it in their first
              booking, you will receive your credit. </Text>
              <TextInput
                        value="RS27-QR1A"
                        placeholderTextColor="rgba(255,255,255,1)"
                        secureTextEntry={false}
                        style={styles.nameInput}
                      ></TextInput>

                      <SocialIcon
                      title='share'
                      button
                      type='facebook'
                      onPress={this.postOnFacebook}
                    />
            </View>


          </SafeAreaView>
        </ScrollView>
      </ImageBackground>

    )
  }
}


const styles = StyleSheet.create({
  buttonSection: {
    width: '100%',
    height: '20%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 50,
    marginBottom: 50,
    color: '#2f4f4f'
  },
  borderLine: {
    borderWidth: 0.5,
    borderColor: '#2f4f4f',
    margin: 10,

  },
  background: {
    flex: 1,
  },
  text: {
    color: '#fff',
    alignContent: "center",
    marginLeft: -100,
    marginTop: 0,
  },
  text2: {
    color: '#fff',
    alignContent: "center",
    marginLeft: -100,
    marginTop: 0,

  },
  text3: {
    color: '#fff',
    alignContent: "center",
    marginLeft:16,
    fontSize: 30,
  },
  text4: {
    color: '#fff',
    alignContent: "center",
    marginLeft:16,
    fontSize: 20,
    marginTop:5
    
  },
  button: {
    color: '#2f4f4f',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#fff"
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: "#fff"

  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft:100
  },
  nameInput: {
    height: 30,
    color: "#32CD32",
    textAlign:"center",
    backgroundColor:"#fff",
    fontSize: 20,
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },
});