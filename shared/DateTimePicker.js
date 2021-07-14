import React, { Component } from "react";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default class DateTimePicker2 extends Component {
  constructor(props) {
    super(props);
    const { date } = this.props;
    let dateState;
    if (date) {
      dateState = moment(date).toDate();
    } else {
      dateState = moment().toDate();
    }
    this.state = {
      date: dateState,
    };
  }
  render() {
    const { mode = "date", onChange, onHide, isVisible, ...rest } = this.props;
    return (
      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode}
        date={this.state.date}
        confirmTextIOS="Confirmer"
        is24Hour={true}
        locale="fr_FR"
        cancelTextIOS={"Annuler"}
        headerTextIOS={""}
        isDarkModeEnabled={false}
        display="spinner"
        onConfirm={(date) => {
          if (date) {
            onChange(date);
          }
          onHide();
        }}
        onCancel={onHide}
        {...rest}
      />
    );
  }
}
