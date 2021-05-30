import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Button} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import * as Styles from '../Styles';

const OverlayDatePicker = ({
  prompt,
  value,
  onChange,
  maximumDate,
  promptStyle,
}) => {
  const [visible, setVisible] = useState(false);

  const showDatePicker = () => {
    setVisible(true);
  };

  const hideDatePicker = () => {
    setVisible(false);
  };

  const handleConfirm = date => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <View>
      <Button
        title={prompt}
        onPress={showDatePicker}
        containerStyle={[promptStyle, datePickerStyles.button]}
        titleStyle={datePickerStyles.text}
        type="outline"
        raised={true}
      />
      <DateTimePickerModal
        date={value}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        isVisible={visible}
        mode="date"
        display="spinner"
        maximumDate={maximumDate}
      />
    </View>
  );
};

const datePickerStyles = StyleSheet.create({
  button: {
    borderColor: Styles.colors.lightGray,
    marginVertical: Styles.whitespaces.inner,
    alignSelf: 'center',
  },
  text: {
    ...Styles.texts.default,
    textAlign: 'left',
    color: Styles.colors.onBackground,
  },
});

export {OverlayDatePicker};
