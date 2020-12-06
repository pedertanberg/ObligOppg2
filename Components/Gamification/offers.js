import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Dimensions
} from 'react-native';
import _ from 'lodash';
import HeaderX from "../Activities/HeaderX";



import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

export default class Sports extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: "Intersport",
          text: "Get 10% of your next purchase at Intersport, to make sure you have the best gear available for your next tennis course.",
          location: "Voucher: ACTIVIT20",
          image: 'https://sponsorogeventforeningen.no/media/3633/intersport-2.jpg',
        },
        {
          title: "VOI",
          text: "Get 10% of your next purchase at Voi, to make sure you're never late to the appointment",
          location: "Voucher: ACTIVIT20",
          image: 'https://kommunikasjon.ntb.no/data/images/00538/1213237c-5d69-4c3c-87fb-5b700e93a83c.png',
        },
        {
          title: "Imerco",
          text: "15% of your next purchase when shopping at Imerco. Make sure to have the best equipment ready for your next cooking class",
          location: "Voucher: ACTIVIT20",
          image: 'https://www.lagersalg.com/img/thumbnails/ae17f546962cdd7e038a92f156ad0fd012b62260.jpg',

        },
        {
          title: "YogaUdstyr.dk",
          text: "10% on everything at YogaUtstyr.dk. Get ready for your new Yoga lifestyle at Activit",
          location: "Voucher: Display your yoga booking in the store",
          image: 'data:image/jpeg;base64,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',


        },
        {
          title: "Woodstock Guitars",
          text: "Get 20% off your next in-store purchase at Woodstock Guitars, by just showing your latest guitar lesson booking",
          location: "Voucher: Display booking at store",
          image: 'https://www.woodstockguitars.dk/wp-content/uploads/sb-facebook-feed-images/107094600309_10158494651850310-0-400.jpg',

        },
      ]
    }
  }

  _renderItem({ item, index }, parallaxProps) {
    return (
      <View
        style={
          styles.item
        }>
        <Text style={{ fontSize: 30, color: "white" }}>{item.title}</Text>
        <Text style={{ color: "white" }}>{item.text}</Text>
        <Text style={{ color: "white" }}>{item.location}</Text>
        <ParallaxImage
          source={{ uri: item.image }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.01}
          {...parallaxProps}

        />


      </View>

    )
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 50, }}>
        <HeaderX
          icon2Family="Feather"
          icon2Name="search"
          style={styles.headerX}
        ></HeaderX>
        <ImageBackground
          style={styles.rect}
          imageStyle={styles.rect_imageStyle}
          source={require("../Images/bg.jpg")}
        ><Text style={styles.header}>Sports</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>

            <Carousel
              layout={"default"}
              ref={ref => this.carousel = ref}
              data={this.state.carouselItems}
              sliderWidth={400}
              itemWidth={500}
              itemHeight={1000}
              renderItem={this._renderItem}
              onSnapToItem={index => this.setState({ activeIndex: index })}
              hasParallaxImages={true}
            />
          </View>
         
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0)"
  },
  background: {
    flex: 1
  },
  rect: {
    flex: 1
  },
  rect_imageStyle: {},
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
  header: {
    fontSize: 30,
    marginLeft: 100,
    color: "white"

  },
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
    backgroundColor: 'rgba(0,0,0,0)',
    marginLeft: 15,
    marginTop: 25
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },



});