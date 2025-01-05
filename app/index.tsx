import React from "react";
import { Button, SafeAreaView, View, Text } from "react-native";
import { TextInput } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function Index() {
  const [date, setDate] = React.useState(new Date(1598051730000));

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
    <SafeAreaView
    style={{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Text style={{marginRight: 10}}>Hello</Text>
      <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode='date'
      onChange={onChange}
      />
    </SafeAreaView>
    </View>
  );
}
