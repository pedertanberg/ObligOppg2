import * as React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image

} from "react-native";
import Food from "./Images/food.png"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    height: 200,
    justifyContent: "center",
    backgroundColor: "#21164e",
  },

  rect2: {
    flex: 1,
    width: "100%"
  },
  rect2_imageStyle: {},


  label: { fontWeight: "bold", color: "white", textAlign: "center" },
});

export default class ActivityListItem extends React.Component {
  handlePress = () => {
    // Her pakker vi ting ud fra props
    const { id, onSelect } = this.props;
    // Kalder den onSelect prop vi får, med det ID vi har fået som argument.
    onSelect(id);
  };

  render() {
    const { activity } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <Image source={{ uri: activity.image }} style={styles.rect2} />
        <Text style={styles.label}>
          {activity.header} {'\n'}Pr. hour: {activity.price} DKK
        </Text>
      </TouchableOpacity>
    );
  }
}
