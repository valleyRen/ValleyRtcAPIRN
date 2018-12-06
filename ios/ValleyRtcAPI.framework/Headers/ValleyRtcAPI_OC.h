#pragma once

#import <Foundation/Foundation.h> 
#import <UIKit/UIKit.h>
#include <stdint.h>


#ifndef ERR_NOT_INITIALIZE

#define ERR_SUCCEED 0         // 操作成功
#define ERR_NOT_LOGINED  -1   // 未登录成功       
#define ERR_ALREADY_RUN  -2   // 已经在运行   
#define ERR_USER_NOTFOUND -3  // 未找到用户   
#define ERR_EXCUTING -4		  // 正在执行中 
#define ERR_NOT_INITIALIZE -5 // 未初始化
#define ERR_UNSUPPORT -6      // 功能不支持
#define ERR_ARGUMENT  -7	  // 参数错误

#define ERR_CHANNEL_EXPIRED 1        // 频道已经失效
#define ERR_CONNECT_SERVER_FAILED 2  // 连接服务器失败
#define ERR_REQUEST_TIMEOUT 3  // 请求超时
#define ERR_CONFIG 4  // 配置信息错误 
#define ERR_NET_POOL 5  // 网络不好
#define ERR_VERSION_UNSUPPORTED 6  // 版本不支持
#define ERR_AUTHO_FAILED 7  // 授权失败 
#define ERR_NOT_ENOUGH_CHANNEL 8  // 频道资源不足
#define ERR_SERVER_ERROR 9  // 服务器错误
#define ERR_OPEN_RECORD 10  // 打开采集失败
#define ERR_OPEN_PLAYOUT 11  // 打开播放失败
#define ERR_RECORD_PERMISSION 12  // 没有录音权限

#define ERR_UNDEFINED 100  // 未定义错误


#define IID_USERS   0x01 
#define IID_AUDIO   0x02
#define IID_AUDIOSYSTEM   0x04  
#define IID_RTCMSGR 0x10 

#define RESERVE_CHANNEL_ATTR_CONFIG "##INNER##CHANNEL_SATTR_CONFIG"  //设置房间内部属性，保留用来设置内部服务器

//登录状态
#define STATUS_NONE 0         // 未登录
#define STATUS_LOGINING 1     // 登录中
#define STATUS_LOGINED 2      // 已经登录

#define typeText 1 		       // 文本消息, SDK不改消息原始内容，只是建议各个平台统一采用utf8格式，以避免调用SDK的双方不统一形成乱码
#define typeAudio 2 		       // 语音消息
#define typeBinary 3            // 二进制消息
#define typeCmd 10              // 命令消息，不在服务器上存储，仅仅转发
 
 

#endif //ERR_NOT_INITIALIZE




#ifndef VIDEO_CAPTURE_TYPE_16X9  
#define VIDEO_CAPTURE_TYPE_16X9         ( 0x000 ) 
// Image resolution
#define VIDEO_SIZE_160                  ( 1 )
#define VIDEO_SIZE_320                  ( 2 )
#define VIDEO_SIZE_480                  ( 3 )
#define VIDEO_SIZE_640                  ( 4 )
#define VIDEO_SIZE_800                  ( 5 )
#define VIDEO_SIZE_960                  ( 6 )
#define VIDEO_SIZE_1280                 ( 8 )
#define VIDEO_SIZE_1920                 ( 0xf ) 

#define VIDEO_CAPTURE_TYPE_16X9_160     ( VIDEO_CAPTURE_TYPE_16X9+VIDEO_SIZE_160 )   // 160*120
#define VIDEO_CAPTURE_TYPE_16X9_320     ( VIDEO_CAPTURE_TYPE_16X9+VIDEO_SIZE_320 )
#define VIDEO_CAPTURE_TYPE_16X9_480     ( VIDEO_CAPTURE_TYPE_16X9+VIDEO_SIZE_480 )
#define VIDEO_CAPTURE_TYPE_16X9_640     ( VIDEO_CAPTURE_TYPE_16X9+VIDEO_SIZE_640 )
#define VIDEO_CAPTURE_TYPE_16X9_800     ( VIDEO_CAPTURE_TYPE_16X9+VIDEO_SIZE_800 )
#define VIDEO_CAPTURE_TYPE_16X9_960     ( VIDEO_CAPTURE_TYPE_16X9+VIDEO_SIZE_960 )
#define VIDEO_CAPTURE_TYPE_16X9_1280    ( VIDEO_CAPTURE_TYPE_16X9+VIDEO_SIZE_1280 )   // 1280*720
#define VIDEO_CAPTURE_TYPE_16X9_1920    ( VIDEO_CAPTURE_TYPE_16X9+VIDEO_SIZE_1920 )
 
#define VIDEO_CAPTURE_TYPE_4X3          ( 0x100 )
#define VIDEO_CAPTURE_TYPE_4X3_160      ( VIDEO_CAPTURE_TYPE_4X3+VIDEO_SIZE_160 )   // 160*120
#define VIDEO_CAPTURE_TYPE_4X3_320      ( VIDEO_CAPTURE_TYPE_4X3+VIDEO_SIZE_320 )
#define VIDEO_CAPTURE_TYPE_4X3_480      ( VIDEO_CAPTURE_TYPE_4X3+VIDEO_SIZE_480 )
#define VIDEO_CAPTURE_TYPE_4X3_640      ( VIDEO_CAPTURE_TYPE_4X3+VIDEO_SIZE_640 )
#define VIDEO_CAPTURE_TYPE_4X3_800      ( VIDEO_CAPTURE_TYPE_4X3+VIDEO_SIZE_800 )
#define VIDEO_CAPTURE_TYPE_4X3_960      ( VIDEO_CAPTURE_TYPE_4X3+VIDEO_SIZE_960 )
#define VIDEO_CAPTURE_TYPE_4X3_1280     ( VIDEO_CAPTURE_TYPE_4X3+VIDEO_SIZE_1280 )   // 1280*720
#define VIDEO_CAPTURE_TYPE_4X3_1920     ( VIDEO_CAPTURE_TYPE_4X3+VIDEO_SIZE_1920 )   // 1280*720

#define VIDEO_CAPTURE_TYPE_16X16        ( 0x200 )  
#define NO_ROTATE_TYPE_90               ( 1 )

#endif //VIDEO_CAPTURE_TYPE_16X9
 


#define xRTC_ChannelProfile_Communication 0
#define xRTC_ChannelProfile_LiveBroadcasting 1

#define RENDER_TYPE_FULL 0       // 拉伸模式 会有变形，充满view
#define RENDER_TYPE_ADAPTIVE 1   // 上下/左右加黑边，画面不变形
#define RENDER_TYPE_CROP 2       // 会剪切画面，适应view
#define RENDER_TYPE_AUTO 3       // 自动模式 如果都是w>h，则裁切模式，否则加黑边模式

/*
MirrorMode_NO  = 0,
MirrorMode_OnlyLocal = 1, //default front camera use mirror
MirrorMode_All = 2,
*/

#define MirrorMode_NO 0
#define MirrorMode_OnlyLocal 1
#define MirrorMode_All 2

 
typedef long long seond_t;

// 事件基类
#define RTC_EVTID_RESP_FROM  0
#define RTC_EVTID_RESP_LOGINED  (RTC_EVTID_RESP_FROM + 1)    //响应事件 收到用户登录成功或失败的应答 objRespLogin
#define RTC_EVTID_RESP_SET_CHANNEL_ATTR  (RTC_EVTID_RESP_FROM + 3) //响应事件 收到发消息成功或失败的应答 objRespSetChannelAttr 
#define RTC_EVTID_RESP_SET_USER_ATTR  (RTC_EVTID_RESP_FROM + 4)  //响应事件 收到发消息成功或失败的应答 objRespSetUserAttr 

#define RTC_EVTID_RESP_SEND_MSG (RTC_EVTID_RESP_FROM + 50) //响应事件 收到发消息成功或失败的应答 objRespMsg 

#define RTC_EVTID_NTF_FROM 1000
#define RTC_EVTID_NTF_USER_ENTER (RTC_EVTID_NTF_FROM + 1)   //通知事件 收到用户进入房间 objNtfUserEnter
#define RTC_EVTID_NTF_USER_LEAVE (RTC_EVTID_NTF_FROM + 2)   //通知事件 收到用户离开房间 objNtfUserLeave
#define RTC_EVTID_NTF_SET_CHANNEL_ATTR (RTC_EVTID_NTF_FROM + 3)  //通知事件 收到设置房间属性的通知 objNtfSetChannelAttr 
#define RTC_EVTID_NTF_SET_USER_ATTR (RTC_EVTID_NTF_FROM + 4)  //通知事件 收到设置用户属性的通知 objNtfSetUserAttr 
#define RTC_EVTID_NTF_RECV_MSG  (RTC_EVTID_NTF_FROM + 50)  //通知事件 收到用户发来的消息 objNtfMsg
#define RTC_EVTID_NTF_CONNECT_LOST  (RTC_EVTID_NTF_FROM + 80)    //通知事件 收到网络断开的消息 objNtfNetLost
#define RTC_EVTID_NTF_CONNECT_RESUME (RTC_EVTID_NTF_FROM + 81)  //通知事件 收到网络重新连上的消息 objNtfNetResume
#define RTC_EVTID_NTF_DUP_LOGINED  (RTC_EVTID_NTF_FROM + 82)  //通知事件 收到账号异地登录的消息 objNtfDupLogined
  
__attribute__((visibility("default"))) @interface xVideoCanvas : NSObject
@property(strong, nonatomic) UIView* view;
@property(assign, nonatomic) int renderMode;   //RENDER_TYPE_FULL ~ RENDER_TYPE_AUTO
@property(nonatomic, assign) int mirrorMode;
@end


@interface objBase:NSObject
@end

@interface objBaseEvent :objBase
-(int)getEventID;
@end

 
// 响应事件，响应事件都带错误码，ec=0标识成功，ec!=0标识失败，具体失败见错误描述
@interface objRespEvent:objBaseEvent
-(int)getErrorCode;
@end

// 通知事件
@interface objNtfEvent :objBaseEvent
@end 

//响应事件 收到用户登录成功或失败的应答
@interface objRespLogin : objRespEvent
-(nonnull NSString*)getUserID;
@end
 
//通知事件 收到用户进入房间
@interface objNtfUserEnter : objNtfEvent
-(nonnull NSString*)getUserID;
@end

//通知事件 收到用户离开房间
@interface objNtfUserLeave : objNtfEvent
-(nonnull NSString*)getUserID;
@end
  

@interface objRespMsg : objRespEvent
-(nonnull NSString*)getFromUserID;
-(nullable NSString*)getToUserID;
-(nonnull NSString*)getMessage;
-(nullable NSString*)getToken;
-(int)getMsgType;
-(seond_t)getMsgTime; 
@end

//通知事件 收到用户发来的消息 objNtfMsg
@interface objNtfMsg : objNtfEvent
-(nonnull NSString*)getFromUserID;
-(nullable NSString*)getToUserID;
-(nonnull NSString*)getMessage;
-(nullable NSString*)getToken;
-(int)getMsgType;
-(seond_t)getMsgTime;
@end


//通知事件 收到网络断开的消息
@interface objNtfNetLost : objNtfEvent
@end

//通知事件 收到网络重新连上的消息
@interface objNtfNetResume : objNtfEvent
@end

//通知事件 收到账号异地登录的消息
@interface objNtfDupLogined : objNtfEvent
@end



//收到设置房间属性的应答
@interface objRespSetChannelAttr : objRespEvent
-(nonnull NSString*)attrname;
-(nullable NSString*)attrvalue;
@end


		//收到设置房间属性的通知
@interface objNtfSetChannelAttr : objNtfEvent
-(nonnull NSString*)attrname;
-(nullable NSString*)attrvalue;
@end

//收到设置用户属性的应答
@interface objRespSetUserAttr : objRespEvent
-(nonnull NSString*)userid;
-(nonnull NSString*)attrname;
-(nullable NSString*)attrvalue;
@end

//收到设置用户属性的通知
@interface objNtfSetUserAttr : objNtfEvent
- (nonnull NSString*)userid;
-(nonnull NSString*)attrname;
-(nullable NSString*)attrvalue;
@end


@interface objUser : objBase
- (nonnull NSString*)userid;
-(nullable NSString*)attr:(nonnull NSString*)name;
@end

@interface objUserList : objBase
- (int)count;
-(bool)next;
-(nonnull NSString*)userid;
-(nullable NSString*)attr:(nonnull NSString*)name;
@end



__attribute__((visibility("default")))  @interface IRtcChannel : NSObject
-(void)Release;  //销毁一个对象 
-(int)EnableInterface:(int)iids;  
-(nullable objBaseEvent*)GetEvent; //获取事件对象支持，不会阻塞，没有事件返回空支持，有事件返回事件结构支持，需要调用Valley_ReleaseEvent释放事件对象指针 
-(void)ReleaseEvent:(nonnull objBaseEvent*)e;  //释放事件对象指针 
	
-(int)Login:(nonnull NSString*)channelid userid:(nonnull NSString*)userid; //登录
-(void)Logout;         //退出
-(int)GetLoginStatus;  //获取登录状态
	
-(int)SendMsgr:(int)msgtype msg : (nonnull NSString*)msg  token:(nullable NSString*)token toUID : (nullable NSString*)toUID;  // 发送消息
	
-(int)SetVideoProfileint:(int)profile;   // 设置本地视频属性
	
-(int)SetLocalVideo:(nonnull xVideoCanvas*)hVideo;   // 设置本地视频显示窗口
-(int)RemoveLocalVideo;   // 关闭本地视频显示
	
-(int)SetUserVideo:(nonnull NSString*)userid hVideo:(nonnull xVideoCanvas*)hVideo;  // 设置用户视频显示窗口
-(int)RemoveUserVideo:(nonnull NSString*)userid;  // 关闭用户视频显示
	
-(int)EnableLocalAudio:(bool)bEnable;  // 关闭或打开 本地语音
-(int)EnableLocalVideo:(bool)bEnable;  // 关闭或打开 本地视频

-(int)EnableRemoteAudio:(nonnull NSString*)userid bEnable:(bool)b; // 关闭或打开用户语音
-(int)EnableRemoteVideo:(nonnull NSString*)userid bEnable:(bool)b; // 关闭或打开用户视频
	
-(int)DisableAudio:(bool)bDisabled; // 房间支持语音，默认支持, 视频房间只能在登录前调用一次，否则无效
-(int)DisableVideo; // 房间支持视频，默认支持, 只能在登录前调用一次，否则无效

-(int)SwitchCamera; // 切换摄像头
-(int)SetSpeakerOn:(int)index; // 扬声器和听筒切换 -1 耳机互动， 0 听筒 1 扬声器 建议在-1和0之间切换

//消息房间支持 
-(int)SetChannelAttr:(nonnull NSString*)name value : (nullable NSString*)value;  // 设置房间属性
-(nullable NSString*)GetChannelAttr:(nonnull NSString*)name;  // 获取房间属性
-(int)SetUserAttr:(nonnull NSString*)uid name : (nonnull NSString*)name value : (nullable NSString*)value;  // 设置用户属性
-(nullable NSString*)GetUserAttr:(nonnull NSString*)uid name : (nonnull NSString*)name;  // 获取用户属性
-(nullable objUser*)GetUser:(nonnull NSString*)uid;   // 获取用户
-(nullable objUserList*)GetUserList;   // 获取用户列表
-(void)ReleaseObject:(nonnull objBase*)ob; 

@end

 
__attribute__((visibility("default")))  @interface ValleyRtcAPI :NSObject
+(void)InitSDK:(nonnull NSString*)workfolder localconfig: (nullable NSString*)localconfig;
+(void)SetAuthoKey:(nonnull NSString*)authokey;
+(void)CleanSDK;
+(nullable NSString*)GetErrDesc:(int)ec;
+(nonnull NSString*)GetSDKVersion;
+(nullable IRtcChannel*)CreateChannel:(bool)withVideo;
@end
 
