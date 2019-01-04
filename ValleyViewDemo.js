/*
 * @Author: LanPZzzz 
 * @Date: 2018-12-19 16:30:56 
 * @Last Modified by: LanPZzzz
 * @Last Modified time: 2019-01-03 14:58:21
 */

import React,{Component} from 'react'
import {
	StyleSheet,
    View,
    Button,
    Text,
    TouchableHighlight,
} from 'react-native'

import RNValleyRtcAPI from 'react-native-valley-rtc-api';

export default class ValleyViewDemo extends Component {

    state = {
        _reload:true,
    }
    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.flexDirection}>
                    <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                    <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                    <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
                </View>
                <TouchableHighlight
                    style={[styles.highLight,{marginTop:1}]}
                    underlayColor='#deb887'
                    activeOpacity={0.8}
                    onPress={() => {
                        console.warn('跳转');
                        if (this.state._reload) {
                            this.setState({
                                _reload:false
                            })
                        }
                        else {
                            this.setState({
                                _reload:true
                            })
                        }
                        // this.props.navigator.push({
                        //   component: ValleyView,
                        //   title: '详情',
                        // });
                    }}>
                <Text>跳转</Text>
                </TouchableHighlight>
                <RNValleyRtcAPI.RCTValleyVideoView style={styles.video}
                    userId={'123'}
                    local={true}
                    remove={false}
                    reload={false}
                    index={0}>
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
    },
    video:{
        height:320,
        width:240,
      },
    highLight:{
		height:30,
		width:120,
		margin:5,
		padding:5,
		borderWidth:1,
		borderColor:'coral',
        padding:2
    }
})