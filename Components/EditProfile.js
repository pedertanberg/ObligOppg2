import * as React from 'react';
import firebase from 'firebase'
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

import HeaderX from "../Components/Activities/HeaderX";

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
        uid: '',
        name: '',
        phone: '',
        email:'',
        
       };



    // Her loader vi aktivitetens data ut ifra det ID vi får med fra navigationen, gjennom url fra firebase og ref. 

    handleChangeEmail = email => this.setState({ email });
    handleChangePassword = name => this.setState({ name });
    handlePhoneChange = phone => this.setState({ phone });


    handleSubmit = async () => {
        firebase.auth().sendSignInLinkToEmail;
        const { email, name, phone } = this.state;
        try {
          console.log(phone,email,name)
          
            const result = await firebase
                .auth()
                .currentUser.updateEmail("hore@gmail.com").then(function(){
                    console.log("update success")
                }).catch(function(error){
                    console.log("update bitch")

                });
            console.log(result);
            
           
        } catch (error) {
            // Vi sender `message` feltet fra den error der modtages, videre.
           
           
        }
    };

    

    render() {
        console.log(firebase.auth().currentUser)
        const { name, email, phone } = this.state;
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
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={this.handleChangePassword}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Phone</Text>
                        <TextInput
                            value={phone}
                            onChangeText={this.handlePhoneChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={this.handleChangeEmail}
                            style={styles.input}
                        />
                    </View>
                    <Button title="Press to update user info" onPress={this.handleSubmit}></Button>
                     
                </ScrollView>
                </ImageBackground>
            </View>
            
        );
    }
}