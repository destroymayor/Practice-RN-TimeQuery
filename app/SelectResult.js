import React, { Component } from 'react';
import { ActivityIndicator, BackAndroid, StyleSheet, Platform, ListView, Text, View, TouchableOpacity } from 'react-native';

import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toasts from './component/Toast';

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
        this.HandleBack = this.HandleBack.bind(this);
    }

    componentWillMount() {
        this.setState({
            SelectUrl: this.props.SelectUrl,
            fromstationName: this.props.fromstationName,
            tostationName: this.props.tostationName
        });
        //console.log(this.props.SelectUrl);
        console.log(this.props.SelectUrl);
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.HandleBack);
        this.FetchData(this.props.SelectUrl);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.HandleBack);
    }

    onPress() {
        this.props.navigator.pop({
            id: 0
        });
    }

    HandleBack() {
        const navigator = this.props;
        if (navigator) {
            this.props.navigator.pop({
                id: 0
            });
            return true
        }
        return false
    }

    async FetchData(url) {
        try {
            let res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json()).catch((e) => {
                Toasts(error);
                console.log('fetch error', e);
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(res),
                isLoading: false
            });
            console.log('data=', res.length);
        } catch (error) {
            Toasts(error);
            console.log('error', error);
        }
    }

    render() {
        return (
            <View style={ styles.SelectResultView }>
              <View style={ styles.StatusBar }></View>
              <View style={ styles.SelectResultViewTitle }>
                <TouchableOpacity style={ styles.TouchableOpacity } onPress={ this.onPress }>
                  <Icon name="arrow-left" size={ 20 } color="#ffffff" />
                </TouchableOpacity>
                <ActivityIndicator animating={ this.state.isLoading } color="#ff0000" />
                <View style={ styles.SelectResultViewTitleText }>
                  <Text style={ { color: '#fff', fontSize: 20 } }>
                    { this.props.fromstationName }
                    <Icon name="long-arrow-right" size={ 20 } color="#ffffff" />
                    { this.props.tostationName }
                  </Text>
                </View>
              </View>
              <ListView dataSource={ this.state.dataSource } renderRow={ this.renderRow.bind(this) } />
            </View>);
    }

    renderRow(msg) {
        let timeput = `${msg.OriginStopTime.ArrivalTime}  `;
        let timeout = `  ${msg.DestinationStopTime.DepartureTime}`;
        let TrainClassificationID = null;

        switch (msg.DailyTrainInfo.TrainClassificationID) {
            case '1111': {
                TrainClassificationID = '莒光號';
                break;
            }
            case '1112': {
                TrainClassificationID = '莒光號';
                break;
            }
            case '1113': {
                TrainClassificationID = '莒光號';
                break;
            }
            case '1114': {
                TrainClassificationID = '莒光號';
                break;
            }
            case '1115': {
                TrainClassificationID = '莒光號';
                break;
            }
            case '1110': {
                TrainClassificationID = '莒光號';
                break;
            }
            case '1104': {
                TrainClassificationID = '自強號';
                break;
            }
            case '1106': {
                TrainClassificationID = '自強號';
                break;
            }
            case '1108': {
                TrainClassificationID = '自強號';
                break;
            }
            case '1100': {
                TrainClassificationID = '自強號';
                break;
            }
            case '1101': {
                TrainClassificationID = '自強號';
                break;
            }
            case '1102': {
                TrainClassificationID = '自強號';
                break;
            }
            case '1120': {
                TrainClassificationID = '復興號';
                break;
            }
            case '1107': {
                TrainClassificationID = '普悠瑪號';
                break;
            }
            case '1131': {
                TrainClassificationID = '區間車';
                break;
            }
            case '1132': {
                TrainClassificationID = '區間車(快)';
                break;
            }
            case '1140': {
                TrainClassificationID = '區間車';
                break;
            }
        }

        return (
            <TouchableOpacity style={ styles.ListItems } onPress={ this.HandlePressList.bind(this, msg) }>
              <View style={ styles.ResultViewContent }>
                <View style={ { flex: 0.5, alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 15 } }>
                  <View style={ { flex: 0.5, alignItems: 'center', justifyContent: 'center' } }>
                    <Text style={ { color: TrainClassificationID == '區間車' ? '#7c7c7c' : '#ff5809', fontSize: 16, paddingTop: 3 } }>
                      { TrainClassificationID }
                    </Text>
                    <Text style={ { color: TrainClassificationID == '區間車' ? '#7c7c7c' : '#ff5809', fontSize: 16, paddingTop: 3 } }>
                      { msg.DailyTrainInfo.TrainNo }
                    </Text>
                  </View>
                </View>
                <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
                  <Text style={ { color: '#000000', fontSize: 20 } }>
                    { timeput }
                    <Icon name="long-arrow-right" size={ 20 } color="#000000" />
                    { timeout }
                  </Text>
                </View>
                <View style={ { flex: 0.5, alignItems: 'flex-end', justifyContent: 'center' } }>
                </View>
              </View>
            </TouchableOpacity>);
    }

    HandlePressList(msg) {
        console.log('車次', msg.DailyTrainInfo.TrainNo);
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
        marginLeft: 20
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