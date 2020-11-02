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
  };


  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year

  const renderCalendarWithSelectableDate = () => {
    return (
      <Fragment>
        <Text style={styles.text}>Select Date</Text>
        <Calendar
          testID={testIDs.calendars.FIRST}
          current={'2020-11-02'}
          style={styles.calendar}
          hideExtraDays
          onDayPress={onDayPress}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: 'orange',
              selectedTextColor: 'red',
            },
          }}
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
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
});