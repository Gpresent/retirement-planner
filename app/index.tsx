import React, { useContext } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { AppContext } from "../context/AppContext";
import * as SplashScreen from "expo-splash-screen";
import OnboardingScreen from "./onboarding";
import { Dimensions } from 'react-native';

const data = {
  labels: ['Current Age', 'FRA', '90'],
  datasets: [
    {
      data: [0, 3000, 6000],
      strokeWidth: 2, // Optional: line stroke width
    },
    {
      data: [0, 0, 10000],
      strokeWidth: 2, // Optional: line stroke width
    }
  ]
};

export default function Index() {
  const [date, setDate] = React.useState(new Date(1598051730000));
  const { onboardingStatus } = useContext(AppContext);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  if (onboardingStatus.step < 0) {
    return null;
  }
  else if (onboardingStatus.step < 3) {
    SplashScreen.hideAsync();
    return <OnboardingScreen />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SafeAreaView
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ marginRight: 10 }}>Hello</Text>
        
      </SafeAreaView>

      <Text>Early Withdrawal Breakdown</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 16} // Adjust width to fit screen
        height={300}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#fb8c00',
          decimalPlaces: 2, // Optional: format for decimal numbers
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
      />
    </View>
  );
}