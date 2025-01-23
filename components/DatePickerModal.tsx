import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePickerModal = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  const handleChange = (date: Date) => {
    setSelectedDate(date);
  }

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>
          {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
        </Text>
        <Button title="Select a date" onPress={showDatePicker} />
        <DateTimePickerModal
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          display='inline'
          onChange={handleChange}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
    </View>
  );
};

export default DatePickerModal;