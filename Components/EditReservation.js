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
import HeaderX from "./Activities/HeaderX";

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

export default class EditActivity extends React.Component {
    //Setter først staten til blank. 
    state = {
        tid: '',

    };

    componentDidMount() {
        const id = this.props.navigation.getParam('id');
        this.loadActivity(id);
    }

    // Her loader vi aktivitetens data ut ifra det ID vi får med fra navigationen, gjennom url fra firebase og ref. 
    loadActivity = id => {
        firebase
            .database()
            .ref('/booking/' + id)
            .once('value', dataObject => {
                const activity1 = dataObject.val();
                const { tid } = activity1;
                this.setState({ tid });
            });
    };

    handleBrandChange = text => this.setState({ tid: text });



    updateData = () => {
        // Vi bruker this.props.navigation flere steder, så vi pakker den ut én gang for alle
        const { navigation } = this.props;
        const { tid } = this.state;
        const id = navigation.getParam('id');
        try {
            firebase
                .database()
                .ref(`/booking/${id}`)
                // Vi bruger update, så kun de felter vi angiver, bliver endret
                .update({ tid });
            // Når bilen er endret, går vi tilbage.
            Alert.alert("Your info is now updated");
            navigation.goBack();
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };

    render() {
        const { tid } = this.state;
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
                    source={require("./Login/luke-chesser-3rWagdKBF7U-unsplash.jpg")}
                >
                    <ScrollView>
                        <View style={styles.row}>
                            <Text style={styles.label}>Tid</Text>
                            <TextInput
                                value={tid}
                                onChangeText={this.handleBrandChange
                                }
                                style={styles.input}
                            />
                        </View>

                        <Button title="Press to update reservation" onPress={this.updateData} />
                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }
}
