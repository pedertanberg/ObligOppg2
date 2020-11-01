import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Button, SafeAreaView, ProgressViewIOSComponent } from 'react-native';
import firebase from 'firebase';
import { Avatar, Caption, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


//Importer klassene manage bookings, oppdater interesser, oppdater info



export default class ProfileScreen extends React.Component {
  state = { profile: null };



  render() {
    return (
      <ImageBackground style={styles.background}
        source={require('./Login/luke-chesser-3rWagdKBF7U-unsplash.jpg')}>

        <SafeAreaView style={styles.container}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={require('../assets/user.png')}
                size={100}
              />
              <View style={{ marginLeft: 20 }}>
                <Title style={styles.title, {
                  marginTop: 15,
                  marginBottom: 5,
                  color: "#fff"

                }}> TestBruker </Title>
                <Caption style={styles.caption}> Feedback er ønsket </Caption>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#fff" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}> Norge </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#fff" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}> +47 90909090 </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#fff" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}> testbruker@gmail.com </Text>
            </View>
          </View>
          <View style={styles.borderLine} />

          <View>
            <TouchableOpacity

              onPress={() => this.props.navigation.navigate('MyReservations')}
              style={styles.buttonSection}
              title="Manage bookings"

            >
              <Text style={styles.text}><Icon name="folder" color="#fff" size={20} />Trykk her for å se dine reservasjoner</Text>
            </TouchableOpacity>

            <TouchableOpacity

              onPress={() => this.props.navigation.navigate('MyListings')}
              style={styles.buttonSection}
              title="Manage bookings"

            >
              <Text style={styles.text2}><Icon name="folder" color="#fff" size={20} />Trykk her for å se dine aktiviteter</Text>
            </TouchableOpacity>
          </View>




        </SafeAreaView>
      </ImageBackground>

    )
  }
}


const styles = StyleSheet.create({
  buttonSection: {
    width: '100%%',
    height: '40%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 50,
    marginBottom: 100,
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
    marginTop: 10,
  },
  text2: {
    color: '#fff',
    alignContent: "center",
    marginLeft: -100,
    marginTop: -150,

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
  },
});