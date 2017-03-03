import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';

import Button from 'apsl-react-native-button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePickerTime from 'react-native-modal-datetime-picker';
import Picker from 'react-native-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import StationCode from './StationCode';

export default class Index extends Component {
    constructor(props) {
        super(props);
        const Dates = new Date();
        this.state = {
            Dates: Dates.getFullYear() + '-' + (Dates.getMonth() + 1 < 10 ? '0' : '') + (Dates.getMonth() + 1) + '-' + (Dates.getDate() < 10 ? '0' : '') + Dates.getDate(),
            Hours: (Dates.getHours() < 10 ? '0' : '') + Dates.getHours(),
            Minutes: (Dates.getMinutes() < 10 ? '0' : '') + Dates.getMinutes(),
            isDateTimePickerVisible: false,
            isDateTimePickerTimeVisible: false,
            fromstationName: '【臺北】',
            tostationName: '【萬華】',
            fromstation: '1008',
            tostation: '1009',
        }

        this.onPress = this.onPress.bind(this);
        this.showPickerFromstation = this.showPickerFromstation.bind(this);
        this.showPickertostation = this.showPickertostation.bind(this);
        this.exchange = this.exchange.bind(this);
    }

    hideDateTimePicker = () => this.setState({
        isDateTimePickerVisible: false,
        isDateTimePickerTimeVisible: false
    });

    handleDatePicked = (date) => {
        this.setState({
            Dates: date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' : '') + date.getDate(),
        });
        console.log(this.state.Dates);
        this.hideDateTimePicker();
    }

    handleDatePickedTime = (date) => {
        this.setState({
            Hours: (date.getHours() < 10 ? '0' : '') + date.getHours(),
            Minutes: (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
        });
        console.log(this.state.Hours + ':' + this.state.Minutes);
        this.hideDateTimePicker();
    }

    exchange() {
        this.setState({
            fromstationName: this.state.tostationName,
            fromstation: this.state.tostation,
            tostationName: this.state.fromstationName,
            tostation: this.state.fromstation
        });
        console.log('互換後', '起=' + this.state.fromstationName, this.state.fromstation, '迄=' + this.state.tostationName, this.state.tostation);
    }

    onPress() {
        const url = 'http://ptx.transportdata.tw/MOTC/v2/Rail/TRA/DailyTimetable/OD/' + this.state.fromstation + '/to/' + this.state.tostation + '/' + this.state.Dates + '?$format=JSON'
        this.props.navigator.push({
            id: 1,
            params: {
                SelectUrl: url,
                fromstationName: this.state.fromstationName,
                tostationName: this.state.tostationName
            }
        });
        Picker.hide();
    }



    showPickerFromstation() {
        Picker.init({
            pickerData: StationCode,
            selectedValue: [1, 5],
            pickerConfirmBtnText: '確定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '請選擇起站',
            pickerToolBarFontSize: 18,
            pickerFontSize: 18,
            pickerConfirmBtnColor: [49, 151, 252, 5],
            pickerCancelBtnColor: [49, 151, 252, 5],
            pickerToolBarBg: [230, 230, 230, 5],
            pickerBg: [0, 0, 0, 0],
            onPickerConfirm: data => {
                console.log("起站", data[1].split('-', 1), data[1].slice(5));
                this.setState({
                    fromstationName: data[1].slice(5),
                    fromstation: data[1].split('-', 1)
                });
            }
        });
        Picker.show();
    }

    showPickertostation() {
        Picker.init({
            pickerData: StationCode,
            selectedValue: [1, 5],
            pickerConfirmBtnText: '確定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '請選擇迄站',
            pickerToolBarFontSize: 18,
            pickerFontSize: 18,
            pickerConfirmBtnColor: [49, 151, 252, 5],
            pickerCancelBtnColor: [49, 151, 252, 5],
            pickerToolBarBg: [230, 230, 230, 5],
            pickerBg: [0, 0, 0, 0],
            onPickerConfirm: data => {
                console.log("迄站", data[1].split('-', 1), data[1].slice(5));
                this.setState({
                    tostationName: data[1].slice(5),
                    tostation: data[1].split('-', 1)
                });
            }
        });
        Picker.show();
    }

    render() {
        return (
            <View style={ styles.IndexView }>
              <DateTimePicker isVisible={ this.state.isDateTimePickerVisible } is24Hour={ true } date={ new Date() } titleIOS="請選擇日期" cancelTextIOS="取消" confirmTextIOS="確定" onConfirm={ this.handleDatePicked }
                onCancel={ this.hideDateTimePicker } />
              <DateTimePickerTime isVisible={ this.state.isDateTimePickerTimeVisible } is24Hour={ true } mode='time' date={ new Date() } titleIOS="請選擇日期" cancelTextIOS="取消" confirmTextIOS="確定"
                onConfirm={ this.handleDatePickedTime } onCancel={ this.hideDateTimePicker } />
              <View style={ styles.StatusBar }></View>
              <View style={ styles.IndexViewTitle }>
                <Text style={ { fontSize: 20, color: '#fff' } }>臺鐵時刻表查詢</Text>
              </View>
              <View style={ styles.SelectStop }>
                <View style={ styles.SelectStopView }>
                  <Text style={ { fontSize: 17, color: '#2894ff', marginBottom: 10 } }>起站</Text>
                  <Button style={ styles.SelectStopButton } onPress={ this.showPickerFromstation }>
                    <Text>
                      { this.state.fromstationName }
                    </Text>
                  </Button>
                </View>
                <View style={ styles.SelectStopView }>
                  <Text style={ { fontSize: 17, color: '#2894ff', marginBottom: 10 } }>互換</Text>
                  <Button style={ { width: 50, borderRadius: 3, borderColor: '#fcfcfc' } } onPress={ this.exchange }>
                    <Icon name="refresh" size={ 20 } color="#2894ff" />
                  </Button>
                </View>
                <View style={ styles.SelectStopView }>
                  <Text style={ { fontSize: 17, color: '#2894ff', marginBottom: 10 } }>迄站</Text>
                  <Button style={ styles.SelectStopButton } onPress={ this.showPickertostation }>
                    <Text>
                      { this.state.tostationName }
                    </Text>
                  </Button>
                </View>
              </View>
              <View style={ styles.SelectStop }>
                <Text style={ { fontSize: 17, color: '#2894ff' } }>出發時間</Text>
              </View>
              <View style={ styles.SelectStop }>
                <View style={ styles.SelectStopView }>
                  <Button style={ styles.SelectStopButton } onPress={ () => {
                                                                          this.setState({
                                                                              isDateTimePickerVisible: true,
                                                                          })
                                                                      } }>
                    <Text>
                      { this.state.Dates }
                    </Text>
                  </Button>
                </View>
                <View style={ styles.SelectStopView }>
                  <Button style={ styles.SelectStopButton } onPress={ () => {
                                                                          this.setState({
                                                                              isDateTimePickerTimeVisible: true,
                                                                          })
                                                                      } }>
                    <Text>
                      { this.state.Hours }:
                      { this.state.Minutes }
                    </Text>
                  </Button>
                </View>
              </View>
              <Button style={ styles.SelectButton } onPress={ this.onPress }>
                <Text style={ { color: '#ffffff', fontSize: 20 } }>查詢</Text>
              </Button>
            </View>
            );
    }
}

const styles = StyleSheet.create({
    IndexView: {
        flex: 1
    },
    StatusBar: {
        height: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#2894ff',
    },
    IndexViewTitle: {
        backgroundColor: '#2894ff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        marginBottom: 20
    },
    SelectStop: {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 5,
    },
    SelectStopView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10
    },
    SelectStopButton: {
        width: 100,
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        borderColor: '#e0e0e0',
    },
    SelectButton: {
        backgroundColor: '#2894ff',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 3,
        borderColor: '#2894ff'
    }
});