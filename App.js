/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, NativeModules} from 'react-native';

var textIP;
var textEvent;

/*
import RNValleyRtcAPI from 'react-native-valley-rtc-api';

RNValleyRtcAPI.addEvent("Birthday Party", "4 Privet Drive. Surrey");

RNValleyRtcAPI.findEvents((error, events) => {
  if (error) {
    console.error(error);
  }
  else {
    textEvent = events;
  }
});

RNValleyRtcAPI.getIPAddress().then(ip => {
  // "92.168.32.44"
  textIP = ip;
  //console.error(ip);
});
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
        <Text style={styles.instructions}>textEvent:  {textEvent}</Text>
        <Text style={styles.instructions}>textIP:  {textIP}</Text>
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
