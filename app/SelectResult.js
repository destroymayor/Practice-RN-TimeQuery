import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Platform, ListView, Text, View, TouchableOpacity } from 'react-native';

import Button from 'apsl-react-native-button';

export default class SelectResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            isLoading: true
        }
        this.onPress = this.onPress.bind(this);
        this.HandlePressList = this.HandlePressList.bind(this);
    }

    componentDidMount() {
        this.setState({
            SelectUrl: this.props.SelectUrl
        });

        console.log(this.props.SelectUrl);
        this.FetchData();
    }

    onPress() {
        this.props.navigator.pop({
            id: 0
        });
    }

    FetchData() {
        fetch(this.props.SelectUrl).then((response) => response.json()).then((responseData) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData),
                isLoading: false
            })
            console.log(responseData);
        }).catch((error) => {
            console.log('error', error);
        });
    }

    render() {
        return (
            <View style={ styles.IndexView }>
              <View style={ styles.StatusBar }></View>
              <View style={ styles.IndexViewTitle }>
                <TouchableOpacity style={ styles.TouchableOpacity } onPress={ this.onPress }>
                  <Text style={ { color: '#fff' } }> 返回 </Text>
                </TouchableOpacity>
              </View>
              <ActivityIndicator animating={ this.state.isLoading } size='large' />
              <ListView dataSource={ this.state.dataSource } renderRow={ this.renderRow } />
            </View>
            );
    }

    renderRow(msg) {
        return (
            <TouchableOpacity onPress={ this.HandlePressList }>
              <View>
                <Text>
                  車次：
                  { msg.車次 }
                </Text>
              </View>
              <View>
                <Text>
                  開車時間：
                  { msg.開車時間 }
                </Text>
              </View>
              <View>
                <Text>
                  到達時間：
                  { msg.到達時間 }
                </Text>
              </View>
              <View>
                <Text>
                  行駛時間：
                  { msg.行駛時間 }
                </Text>
              </View>
              <View>
                <Text>
                  票價：
                  { msg.票價 }
                </Text>
              </View>
            </TouchableOpacity>);
    }

    HandlePressList(msg) {
        console.log(msg);
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

        height: 55,
    },
    TouchableOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 55
    }
});