import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Button from 'apsl-react-native-button';

export default class SelectResult extends Component {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        this.setState({
            SelectUrl: this.props.SelectUrl
        });
        console.log(this.props.SelectUrl);
    }

    onPress() {
        this.props.navigator.pop({
            id: 0
        })
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

        height: 55,
    },
    TouchableOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 55
    }
});