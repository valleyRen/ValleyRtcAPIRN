/*
 * @Author: LanPZzzz 
 * @Date: 2018-12-19 16:30:56 
 * @Last Modified by: LanPZzzz
 * @Last Modified time: 2018-12-19 19:13:19
 */

import React,{Component} from 'react'
import {
	StyleSheet,
    View,
    Button,
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
                <Button title='跳转'
                    onPress={() => {
                    console.warn('跳转');
                    // this.props.navigator.push({
                    //   component: ValleyView,
                    //   title: '详情',
                    // });
                }}>
                </Button>
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