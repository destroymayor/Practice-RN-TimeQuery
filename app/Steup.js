import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import Index from './Index';
import SelectResult from './SelectResult';

export default class Steup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: 0
        }
    }

    renderScene(route, navigator) {
        if (route.id === 0) {
            return <Index {...route.params} navigator={ navigator } />
        }
        if (route.id === 1) {
            return <SelectResult {...route.params} navigator={ navigator } />
        }
    }

    configureScene(route) {
        const BaseConfig = Navigator.SceneConfigs.PushFromRight;
        const CustomSceneConfig = Object.assign({}, BaseConfig, {
            springTension: 100,
            springFriction: 1,
            gestures: false
        });
        return CustomSceneConfig;
    }

    render() {
        return (
            <Navigator initialRoute={ { id: this.state.route } } renderScene={ this.renderScene } configureScene={ this.configureScene } />
            );
    }
}