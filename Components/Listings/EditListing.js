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
import HeaderX from "../Activities/HeaderX";

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

    container: { flex: 1, justifyContent: 'center', backgroundColor: "rgb(27,29,37)" },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: { fontWeight: 'bold', width: 100, color: "white" },
    input: { borderWidth: 1, flex: 1, color: "white", borderColor: "white" },
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

export default class EditListing extends React.Component {
    //Setter først staten til blank. 
    state = {
        price: '',
        activity: '',
        header: '',
        description: '',
        availability: '',
        city: '',
    };

    componentDidMount() {
        const id = this.props.navigation.getParam('id');
        this.loadActivity(id);
    }

    // Her loader vi aktivitetens data ut ifra det ID vi får med fra navigationen, gjennom url fra firebase og ref. 
    loadActivity = id => {
        firebase
            .database()
            .ref('/activit/' + id)
            .once('value', dataObject => {
                const activity1 = dataObject.val();
                const { price, activity, header, description, city, availability } = activity1;
                this.setState({ price, activity, header, description, city, availability });
            });
    };

    handleBrandChange = text => this.setState({ price: text });

    handleModelChange = text => this.setState({ activity: text });

    handleYearChange = text => this.setState({ header: text });

    handleDescriptionChange = text => this.setState({ description: text });

    handleCityChange = text => this.setState({ city: text });

    handleAvailabilityChange = text => this.setState({ availability: text });

    updateData = () => {
        // Vi bruker this.props.navigation flere steder, så vi pakker den ut én gang for alle
        const { navigation } = this.props;
        const { price, activity, header, description, city, availability } = this.state;
        const id = navigation.getParam('id');
        try {
            firebase
                .database()
                .ref(`/activit/${id}`)
                // Vi bruger update, så kun de felter vi angiver, bliver endret
                .update({ price, activity, header, description, city, availability });
            // Når bilen er endret, går vi tilbage.
            Alert.alert("Your info is now updated");
            navigation.goBack();
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };

    render() {
        const { price, activity, header, description, city, availability } = this.state;
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
                    source={require("../Images/bg.jpg")}
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
                                onChangeText={this.handleDescriptionChange}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Availability</Text>
                            <TextInput
                                value={availability}
                                onChangeText={this.handleAvailabilityChange}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>City</Text>
                            <TextInput
                                value={city}
                                onChangeText={this.handleCityChange}
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
