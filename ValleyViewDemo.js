/*
 * @Author: LanPZzzz 
 * @Date: 2018-12-19 16:30:56 
 * @Last Modified by: LanPZzzz
 * @Last Modified time: 2018-12-19 16:31:16
 */

import React,{Component} from 'react'
import {
	StyleSheet,
	View,
} from 'react-native'

export default class ValleyViewDemo extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.flexDirection}>
                    <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                    <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                    <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
                </View>
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