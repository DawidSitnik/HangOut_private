import { View } from 'react-native';
import React from 'react';
import DatePicker from 'react-native-datepicker';
import Colors from '../../../../constants/Colors';

class DataPicker extends React.Component {
  maxDate(days) {
    const date = new Date(Date.now() + (days * 24 * 60 * 60 * 1000));
    return date;
  }

DataFrom = ({ _this }) => (
  <DatePicker
    date={_this.state.timeFrom}
    style={{ width: 160 }}
    mode="datetime"
    placeholder="select date"
    minDate={_this.state.date}
    maxDate={this.maxDate(7)}
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    customStyles={{
      dateIcon: {
        position: 'absolute',
        left: 0,
        top: 4,
        marginLeft: 0,
      },
      dateInput: {
        marginLeft: 36,
        borderWidth: 0,
        borderBottomColor: Colors.basicDetail,
        borderBottomWidth: 1,
      },
    }}
    onDateChange={(date) => {
      _this.setState({ timeFrom: date });
      _this.setState({ isChangedTimeFrom: true });
    }}
  />
);

DataTo = ({ _this }) => (
  <DatePicker
    date={_this.state.timeTo}
    style={{ width: 160 }}
    mode="datetime"
    placeholder="select date"
    minDate={_this.state.date}
    maxDate={this.maxDate(7)}
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    customStyles={{
      dateIcon: {
        position: 'absolute',
        left: 0,
        top: 4,
        marginLeft: 0,
      },
      dateInput: {
        marginLeft: 36,
        borderWidth: 0,
        borderBottomColor: Colors.basicDetail,
        borderBottomWidth: 1,
      },
    }}
    onDateChange={(date) => {
      if (_this.state.isChangedTimeFrom === false) {
        _this.setState({ warning: 'Choose from time first' });
        return;
      }
      if (_this.state.timeFrom >= date) {
        _this.setState({ warning: 'Time to can not be greater than time from' });
        return;
      }
      if (_this.state.warning === 'Time to can not be greater than time from') { _this.setState({ warning: '' }); }
      _this.setState({ timeTo: date });
      _this.setState({ isChangedTimeTo: true });
    }}
  />
);

render() {
  return (
    <View />
  );
}
}

export default DataPicker;
