/*
 * @Author: LanPZzzz 
 * @Date: 2018-12-19 16:30:56 
 * @Last Modified by: LanPZzzz
 * @Last Modified time: 2018-12-19 23:15:00
 */

import React,{Component} from 'react'
import {
	StyleSheet,
    View,
    Button,
    Text,
} from 'react-native'

import RNValleyRtcAPI from 'react-native-valley-rtc-api';

export default class ValleyViewDemo extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.flexDirection}>
                    <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                    <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                    <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
                </View>
                <Button title='跳转'
                    onPress={() => {
                    console.warn('跳转');
                    // this.props.navigator.push({
                    //   component: ValleyView,
                    //   title: '详情',
                    // });
                }}>
                </Button>

                <RNValleyRtcAPI.RCTValleyVideoView style={styles.flexDirection}
                    userId={'123'} local={true} remove={false} reload={false} index={5}>
                    <View style={styles.flexDirection}>
                        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
                    </View>
                </RNValleyRtcAPI.RCTValleyVideoView>
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
    flexDirection:{
        flexDirection:'row'
    }
})