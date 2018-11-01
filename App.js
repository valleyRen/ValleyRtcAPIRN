/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react'
import {
  Platform,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	NativeModules,
	NativeEventEmitter,
  DeviceEventEmitter
} from 'react-native'

import RNValleyRtcAPI from 'react-native-valley-rtc-api';

// var RNValleyRtcAPI = NativeModules.RNValleyRtcAPI;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

	state = {
		text:'请点击',
		notice:'未收到通知'
	}

	_getNotice (body) {
		this.setState({
			notice:body.code + ", " + body.userid
		})
	}
	componentWillMount() {
		//开始监听
    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener('ValleyCallback', (body: Event) => this._getNotice(body));
    }
    else if (Platform.OS === 'ios') {
      var emitter = new NativeEventEmitter(RNValleyRtcAPI)
      this.subScription = emitter.addListener("ValleyCallback",(body) => this._getNotice(body))
    }
	}
	componentWillUnmount() {
		//删除监听
    if (Platform.os === 'ios') {
      this.subScription.remove()
    }
	}

  _initSDK() {
    RNValleyRtcAPI.InitSDK();
    RNValleyRtcAPI.SetAuthoKey('5b001900bc0366fcEnnQxsE');
    RNValleyRtcAPI.GetSDKVersion((version) => {
      this.setState({
        text:'version: ' + version
      })
    });

    // RNValleyRtcAPI.GetErrDesc(123, (errDesc) => {
    //   this.setState({
    //     text:'errDesc: ' + errDesc
    //   })
    // });
  }

 	async _createRoom() { //Promise回调
    try {
			var resolve = await RNValleyRtcAPI.CreateChannel(false)
      RNValleyRtcAPI.ChannelEnableInterface(RNValleyRtcAPI.IID_RTCMSGR, (error) => {
        if (error != RNValleyRtcAPI.ERR_SUCCEED) {
          console.error(error);
         }
       });
      this.setState({text:'create success'})
    } catch(e) {
          this.setState({
            text:'create failed, , msg = ' + e.code
          })
    }
	}

  _destoryRoom() {
    RNValleyRtcAPI.ChannelRelease()
  }

  _releaseSDK() {
    RNValleyRtcAPI.CleanSDK();
  }

  _login() {
    var channelid = '5';
    var userid = 'rn-guest';
    RNValleyRtcAPI.ChannelLogin(channelid, userid, (error) => {
        if (error != RNValleyRtcAPI.ERR_SUCCEED) {
          this.setState({
            text:'login failed, ' + error
          })
         }
       });

    //RNValleyRtcAPI.ChannelGetLoginStatus((error) => {
    //  console.log(error);
    //    if (error != RNValleyRtcAPI.ERR_SUCCEED) {
    //      console.error(error);
    //     }
    //   })
  }

  _logout() {
    RNValleyRtcAPI.ChannelLogout()
  }

  _sendMsg() {
    RNValleyRtcAPI.ChannelSendMsgr(RNValleyRtcAPI.TYPE_CMD, 'nihao', 'dsadsa', '', (error) => {
      console.log(error);
        if (error != RNValleyRtcAPI.ERR_SUCCEED) {
          console.error(error);
         }
       })
  }


// 	async _promise(age) { //Promise回调
//		try{
//			var iOSExport = NativeModules.iOSExport
//			var resolve = await iOSExport.rnToiOSAge(age)
//			this.setState({
//				text:resolve
//			})
//		}catch(e) {
//			console.error(e);
//		}
//	}

    render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
					style={[styles.highLight,{marginTop:10}]}
					underlayColor='#deb887'
					activeOpacity={0.8}
					onPress={() => this._initSDK()}
					>
					<Text>初始化</Text>
				</TouchableHighlight>
        <TouchableHighlight
					style={[styles.highLight,{marginTop:10}]}
					underlayColor='#deb887'
					activeOpacity={0.8}
					onPress={() => this._createRoom()}
					>
					<Text>创建房间</Text>
				</TouchableHighlight>
        <TouchableHighlight
					style={[styles.highLight,{marginTop:10}]}
					underlayColor='#deb887'
					activeOpacity={0.8}
					onPress={() => this._login()}
					>
					<Text>进入房间</Text>
				</TouchableHighlight>
        <TouchableHighlight
					style={[styles.highLight,{marginTop:10}]}
					underlayColor='#deb887'
					activeOpacity={0.8}
					onPress={() => this._logout()}
					>
					<Text>退出房间</Text>
				</TouchableHighlight>
        <TouchableHighlight
					style={[styles.highLight,{marginTop:10}]}
					underlayColor='#deb887'
					activeOpacity={0.8}
					onPress={() => this._sendMsg()}
					>
					<Text>发送消息</Text>
				</TouchableHighlight>
        <Text style={styles.welcome}>state:{this.state.text}</Text>
        <Text style={styles.welcome}>notice:{this.state.notice}</Text>
      </View>
    );
  }
}

//<Text style={styles.welcome}>
//          state:{this.state.text}
//        </Text>
//        <Text style={styles.welcome}>
//          notify:{this.notify.text}
//        </Text>


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
	highLight:{
		height:30,
		width:120,
		margin:20,
		padding:5,
		borderWidth:1,
		borderColor:'coral',
		padding:2
	}
})
