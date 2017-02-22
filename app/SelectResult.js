import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Platform, ListView, Text, View, TouchableOpacity } from 'react-native';

import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            SelectUrl: this.props.SelectUrl,
            fromstationName: this.props.fromstationName,
            tostationName:this.props.tostationName
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
            if (responseData[0].Status) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData),
                });
            }
            this.setState({
                isLoading: false
            });
            console.log(responseData);
        }).catch((error) => {
            console.log('error', error);
        });
    }

    render() {
        return (
            <View style={ styles.SelectResultView }>
              <View style={ styles.StatusBar }></View>
              <View style={ styles.SelectResultViewTitle }>
                <TouchableOpacity style={ styles.TouchableOpacity } onPress={ this.onPress }>
                   <Icon name="arrow-left" size={20} color="#ffffff" />
                </TouchableOpacity>
                <ActivityIndicator animating={this.state.isLoading} color="#ff0000" />
                <View style={styles.SelectResultViewTitleText}>    
                <Text style={{color:'#fff',fontSize:20}}>{this.props.fromstationName}<Icon name="long-arrow-right" size={20} color="#ffffff" />{this.props.tostationName}</Text>
                </View>
                    </View>
              <ListView dataSource={ this.state.dataSource } renderRow={ this.renderRow } />
            </View>
            );
    }

    renderRow(msg) {
        let timeput = `${msg.開車時間}  `;
        let timeout = `  ${msg.到達時間}`;
        return (
            <TouchableOpacity style={ styles.ListItems } onPress={ this.HandlePressList }>
              <View style={ styles.ResultViewContent }>
                <View style={ { flex: 0.5, alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 15 } }>
                  <View style={ { flex: 0.5, alignItems: 'center', justifyContent: 'center' } }>
                    <Text style={ { color: msg.車種 == '區間車' ? '#7c7c7c' : '#ff5809', fontSize: 20 } }>
                      { msg.車種 }
                    </Text>
                    <Text style={ { color: msg.車種 == '區間車' ? '#7c7c7c' : '#ff5809', fontSize: 16, paddingTop: 3 } }>
                      { msg.車次 }
                    </Text>
                  </View>
                </View>
                <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
                  <Text style={ { color: '#000000', fontSize: 20 } }>
                     {timeput}
                  <Icon name="long-arrow-right" size={20} color="#000000" />        
                    {timeout}          
                  </Text>
                  <Text style={ { color: '#7c7c7c', fontSize: 16 } }>
                      { msg.行駛時間 }
                  </Text>
                </View>
                <View style={ { flex: 0.5, alignItems: 'flex-end', justifyContent: 'center' } }>
                  <Text style={ { color: '#ff5809', fontSize: 16 } }>
                    $
                    { msg.票價 }
                  </Text>
                </View>
              </View>
            </TouchableOpacity>);
    }

    HandlePressList(msg) {
        console.log(msg);
    }

}

const styles = StyleSheet.create({
    SelectResultView: {
        flex: 1,
        flexDirection: 'column'
    },
    StatusBar: {
        height: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#2894ff',
    },
    SelectResultViewTitle: {
        backgroundColor: '#2894ff',
        flexDirection: 'row',
        height: 55,
    },
    TouchableOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 55
    },
    SelectResultViewTitleText: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:20
    },
    ListItems: {
        backgroundColor: '#fcfcfc',
        borderBottomWidth: 0.5,
        borderBottomColor: '#bebebe'
    },
    ResultViewContent: {
        flexDirection: 'row',
        margin: 15
    }
});