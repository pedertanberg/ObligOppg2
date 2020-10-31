import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import firebase from 'firebase';

const styles = StyleSheet.create({
   container: {
      backgroundColor: "#21164e"
   },
   card: {
      backgroundColor: '#21164e'
   },
   root: {
      flex: 1,
      backgroundColor: "rgb(255,255,255)"
   },
   group: {
      height: 55,
      backgroundColor: "#21164e",
      flexDirection: "row",
      marginTop: 25
   },
   image: {
      width: 350,
      height: 150,

   },
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
   rect2: {

   },
   rect2_imageStyle: {},

});


var itm = [];
export default class SuperMarket1 extends React.Component {
   constructor(props) {
      super(props);

      this.state = ({
         items: []
      });
   }
   componentDidMount() {
      //= =======================================
      firebase.database().ref('/activit/').on('value', (snap) => {
         let items = [];
         snap.forEach((child) => {
            items.push({
               price: child.val().price,
               description: child.val().description,
               header: child.val().header,
               category: child.val().category,

            });
            //  console.log(child.val().title)
            //  console.log(child.val().price)
            //  console.log(child.val().description)
         });
         itm = items;
         this.setState({ items: items });
         console.log(itm);
         console.log('itemstate ' + this.state.items);
         itm.forEach((itms) => {
            console.log('title*' + itms.header);
         });
      });
      //= ========================================
   }

   render() {
      return (
         <SafeAreaView style={styles.root}>
            <ScrollView horizontal={true} style={styles.twenty8}>
               <TouchableOpacity>
                  <Card style={styles.card}>
                     {
                        this.state.items.map((u, i) => {
                           return (
                              <View key={i} style={styles.card}>

                                 <Text style={styles.name}>{u.header}</Text>
                                 <Text>{u.description}</Text>
                                 <Text>{u.price}</Text>
                                 <Text>{u.category}</Text>
                                 <Button
                                    icon={<Icon name='golf-course' color='#ffffff' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='VIEW NOW' />

                              </View>
                           );
                        })
                     }
                  </Card>
               </TouchableOpacity>
            </ScrollView>
         </SafeAreaView>
      );
   }
}