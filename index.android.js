/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, NativeModules, NativeEventEmitter} from 'react-native';

/*
import RNValleyRtcAPI from 'react-native-valley-rtc-api';

RNValleyRtcAPI.addEvent("Birthday Party", "4 Privet Drive. Surrey");

RNValleyRtcAPI.findEvents((error, events) => {
  if (error) {
    console.error(error);
  }
  else {
    console.log(events);
  }
});

RNValleyRtcAPI.getIpAddress().then(ip => {
  // "92.168.32.44"
  console.log(ip);
});

var emitter = new NativeEventEmitter(RNValleyRtcAPI);
subScription = emitter.addListener("geolocationDidChange",(body) => {console.log(body)});

console.log(RNValleyRtcAPI.ERR_NOT_LOGINED);
*/

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native! LanPZzzz</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
