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
import {TagSelect} from 'react-native-tag-select';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        
            height: 59,
            backgroundColor: "rgba(255,255,255,0.25)",
            borderRadius: 5,
            flexDirection: "row",
            marginTop: 20
          
    },
    label: { fontWeight: 'bold', width: 100, color: "white" },
    input: { borderWidth: 1, flex: 1, color: "white", borderColor: "white" },
    inputRating: { borderWidth: 1, flex: 1,paddingTop:20, color: "white", borderColor: "white" },
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
    nameInput: {
        height: 30,
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        flex: 1,
        marginRight: 17,
        marginLeft: 13,
        marginTop: 14
      },
});

export default class EditActivity extends React.Component {
    //Setter først staten til blank. 
    state = {
        tid: '',
        rating:[],

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
                const {rating} = activity1;
                this.setState({ tid });
                this.setState({rating})
            });
    };

    handleBrandChange = text => this.setState({ tid: text });



    updateData = () => {
        // Vi bruker this.props.navigation flere steder, så vi pakker den ut én gang for alle
        const { navigation } = this.props;
        const { tid } = this.state;
       
        const id = navigation.getParam('id');

        let selectedTags = this.tag.itemsSelected;
        let rating = []
        for (let t in selectedTags) {
            rating.push(selectedTags[t]["label"])
        }
    
        this.setState({rating: rating})
        console.log(this.state.rating)

        try {
            firebase
                .database()
                .ref(`/booking/${id}`)
                // Vi bruger update, så kun de felter vi angiver, bliver endret
                .update({ tid, rating });
            // Når bilen er endret, går vi tilbage.
            Alert.alert("Your info is now updated");
            navigation.goBack();
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };

    render() {
        const { tid } = this.state;

        const rating = [
            {id: 1, label: '1'},
            {id: 2, label: '2'},
            {id: 3, label: '3'},
            {id: 4, label: '4'},
            {id: 5, label: '5'},
            
        ];

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
                            <Text style={styles.nameInput}>Tid</Text>
                            <TextInput
                                value={tid}
                                onChangeText={this.handleBrandChange
                                }
                                style={styles.nameInput}
                            />
                        </View>
                        
                        <View style={styles.row}>
                        <Text style={{color:"white",paddingTop:15, fontSize:20, paddingRight:50}}> Your Rating:{"\n"} </Text>
                        <TagSelect
                                    theme={'success'}
                                    style={styles.inputRating}
                                    data={rating}
                                    ref={(tag) => {
                                        this.tag = tag;
                                    }}
                        />
                        </View>

                        <Button title="Press to update reservation" onPress={this.updateData} />
                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }
}
