import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
const data = [
  {
    name: 'Current Age',
    withdrawalNow: 0,
  },
  {
    name: 'FRA',
    withdrawalNow: 3000,
    withdrawalAtFRA: 0
  },
  {
    name: '90',
    withdrawalNow: 6000,
    withdrawalAtFRA: 10000
  },
];

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
    
      <Text>Early Withdrawal Breakdown</Text>
      <LineChart width={400} height={300} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <Line type="monotone" dataKey="withdrawalNow" stroke="#8884d8" />
        <Line type="monotone" dataKey="withdrawalAtFRA" stroke="#82ca9d" />
        <CartesianGrid stroke="#ccc"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
      </LineChart>
    </View>
  );
}
