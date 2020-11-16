import * as React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image

} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    height: 200,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  rect2: {
    height: 100,
    width: 390
  },


  label: { fontWeight: "bold", color: "white" },
});

export default class MyReservationsItem extends React.Component {
  handlePress = () => {
    // Her pakker vi ting ud fra props
    const { id, onSelect } = this.props;
    // Kalder den onSelect prop vi får, med det ID vi har fået som argument.
    onSelect(id);
  };

  render() {
    const { booking } = this.props;
    const { activity } = this.props;


    return (
      <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <Text style={styles.label}>
          <Image source={{ uri: activity.image }} style={styles.rect2} />{'\n'}
          <FontAwesome5 name="id-card" style={styles.icon5} /> BookingID: {booking.id}{'\n'}

          <FontAwesome5 name="calendar" style={styles.icon5} /> Tid: {booking.tid} {'\n'}

        </Text>
      </TouchableOpacity>
    );
  }
}
