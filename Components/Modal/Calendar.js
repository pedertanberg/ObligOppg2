import React, { useState, Fragment } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import _ from 'lodash';

const testIDs = require('./testIDs');

const CalendarsScreen = () => {
  const [selected, setSelected] = useState('');

  const onDayPress = (day) => {
    setSelected(day.dateString);
    console.log(day)
  };


  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year

  const renderCalendarWithSelectableDate = () => {
    return (
      <Fragment>
        <Text style={styles.text}>See available dates</Text>
        <Calendar
          testID={testIDs.calendars.FIRST}
          current={'2020-11-02'}
          style={styles.calendar}
          hideExtraDays
          onDayPress={onDayPress}
          markedDates={{

            '2020-11-14': { disabled: true, startingDay: true, color: 'green', endingDay: true },
            '2020-11-15': { disabled: true, startingDay: true, color: 'green', endingDay: true },
            '2020-11-16': { disabled: true, startingDay: true, color: 'green', endingDay: true },
            '2020-11-17': { disabled: true, startingDay: true, color: 'green', endingDay: true },
            '2020-11-18': { disabled: true, startingDay: true, color: 'green', endingDay: true },
            '2020-11-19': { disabled: true, startingDay: true, color: 'green', endingDay: true },
            '2020-11-20': { disabled: true, startingDay: true, color: 'green', endingDay: true },
            '2020-12-05': { disabled: true, startingDay: true, color: 'green', endingDay: true },
            '2020-12-06': { disabled: true, startingDay: true, color: 'green', endingDay: true },
            '2020-12-08': { disabled: true, startingDay: true, color: 'green', endingDay: true },
            '2020-12-09': { disabled: true, startingDay: true, color: 'green', endingDay: true },



          }}

          // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
          markingType={'period'}
        />
      </Fragment>
    );
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false} testID={testIDs.calendars.CONTAINER}>
      {renderCalendarWithSelectableDate()}

    </ScrollView>
  );
};

export default CalendarsScreen;

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
    backgroundColor: "#000"
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#000',
    color: "#fff",
    fontSize: 16,
  },
});