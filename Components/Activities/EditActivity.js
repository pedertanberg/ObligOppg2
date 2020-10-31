import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    ImageBackground
} from 'react-native';
import firebase from 'firebase';
import HeaderX from "./HeaderX";

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

    container: { flex: 1, justifyContent: 'center', backgroundColor:"rgb(27,29,37)" },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: { fontWeight: 'bold', width: 100, color:"white" },
    input: { borderWidth: 1, flex: 1, color:"white",borderColor:"white" },
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
});

export default class EditActivity extends React.Component {
    //Setter først staten til blank. 
    state = {
        price: '',
        activity: '',
        header: '',
        description: '',
    };

    componentDidMount() {
        const id = this.props.navigation.getParam('id');
        this.loadActivity(id);
    }

    // Her loader vi aktivitetens data ut ifra det ID vi får med fra navigationen, gjennom url fra firebase og ref. 
    loadActivity = id => {
        firebase
            .database()
            .ref('/activit/'+id)
            .once('value', dataObject => {
                const activity1 = dataObject.val();
                const { price, activity, header, description } = activity1;
                this.setState({ price, activity, header, description});
            });
    };

    handleBrandChange = text => this.setState({ price: text });

    handleModelChange = text => this.setState({ activity: text });

    handleYearChange = text => this.setState({ header: text });

    handleLicensePlateChange = text => this.setState({ description: text });

    updateData = () => {
        // Vi bruker this.props.navigation flere steder, så vi pakker den ut én gang for alle
        const { navigation } = this.props;
        const { price, activity, header, description } = this.state;
        const id = navigation.getParam('id');
        try {
            firebase
                .database()
                .ref(`/activit/${id}`)
                // Vi bruger update, så kun de felter vi angiver, bliver endret
                .update({ price, activity, header, description });
            // Når bilen er endret, går vi tilbage.
            Alert.alert("Your info is now updated");
            navigation.goBack();
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };

    render() {
        const { price, activity, header, description } = this.state;
        return (
           
            

            //Her injekter vi all information som skal vises og hvorledes gjenneom styles.
            <View style={styles.container}>
                <HeaderX
        icon2Family="Feather"
        icon2Name="search"
        style={styles.headerX}
      ></HeaderX>
       <ImageBackground
            style={styles.rect2}
            imageStyle={styles.rect2_imageStyle}
            source={require("../Login//luke-chesser-3rWagdKBF7U-unsplash.jpg")}
          >
                <ScrollView>
                    <View style={styles.row}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            value={price}
                            onChangeText={this.handleBrandChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Activity</Text>
                        <TextInput
                            value={activity}
                            onChangeText={this.handleModelChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Header</Text>
                        <TextInput
                            value={header}
                            onChangeText={this.handleYearChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            value={description}
                            onChangeText={this.handleLicensePlateChange}
                            style={styles.input}
                        />
                    </View>
                    <Button title="Press to update activity info" onPress={this.updateData} />
                </ScrollView>
                </ImageBackground>
            </View>
            
        );
    }
}
