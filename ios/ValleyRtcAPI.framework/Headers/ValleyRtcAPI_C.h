#pragma once
 
#define __VALLEYAPI extern "C"




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
#define IID_RTCMSGR 0x10 

#define RESERVE_CHANNEL_ATTR_CONFIG "##INNER##CHANNEL_SATTR_CONFIG"  //设置房间内部属性，保留用来设置内部服务器

 
enum
{
    STATUS_NONE = 0,     // 未登录
    STATUS_LOGINING = 1, // 登录中
    STATUS_LOGINED  = 2, // 已经登录
};

enum msgtype
{
    typeText = 1,         // 文本消息, SDK不改消息原始内容，只是建议各个平台统一采用utf8格式，以避免调用SDK的双方不统一形成乱码
    typeAudio = 2,         // 语音消息
    typeBinary = 3,      // 二进制消息
    typeCmd = 10,         // 命令消息，不在服务器上存储，仅仅转发
};
 

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
 
#define CAMERA_INDEX_FRONT  -1 //[DFT]  //windows [DFT] >= 0 windows
#define CAMERA_INDEX_BACK   -2
#define CAMERA_INDEX_SWITCH -3  //移动端，-3 切换， windows -3 逐个遍历

typedef void* handle_t;
typedef void* hobj_t; 
typedef void* hevt_t;
typedef long long seond_t;

#ifdef _IOS
#import <UIKit/UIKit.h>
    struct VideoWnd{
        UIView* view;
        int renderMode;
        int mirrorMode;
    };
    typedef VideoWnd* hvideo_t;
#else
    typedef void* hvideo_t;
#endif


enum EVTID
{
	RTC_EVTID_RESP_FROM = 0,
	RTC_EVTID_RESP_LOGINED = (RTC_EVTID_RESP_FROM + 1),    //响应事件 收到用户登录成功或失败的应答 objRespLogin
	RTC_EVTID_RESP_SET_CHANNEL_ATTR = (RTC_EVTID_RESP_FROM + 3),  //响应事件 收到发消息成功或失败的应答 objRespSetChannelAttr 
	RTC_EVTID_RESP_SET_USER_ATTR = (RTC_EVTID_RESP_FROM + 4),  //响应事件 收到发消息成功或失败的应答 objRespSetUserAttr 

	RTC_EVTID_RESP_SEND_MSG = (RTC_EVTID_RESP_FROM + 50),  //响应事件 收到发消息成功或失败的应答 objRespMsg 

	RTC_EVTID_NTF_FROM = 1000,
	RTC_EVTID_NTF_USER_ENTER = (RTC_EVTID_NTF_FROM + 1),   //通知事件 收到用户进入房间 objNtfUserEnter
	RTC_EVTID_NTF_USER_LEAVE = (RTC_EVTID_NTF_FROM + 2),   //通知事件 收到用户离开房间 objNtfUserLeave

	RTC_EVTID_NTF_SET_CHANNEL_ATTR = (RTC_EVTID_NTF_FROM + 3),  //通知事件 收到设置房间属性的通知 objNtfSetChannelAttr 
	RTC_EVTID_NTF_SET_USER_ATTR = (RTC_EVTID_NTF_FROM + 4),  //通知事件 收到设置用户属性的通知 objNtfSetUserAttr 

	RTC_EVTID_NTF_RECV_MSG = (RTC_EVTID_NTF_FROM + 50),  //通知事件 收到用户发来的消息 objNtfMsg
	RTC_EVTID_NTF_CONNECT_LOST = (RTC_EVTID_NTF_FROM + 80),    //通知事件 收到网络断开的消息 objNtfNetLost
	RTC_EVTID_NTF_CONNECT_RESUME = (RTC_EVTID_NTF_FROM + 81),  //通知事件 收到网络重新连上的消息 objNtfNetResume
	RTC_EVTID_NTF_DUP_LOGINED = (RTC_EVTID_NTF_FROM + 82), //通知事件 收到账号异地登录的消息 objNtfDupLogined
};
 
enum objBaseEvent_keys
{
	objBaseEvent_evtid = 0,
};
 
 
// 响应事件，响应事件都带错误码，ec=0标识成功，ec!=0标识失败，具体失败见错误描述
enum objRespEvent_keys // objBaseEvent_keys
{ 
	objRespEvent_ecode = 1, 
};

// 通知事件
typedef objBaseEvent_keys objNtfEvent_keys;



enum objString_keys
{
	objStringValue = 10,
};



enum object_channel_attr_keys
{
	objChannelAttrName  = 10,
	objChannelAttrValue = 11,
};


enum object_user_attr_keys
{
	objUserAttrUserID = 10,
	objUserAttrName   = 11,
	objUserAttrValue   = 12,
};



enum objUserItem_keys
{
	objUserID      = 10, 
	//attrs
};


//响应事件 收到用户登录成功或失败的应答
enum objRespLogin_keys // : objBaseEvent
{
	objRespLogin_userid    = 10, 
};


//通知事件 收到用户进入房间
enum objNtfUserEnter_keys //: objBaseEvent_keys
{
	objNtfUserEnter_userid = 10,
};


enum objRespSetChannelAttr_keys // : objBaseEvent
{
	 //object_channel_attr_keys
};


enum objRespSetUserAttr_keys // : objBaseEvent
{
	//object_channel_attr_keys
};


enum objNtfSetUserAttr_keys // : objBaseEvent
{
	//object_channel_attr_keys
};



//通知事件 收到用户离开房间
enum objNtfUserLeave_keys // : objBaseEvent_keys
{
	objNtfUserLeave_userid = 10,
};
 
//响应事件 收到发消息成功或失败的应答
enum objMsgItem_keys
{
	objMsg_fromuserid = 10,
	objMsg_touserid   = 11,
	objMsg_msgdata    = 12,
	objMsg_msglen     = 13,
	objMsg_token      = 14,
	objMsg_msgtype    = 15,
	objMsg_msgtime    = 16,
};


enum objRespMsg_keys // : objRespEvent_keys
{ 
	//objMsgItem
};

//通知事件 收到用户发来的消息 objNtfMsg
enum objNtfMsg_keys // : objBaseEvent
{
	//objMsgItem
};
 
 
//通知事件 收到网络断开的消息
enum objNtfNetLost_keys{}; // : objNtfEvent_keys

//通知事件 收到网络重新连上的消息
enum objNtfNetResume_keys{};// : objNtfEvent_keys

//通知事件 收到账号异地登录的消息
enum objNtfDupLogined_keys{}; // : objNtfEvent_keys

 

__VALLEYAPI bool         Valley_InitSDK(const char* workfolder, const char* localconfig); //初始化SDK,一个进程只需要初始化一次
__VALLEYAPI void         Valley_CleanSDK();       //初始化SDK,一个进程只需要初始化一次
__VALLEYAPI const char*	 Valley_GetSDKVersion();  //获取SDK版本
__VALLEYAPI const char*	 Valley_GetErrDesc(int ec);     //获取错误码对应的描述
__VALLEYAPI void     	 Valley_SetAuthKey(const char* authkey);     //设置授权码


__VALLEYAPI handle_t     Valley_CreateChannel(bool withVideo);  //创建一个房间，是否需要支持视频
__VALLEYAPI void         Valley_Release(handle_t s);  //销毁一个房间

__VALLEYAPI int          Valley_EnableInterface(handle_t s, int iids);  //房间对象有效

__VALLEYAPI hevt_t       Valley_GetEvent(handle_t s);           //获取事件对象支持，不会阻塞，没有事件返回空支持，有事件返回事件结构支持，需要调用Valley_ReleaseEvent释放事件对象指针
__VALLEYAPI int          Valley_GetEventIntAttr(hevt_t he, int attrid);  //获取事件属性（返回整形）
__VALLEYAPI const char*  Valley_GetEventAttr(hevt_t he, int attrid);  //获取事件属性（返回字符串）
__VALLEYAPI void         Valley_ReleaseEvent(hevt_t he);  //释放事件对象指针

  
__VALLEYAPI int          Valley_Login(handle_t s, const char* channelid, const char* userid); //登录房间
__VALLEYAPI void         Valley_Logout(handle_t s);        //退出房间
__VALLEYAPI int          Valley_GetLoginStatus(handle_t s);  //获取登录状态

__VALLEYAPI int          Valley_SetChannelAttr(handle_t s, const char* name, const char* value);  // 设置房间属性
__VALLEYAPI int          Valley_SendMsgr(handle_t s, int msgtype, const char* data, int len, const char* token, const char* toUserID);  // 发送消息

__VALLEYAPI int          Valley_SetVideoProfile(handle_t s, int profile);   // 设置本地视频属性


__VALLEYAPI int          Valley_SetLocalVideo(handle_t s, hvideo_t hVideo);   // 设置本地视频显示窗口
__VALLEYAPI int          Valley_RemoveLocalVideo(handle_t s);   // 关闭本地视频显示

__VALLEYAPI int          Valley_SetUserVideo(handle_t s, const char* userid, hvideo_t hVideo);  // 设置用户视频显示窗口
__VALLEYAPI int          Valley_RemoveUserVideo(handle_t s, const char* userid);  // 关闭用户视频显示

__VALLEYAPI int          Valley_EnableLocalAudio(handle_t s, bool bEnable);  // 关闭或打开 本地语音
__VALLEYAPI int          Valley_EnableLocalVideo(handle_t s, bool bEnable);  // 关闭或打开 本地视频

__VALLEYAPI int          Valley_EnableRemoteAudio(handle_t s, const char* userid, bool bEnable); // 关闭或打开用户语音
__VALLEYAPI int          Valley_EnableRemoteVideo(handle_t s, const char* userid, bool bEnable); // 关闭或打开用户视频  

__VALLEYAPI int          Valley_DisableAudio(handle_t s, bool bDisabled); // 房间支持语音，默认支持, 视频房间只能在登录前调用一次，否则无效
__VALLEYAPI int          Valley_DisableVideo(handle_t s); // 房间支持视频，默认支持, 只能在登录前调用一次，否则无效
 
__VALLEYAPI int          Valley_SetCameraIndex(handle_t s, int index); // 设置摄像头
 
//消息房间支持 
__VALLEYAPI int          Valley_SetChannelAttr(handle_t s, const char* name, const char* value);  // 设置房间属性
__VALLEYAPI hobj_t       Valley_GetChannelAttr(handle_t s, const char* name);  //objString_keys  // 获取房间属性

__VALLEYAPI int          Valley_SetUserAttr(handle_t s, const char* uid, const char* name, const char* value); // 设置用户属性
__VALLEYAPI hobj_t       Valley_GetUserAttr(handle_t s, const char* uid, const char* name); //objString_keys  // 获取用户属性
 
__VALLEYAPI hobj_t       Valley_GetUser(handle_t s, const char* uid); // 获取用户
__VALLEYAPI hobj_t       Valley_GetUserList(handle_t hobj);  // 获取用户列表
__VALLEYAPI int          Valley_GetListCount(hobj_t hobj);   // 获取列表元素个数
__VALLEYAPI bool         Valley_NextItem(hobj_t hobj);       // 移动当前列表当前元素位置

__VALLEYAPI int          Valley_GetObjectIntAttr(hobj_t hobj, int attrid);  // 获取对象属性，列表为当前元素属性
__VALLEYAPI const char*  Valley_GetObjectAttr(hobj_t hobj, int attrid); // 获取对象属性，列表为当前元素属性
__VALLEYAPI const char*  Valley_GetObjectNameAttr(hobj_t hobj, const char* name);  // 获取对象属性，列表为当前元素属性
__VALLEYAPI void         Valley_ReleaseObject(hobj_t hobj);  // 释放对象，所有获取到 为 hobj_t 的对象，都需要通过此函数释放内存




//下面是简单调用的例子，登录了两个房间，一个类似IM功能，仅仅用来发消息，可以发用户邀请什么的，一个房间用来做视频通话
 
/*
  1) 初始化SDK
  const char* localconfig = "<?xml version=\"1.0\" encoding=\"utf-8\"?><root><localversion>1</localversion></root>";
  localconfig配置表示支持本地通信
  Valley_InitSDK("d:\\workfolder\", localconfig);

  handle_t channelim    = Valley_CreateChannel(false);   // 创建一个房间，不支持视频，用于im通信
  handle_t channelvideo = Valley_CreateChannel(true);    // 创建一个房间，支持视频，用于视音频通话 


  Valley_EnableInterface(channelim, IID_RTCMSGR);  //IM房间，只需要支持消息传递


  2）登录IM房间 
  const char* localimserver = "<?xml version=\"1.0\" encoding=\"utf-8\"?><root><mcu><channel>s-10.80.64.56:8002</channel></mcu></root>";
  Valley_SetChannelAttr(RESERVE_CHANNEL_ATTR_CONFIG, localimserver);
  Valley_Login(channelim, “98”, "123"); 

  3）登录视频房间  
  Valley_SetLocalVideo(channelvideo, m_hMyWnd); //设置本地视频窗口
  Valley_SetVideoProfile(channelvideo, VIDEO_CAPTURE_TYPE_4X3_640); //设置本地视频大小
  Valley_Login(channelvideo, “225”, "123");


  4） 定时取出房间里面的事件来处理
  void ontimer()
  {
      // 处理IM房间消息
      while(true)
	  {
         hevt_t e = Valley_GetEvent(channelim);
		 if(NULL == e)
		    break;

		  int evtid = Valley_GetEventIntAttr(e, objBaseEvent_evtid);
		  if(evttype > RTC_EVTID_NTF_FROM) 
		     process_im_notify_event(e); 
		  else 
		      process_im_resp_event(e);

		  Valley_ReleaseEvent(e);
	  }
	  
	  // 处理视音频房间消息
	  while(true)
	  {
		 hevt_t e = Valley_GetEvent(channelvideo);
		 if(NULL == he)
			  break;

		 int evtid = Valley_GetEventIntAttr(e, objBaseEvent_evtid);
		 if(evttype > RTC_EVTID_NTF_FROM)
			  process_av_notify_event(e);
		 else
			  process_av_resp_event(e);

		  Valley_ReleaseEvent(e);
	  } 
  }


  5）房间不用了，退出房间
  Valley_Logout(channelim);
  Valley_Logout(channelvideo);

  6） 销毁房间对象
  Valley_Release(channelvideo);  
  channelvideo = NULL;


  Valley_Release(channelim);
  channelim = NULL;

  7) 退出进程，释放SDK
  Valley_CleanSDK();
  */
