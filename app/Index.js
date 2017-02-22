import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from 'apsl-react-native-button';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class Index extends Component {
    constructor(props) {
        super(props);
        const Dates = new Date();
        this.state = {
            Dates: Dates.getFullYear() + '/' + (Dates.getMonth() + 1 < 10 ? '0' : '') + (Dates.getMonth() + 1) + '/' + Dates.getDate(),
            Hours: (Dates.getHours() < 10 ? '0' : '') + Dates.getHours(),
            Minutes: (Dates.getMinutes() < 10 ? '0' : '') + Dates.getMinutes(),
            isDateTimePickerVisible: false,
            DateTimePickerMode: 'date',
            fromstation: '',
            tostation: '',
        }

        this.SelectDate = this.SelectDate.bind(this);
        this.onPress = this.onPress.bind(this);
    }

    SelectDate = () => this.setState({
        isDateTimePickerVisible: true,
        DateTimePickerMode: 'date'
    })

    SelectDateTime = () => this.setState({
        isDateTimePickerVisible: true,
        DateTimePickerMode: 'time'
    })


    hideDateTimePicker = () => this.setState({
        isDateTimePickerVisible: false
    })


    handleDatePicked = (date) => {
        this.setState({
            Dates: date.getFullYear() + "/" + (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + "/" + date.getDate(),
            Hours: (date.getHours() < 10 ? '0' : '') + date.getHours(),
            Minutes: (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
        });
        console.log(this.state.Dates, this.state.Hours + ':' + this.state.Minutes);
        this.hideDateTimePicker()
    }

    onPress() {
        this.props.navigator.push({
            id: 1,
            params: {
                SelectUrl: 'http://www.madashit.com/api/get-Tw-Railway?date=' + this.state.Dates + '&fromstation=1810&tostation=1809&fromtime=' + this.state.Hours + this.state.Minutes + '&totime=2359'
            }
        });
    }

    render() {
        return (
            <View style={ styles.IndexView }>
              <DateTimePicker isVisible={ this.state.isDateTimePickerVisible } is24Hour={ true } mode={ this.state.DateTimePickerMode } date={ new Date() } titleIOS="請選擇日期" cancelTextIOS="取消"
                confirmTextIOS="確定" onConfirm={ this.handleDatePicked } onCancel={ this.hideDateTimePicker } />
              <View style={ styles.StatusBar }></View>
              <View style={ styles.IndexViewTitle }>
                <Text style={ { fontSize: 20, color: '#fff' } }>臺鐵時刻表查詢</Text>
              </View>
              <View style={ styles.SelectStop }>
                <View style={ styles.SelectStopView }>
                  <Text style={ { fontSize: 17, color: '#2894ff', marginBottom: 10 } }>起站</Text>
                  <Button style={ styles.SelectStopButton }>
                    <Text>起站</Text>
                  </Button>
                </View>
                <View style={ styles.SelectStopView }>
                  <Text style={ { fontSize: 17, color: '#2894ff', marginBottom: 10 } }>互換</Text>
                  <Button style={ { width: 80, backgroundColor: '#fff', borderRadius: 3, borderColor: '#e0e0e0' } }>
                    <Text>互換</Text>
                  </Button>
                </View>
                <View style={ styles.SelectStopView }>
                  <Text style={ { fontSize: 17, color: '#2894ff', marginBottom: 10 } }>迄站</Text>
                  <Button style={ styles.SelectStopButton }>
                    <Text>迄站</Text>
                  </Button>
                </View>
              </View>
              <View style={ styles.SelectStop }>
                <Text style={ { fontSize: 17, color: '#2894ff' } }>出發時間</Text>
              </View>
              <View style={ styles.SelectStop }>
                <View style={ styles.SelectStopView }>
                  <Button style={ styles.SelectStopButton } onPress={ this.SelectDate }>
                    <Text>
                      { this.state.Dates }
                    </Text>
                  </Button>
                </View>
                <View style={ styles.SelectStopView }>
                  <Button style={ styles.SelectStopButton } onPress={ this.SelectDateTime }>
                    <Text>
                      { this.state.Hours }:
                      { this.state.Minutes }
                    </Text>
                  </Button>
                </View>
              </View>
              <Button style={ styles.SelectButton } onPress={ this.onPress }>
                <Text style={ { color: '#ffffff' } }>查詢</Text>
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
        height: 20,
        backgroundColor: '#2894ff',
    },
    IndexViewTitle: {
        backgroundColor: '#2894ff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
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