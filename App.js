/*
 * @Author: LanPZzzz 
 * @Date: 2018-12-20 11:13:18 
 * @Last Modified by: LanPZzzz
 * @Last Modified time: 2018-12-21 11:54:15
 */
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
  Alert,
  Button,
	TextInput,
	TouchableHighlight,
	NativeModules,
	NativeEventEmitter,
  DeviceEventEmitter
} from 'react-native'

// import { StackNavigator } from 'react-navigation';

import RNValleyRtcAPI from 'react-native-valley-rtc-api';

// import ValleyView from './ValleyViewDemo'

var RCTValleyVideoView = RNValleyRtcAPI.RCTValleyVideoView

// var RNValleyRtcAPI = NativeModules.RNValleyRtcAPI;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  // static navigationOptions = {
  //   title: 'Welcome',
  // };

	state = {
    version:'0.0',
		text:'请点击',
		notice:'未收到通知',
    roomText:'5',
		userText:'' + parseInt(Math.random() * 100000),
    allowedText:'提问通道当前关闭#点击打开',
    speakonText:'speaktype=-1',
		room:'',
		user:'',
    inviter:'',


    _reload:false,
    _local:true,
    _remove:false,
    _channelMsgIndex:-1,
    _channelAudioIndex:-1,
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

    this.allowed = false
    this.busy = false
		this.room = this.state.roomText
		this.user = this.state.userText
		this.alterBodyToken = ''
    this.alterBodyFromUserid = ''
    this.speakonType = -1

    // todo: default is video mode. now is test. select button
    this.videoMode = true
	}

	componentWillUnmount() {
		//删除监听
    if (Platform.os === 'ios') {
      this.subScription.remove()
    }
	}

  async _createChannel(cb) { //Promise回调
    var index = -1
    try {
      // channel 可以创建多个，以索引识别，带有channel前缀的方法第一个参数都是索引
			index = await RNValleyRtcAPI.CreateChannel(this.videoMode)
			console.log('_createChannel 0, index = ' + index)
      this.setState({text:'create channel success, index = ' + index})
    } catch(e) {
      this._alert('create channel failed, , msg = ' + e.code)
    }
		cb(index)
	}

  _initSDK() {
    RNValleyRtcAPI.InitSDK();
    RNValleyRtcAPI.SetAuthoKey('5b001900bc0366fcEnnQxsE');
    RNValleyRtcAPI.GetSDKVersion((version) => {
      this.setState({
        version:version
      })
    });

		this._createChannel((index) => {
			this.channelMsgIndex = index
      console.log('this.channelMsgIndex = ' + this.channelMsgIndex)
      this.setState({
        _channelMsgIndex:index
      })
    })
    
    if (!this.videoMode) {
      this._createChannel((index) => {
        this.channelAudioIndex = index
        console.log('this.channelAudioIndex = ' + this.channelAudioIndex)
        this.setState({
          _channelAudioIndex:index
        })
      })
    }

    this.defaultRoom = '98'
  }

  _login() {
    this.setState({
      text:'注册中。。。 V_V！！！'
    })

    if (this.user == '') {
      Alert.alert("您输入正确的user");
      return
    }

    this.defaultUser = this.user

    if (this.videoMode) {
      // todo: default set VIDEO_CAPTURE_TYPE_16X9_640
      RNValleyRtcAPI.ChannelSetVideoProfileint(this.channelMsgIndex, RNValleyRtcAPI.VIDEO_CAPTURE_TYPE_16X9_640, (error) => {
        if (error != RNValleyRtcAPI.ERR_SUCCEED) {
          this._alert('设置Video profile 失败 -- ChannelSetVideoProfileint，error = ' + error)
          return
        }
      });

      this.setState({
        _local:true,
        _remove:false,
        _reload:true,
        text:'设置成功',
      })
    }
    else {
      RNValleyRtcAPI.ChannelEnableInterface(this.channelMsgIndex, RNValleyRtcAPI.IID_RTCMSGR, (error) => {
        if (error != RNValleyRtcAPI.ERR_SUCCEED) {
          this._alert('信号注册失败 -- ChannelEnableInterface，error = ' + error)
          return
         }
       });
  
      RNValleyRtcAPI.ChannelLogin(this.channelMsgIndex, this.defaultRoom, this.defaultUser, (error) => {
          if (error != RNValleyRtcAPI.ERR_SUCCEED) {
            this._alert('信号注册失败 -- ChannelLogin，error = ' + error)
            return
           }
      });
    }
  }

  _logout() {
    RNValleyRtcAPI.ChannelLogout(this.channelAudioIndex)
    this.busy = false
    this.setState({
      text:'用户已经退出'
    })
  }

  _invite() {
		console.log('_invite 1')
    RNValleyRtcAPI.ChannelGetLoginStatus(this.channelMsgIndex, (error) => {
       if (error != RNValleyRtcAPI.STATUS_LOGINED) {
         this._alert('请重新注册 -- ChannelGetLoginStatus，error = ' + error)
         return
        } else {
					    if (this.state.inviter == '') {
								this._alert('您输入正确的主持人')
								return
							}
							RNValleyRtcAPI.ChannelSendMsgr(this.channelMsgIndex, RNValleyRtcAPI.TYPE_CMD, 'MSG_AUDIO_INVITE', this.room, this.state.inviter, (error) => {
							if (error != RNValleyRtcAPI.ERR_SUCCEED) {
								this._alert('发送给主持人电话请求失败 -- ChannelSendMsgr，error = ' + error)
								return
							}
						})
					this.setState({
						text:'发送给主持人电话请求 成功'
					})
				}
      })
  }

  _switchAllowed() {
    if (this.allowed) {
      this.allowed = false
      this.setState({
        allowedText:'提问通道当前关闭#点击打开'
        })
    } else {
      this.allowed = true
      this.setState({
        allowedText:'提问通道当前打开#点击关闭'
        })
    }
  }

  _getNotice (body) {
		console.log('_getNotice entry, body.index = ' + body.index + ', body.event = ' + body.event)
    if (body.index == this.channelMsgIndex) {
      switch(body.event) {
        case RNValleyRtcAPI.RTC_EVTID_RESP_LOGINED:
					console.log('_getNotice RTC_EVTID_RESP_LOGINED')
          this._handleRespLogined(body)
          break
        case RNValleyRtcAPI.RTC_EVTID_RESP_SEND_MSG:
					console.log('_getNotice RTC_EVTID_RESP_SEND_MSG')
          this._handleRespSendMsg(body)
          break
        case RNValleyRtcAPI.RTC_EVTID_NTF_RECV_MSG:
					console.log('_getNotice RTC_EVTID_NTF_RECV_MSG')
          this._handleNtfRecvMsg(body)
          break
      }
    }
		else if (body.index == this.channelAudioIndex) {
			if (body.event == RNValleyRtcAPI.RTC_EVTID_RESP_LOGINED) {
					console.log('_getNotice RTC_EVTID_RESP_LOGINED')
          this._handleRespLogined(body)
			}
		}
		console.log('_getNotice exit, body.index = ' + body.index + ', body.event = ' + body.event)
	}

  _handleRespLogined(body) {
    text = ''
    needAlert = false
    if (body.code == RNValleyRtcAPI.ERR_SUCCEED) {
      text = '信号注册成功'

      // todo: get user list
			console.log('_getUserList entry')
      this._getUserList(body.index, (index) => {
        console.log('this._getUserList = ' + index)
      })
			console.log('_getUserList exit')
    } else {
      text = '信号注册失败'
      needAlert = true
    }

    if (needAlert) {
      this._alert(text)
    } else {
      this.setState({
       notice:text
      })
    }
  }

  async _getUserList(index, cb) { //Promise回调
    var code = 0
    try {
			userIdList = await RNValleyRtcAPI.ChannelGetUserList(index)
			console.log('[index = ' + index + '], user id list count = ' + userIdList.count)
			for (i = 0; i < userIdList.count; i++) {
				console.log('user_id_list[' + i + '] = ' + userIdList.user_id_list[i])
			}
    } catch(e) {
			console.log('ChannelGetUserList failed, , msg = ' + e.code)
			if (RNValleyRtcAPI.ERR_GET_USER_NULL != e.code) {
			 this._alert('ChannelGetUserList failed, , msg = ' + e.code)
			}
			code = e.code
    }
		cb(code)
	}

  _handleRespSendMsg(body) {
    text = ''
    needAlert = false
    if (body.code != RNValleyRtcAPI.ERR_SUCCEED) {
      text = '发送失败'
      needAlert = true
    } else {
			text = '发送成功'
      needAlert = false
    }
    if (needAlert) {
      this._alert(text)
    } else {
      this.setState({
        notice:text
      })
    }
  }

// index, code, from_userid, event, to_userid, msg, token, msg_type(int), msg_time(int64)
  _handleNtfRecvMsg(body) {
    if (this.defaultUser == body.to_userid) {
      if (body.msg == 'MSG_INVITE_ARRIVED') {
        this._alert('请求已经送达')
        return
      } else if (body.msg == 'MSG_AUDIO_ENTER') {
				console.log('=== _handleNtfRecvMsg, MSG_AUDIO_ENTER ')

          RNValleyRtcAPI.ChannelEnableInterface(this.channelAudioIndex, RNValleyRtcAPI.IID_RTCMSGR|RNValleyRtcAPI.IID_AUDIO|RNValleyRtcAPI.IID_USERS|RNValleyRtcAPI.IID_AUDIOSYSTEM, (error) => {
             if (error != RNValleyRtcAPI.ERR_SUCCEED) {
               this._alert('发送MSG_AUDIO_ENTER失败, ChannelEnableInterface，error = ' + error)
               return
              }
         })

    RNValleyRtcAPI.ChannelEnableLocalAudio(this.channelAudioIndex, true, (error) => {
        if (error != RNValleyRtcAPI.ERR_SUCCEED) {
          this._alert('发送MSG_AUDIO_ENTER失败, ChannelEnableLocalAudio，error = ' + error)
          return
         }
    })
    RNValleyRtcAPI.ChannelLogin(this.channelAudioIndex, body.token, this.user, (error) => {
        if (error != RNValleyRtcAPI.ERR_SUCCEED) {
          this._alert('发送MSG_AUDIO_ENTER失败, ChannelLogin，error = ' + error)
          return
         }
    })
        return
      } else if (body.msg == 'MSG_AUDIO_REFUSE') {
        this._alert('主持人拒绝')
        return
      } else if (body.msg == 'MSG_AUDIO_NOT_ALLOWED') {
        this._alert('对方热线通道未开启')
        return
      } else if (body.msg == 'MSG_AUDIO_BUSY') {
        this._alert('对方占线')
        return
      }

      RNValleyRtcAPI.ChannelSendMsgr(this.channelMsgIndex, RNValleyRtcAPI.TYPE_CMD, 'MSG_INVITE_ARRIVED', '你好', body.from_userid, (error) => {
          if (error != RNValleyRtcAPI.ERR_SUCCEED) {
            this._alert('发送给主持人的反馈失败，error = ' + error)
            return
           }
      })

      if (this.allowed && !this.busy) {
				this.alterBodyToken = body.token
				this.alterBodyFromUserid = body.from_userid
				console.log('token = ' + this.alterBodyToken + ',  from user = ' + this.alterBodyFromUserid)
        Alert.alert('呼叫','用户' + body.from_userid + '呼叫，是否同意?',
          [
            {text:"确认", onPress:this._alertConfirm.bind(this)},
            {text:"取消", onPress:this._alertCancel.bind(this)},
          ]
        );
      } else if (this.allowed) {
        //如果不允许拨打热线，发送关键词。
        RNValleyRtcAPI.ChannelSendMsgr(this.channelMsgIndex, RNValleyRtcAPI.TYPE_CMD, 'MSG_AUDIO_NOT_ALLOWED', body.token, body.from_userid, (error) => {
            if (error != RNValleyRtcAPI.ERR_SUCCEED) {
              this._alert('发送不允许拨打热线失败，error = ' + error)
              return
             }
        })
      } else if (this.busy) {
        //如果主持人占线，发送关键词
        RNValleyRtcAPI.ChannelSendMsgr(this.channelMsgIndex, RNValleyRtcAPI.TYPE_CMD, 'MSG_AUDIO_BUSY', body.token, body.from_userid, (error) => {
            if (error != RNValleyRtcAPI.ERR_SUCCEED) {
              this._alert('发送主持人占线失败，error = ' + error)
              return
             }
        })
      }
    }
  }

  _alert(text) {
    this.setState({
      text:text
    })
    Alert.alert(text);
  }

  _alertConfirm() {
		console.log('====  _alertConfirm, this.alterBodyToken = ' + this.alterBodyToken + ', this.alterBodyFromUserid = ' + this.alterBodyFromUserid)
    //主持人允许用户呼叫的话给用户发送一个enter关键词，让用户那里自动加入房间，上面用户段的逻辑有处理
    this.busy = true
    RNValleyRtcAPI.ChannelSendMsgr(this.channelMsgIndex, RNValleyRtcAPI.TYPE_CMD, 'MSG_AUDIO_ENTER', this.alterBodyToken, this.alterBodyFromUserid, (error) => {
        if (error != RNValleyRtcAPI.ERR_SUCCEED) {
          this._alert('发送让用户加入房间失败, ChannelSendMsgr，error = ' + error)
          return
         }
    })

		this.setState({
      roomText:this.alterBodyToken
    })

      RNValleyRtcAPI.ChannelEnableInterface(this.channelAudioIndex, RNValleyRtcAPI.IID_RTCMSGR|RNValleyRtcAPI.IID_AUDIO|RNValleyRtcAPI.IID_USERS|RNValleyRtcAPI.IID_AUDIOSYSTEM, (error) => {
         if (error != RNValleyRtcAPI.ERR_SUCCEED) {
           this._alert('发送让用户加入房间失败, ChannelEnableInterface，error = ' + error)
           return
          }
     })

    RNValleyRtcAPI.ChannelEnableLocalAudio(this.channelAudioIndex, true, (error) => {
        if (error != RNValleyRtcAPI.ERR_SUCCEED) {
          this._alert('发送让用户加入房间失败, ChannelEnableLocalAudio，error = ' + error)
          return
         }
    })
    RNValleyRtcAPI.ChannelLogin(this.channelAudioIndex, this.alterBodyToken, this.user, (error) => {
        if (error != RNValleyRtcAPI.ERR_SUCCEED) {
          this._alert('发送让用户加入房间失败, ChannelLogin，error = ' + error)
          return
         }
    })
  }

  _alertCancel() {
		console.log('====  _alertCancel')
    //主持人不允许用户呼叫的话就发送一个refuse关键词，用户根据关键词处理。
    RNValleyRtcAPI.ChannelSendMsgr(this.channelMsgIndex, RNValleyRtcAPI.TYPE_CMD, 'MSG_AUDIO_REFUSE', this.alterBodyToken, this.alterBodyFromUserid, (error) => {
        if (error != RNValleyRtcAPI.ERR_SUCCEED) {
          this._alert('发送让用户加入房间失败，error = ' + error)
          return
         }
    })
  }

  _switchSpeakOn() {
    switch(this.speakonType) {
      case -1:
        this.speakonType = 0;
        break
      case 0:
        this.speakonType = 1;
        break
      case 1:
        this.speakonType = -1;
        break
    }
    this.setState({
      speakonText:'speaktype=' + this.speakonType
    })
    RNValleyRtcAPI.ChannelSetSpeakerOn(this.channelAudioIndex, this.speakonType, (error) => {
      if (error != RNValleyRtcAPI.ERR_SUCCEED) {
        this._alert('设置SpeakOn 失败, ChannelSetSpeakerOn，error = ' + error)
        return
      }
    })
  }

  _releaseSDK() {
    RNValleyRtcAPI.ChannelLogout(this.channelMsgIndex)
    RNValleyRtcAPI.ChannelRelease(this.channelMsgIndex)
    RNValleyRtcAPI.ChannelRelease(this.channelAudioIndex)
    RNValleyRtcAPI.CleanSDK();
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={[styles.flexDirection, styles.inputHeight]}>
          <View style={styles.btn}>
            <Text style={styles.search}>房间:</Text>
          </View>
          <View style={styles.flex}>
            <TextInput
              style={styles.input}
              placeholder="请输入房间号"
              defaultValue={this.state.roomText}
              onChangeText={(text) => this.setState({room:text})}/>
          </View>
        </View>
        <View style={[styles.flexDirection, styles.inputHeight]}>
          <View style={styles.btn}>
            <Text style={styles.search}>用户:</Text>
          </View>
          <View style={styles.flex}>
            <TextInput
              style={styles.input}
              placeholder="请输入用户"
							defaultValue={this.state.userText}
              onChangeText={(text) => this.setState({user:text})}/>
          </View>
        </View>
        <View style={[styles.flexDirection, styles.inputHeight]}>
          <View style={styles.btn}>
            <Text style={styles.search}>主持人:</Text>
          </View>
          <View style={styles.flex}>
            <TextInput
              style={styles.input}
              placeholder="请输入主持人号"
              onChangeText={(text) => this.setState({inviter:text})}/>
          </View>
        </View>
        <View style={styles.flexDirection}>
          <TouchableHighlight
            style={[styles.highLight,{marginTop:1}]}
            underlayColor='#deb887'
            activeOpacity={0.8}
            onPress={() => this._initSDK()}
            >
            <Text>初始化</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.highLight,{marginTop:1}]}
            underlayColor='#deb887'
            activeOpacity={0.8}
            onPress={() => this._login()}
            >
            <Text>注册</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.flexDirection}>
          <TouchableHighlight
            style={[styles.highLight,{marginTop:1}]}
            underlayColor='#deb887'
            activeOpacity={0.8}
            onPress={() => this._invite()}
            >
            <Text>发送给主持人电话请求</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.highLight,{marginTop:1}]}
            underlayColor='#deb887'
            activeOpacity={0.8}
            onPress={() => this._switchAllowed()}
            >
            <Text>{this.state.allowedText}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.flexDirection}>
          <TouchableHighlight
            style={[styles.highLight,{marginTop:1}]}
            underlayColor='#deb887'
            activeOpacity={0.8}
            onPress={() => this._switchSpeakOn()}
            >
            <Text>{this.state.speakonText}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.highLight,{marginTop:1}]}
            underlayColor='#deb887'
            activeOpacity={0.8}
            onPress={() => this._logout()}
            >
            <Text>退出房间</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.flexDirection}>
          <TouchableHighlight
            style={[styles.highLight,{marginTop:1}]}
            underlayColor='#deb887'
            activeOpacity={0.8}
            onPress={() => this._releaseSDK()}
            >
            <Text>退出sdk</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.welcome}>version:{this.state.version}</Text>
        <Text style={styles.welcome}>state:{this.state.text}</Text>
        <Text style={styles.welcome}>notice:{this.state.notice}</Text>
        <View style={styles.flexDirection}>
          <Button title='登录'
            onPress={() => {
              RNValleyRtcAPI.ChannelLogin(this.channelMsgIndex, this.defaultRoom, this.defaultUser, (error) => {
                if (error != RNValleyRtcAPI.ERR_SUCCEED) {
                  this._alert('信号注册失败 -- ChannelLogin，error = ' + error)
                  return
                 } else {
                   this.setState({
                    text:'登录成功'
                   })
                 }
                })
              // if (this.state._reload) {
              //     this.setState({
              //         _reload:false
              //     })
              // }
              // else {
              //     this.setState({
              //         _reload:true
              //     })
              // }
          }}>
          </Button>
        </View>
        <View style={{flexDirection:'column'}}>
          <RNValleyRtcAPI.RCTValleyVideoView style={styles.video}
              userId={this.state.userText}
              local={this.state._local}
              remove={this.state._remove}
              reload={this.state._reload}
              index={this.state._channelMsgIndex}>
            <View style={{flexDirection:'column'}}>
              <View style={{width: 100, height: 50, backgroundColor: 'red'}} />
              <View style={{width: 100, height: 50, backgroundColor: 'black'}} />
             <View style={{position:'absolute', width: 50, height: 50, backgroundColor: 'green'}} />
            </View>
          </RNValleyRtcAPI.RCTValleyVideoView>
          <View style={{flexDirection:'row', position:'absolute'}}>
            <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
            <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
            <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
          </View>
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
  search:{
    color:'#fff',
    fontSize:15,
    fontWeight:'bold'
  },
  flex:{
    flex: 1,
  },
  btn:{
    width:55,
    marginLeft:-5,
    marginRight:5,
    backgroundColor:'#23BEFF',
    height:45,
    justifyContent:'center',
    alignItems: 'center'
  },
  flexDirection:{
    flexDirection:'row'
  },
  flexDirection_column:{
    flexDirection:'column'
  },
  location_position:{
    position:'absolute'
  },
  topStatus:{
    marginTop:25,
  },
  inputHeight:{
    height:45,
  },
  input:{
    height:45,
    borderWidth:1,
    marginLeft: 5,
    paddingLeft:5,
    borderColor: '#ccc',
    borderRadius: 4
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
