
<template>
    <div class="home">
        <div class="message position" >
            <img usemap="#Map" >
            <map name="Map" id="Map">
            <router-link to="/signHeader"><area shape="rect" coords="0,0,30,30" href="" ></router-link>
            </map>

        </div>
        <div class="sign position">
            <span class="redPoints" v-if="this.messageStatus"></span>
            <img usemap="#Map2" >
            <map name="Map2" id="Map2">
            <router-link to="/message"><area shape="rect" coords="0,0,30,30"  ></router-link>
            </map>
        </div>
        <div class="lessonCenter position">
             <img usemap="#Map3" >
            <map name="Map3" id="Map3">
             <router-link to="/coursehomepage"><area shape="rect" coords="0,0,30,30"  ></router-link>
            </map>
        </div>
        <div class="MyPersonPage position">
             <img usemap="#Map4" >
            <map name="Map4" id="Map4">
            <router-link to="/MyPage"><area shape="rect" coords="0,0,30,30" ></router-link>
            </map>
        </div>
        <div class="notice position " @click="showPopup" >
            <div class="notice-red" v-if="pointStatus" ></div>
        </div>
        <div class="bottomFont">
            <span class="mesasgeFont">签到</span>
            <span class="mesasgeFont">消息</span>
            <span class="mesasgeFont">课程中心</span>
            <span class="mesasgeFont">个人主页</span>
        </div>

        <van-popup v-model="show" get-container="body" closeable :overlay="false" round :style="{height:'20%'}" class="dialogInfo">
            <span class="content-inner">
                <div style="text-align:center" class="content-title">公告</div>
                <p style="text-align:center">{{title}}</p>
                <p>{{removeHTMLTag(content)}}</p>
            </span>
            </van-popup>
    </div>

</template>

<script>

import axios from 'axios'
export default {
    data(){
        return{
            show:false,//公告弹窗状态
            webSocket:null,//websocket长连接对象
            //url:'dev.home.rulaifozu.xiuzhenyuan.cn/a/u/notice/show',
            //type:'numberStatus',
            pointStatus:false,
            title:"",
            content:"",
            noticeId:0,
            bannerStatus:"",
            userDialogShow:"",
            //dialogInfo:false,
            messageStatus:false,
            messageLIst:[],
        }
    },
    mounted(){
         let weChatUrl=this.getNowPageUrl();
        console.log(weChatUrl)
        this.initeUserinfo(weChatUrl)
        console.log(window.location.href);
        //sessionStorage.clear();
    var userData=sessionStorage.getItem('dialogInfo')
        if(userData=='1'){//判定是否第一次进入页面
             this.show=false;
             console.log(userData)
        }else{
            this.show=true;
            console.log(userData)
        }

        sessionStorage.setItem('dialogInfo','1')
         //sessionStorage.clear();
        console.log(userData)
        //this.initeSocket();
        this.noticeInfo();

        this.messageStatusinfo();
        //this.redpointStatus();
        //this.initeUserinfo();

    },
    created(){
        //this.initeSocket();
        // let date=25
        // console.log(date)
        //
        // sessionStorage.setItem('dataID', JSON.stringify(date))

    },
    methods:{
        messageStatusinfo(){
            console.log(111)
            var _this=this
            axios.get('/a/message/home/List'
            ,{
                params:{
                    userId:JSON.parse(sessionStorage.getItem('dataID')),
                }
            }
            )
            .then(res=>{
                console.log(res)
                console.log()
                for(let x in res.data.data.list){
                    console.log(res.data.data.list[x].notice)
                    res.data.data.list[x].notice==0?_this.messageStatus=true:_this.messageStatus=false
                    console.log(_this.messageStatus)
                    if(_this.messageStatus){
                        break;
                    }
                    
                }
            })
            .catch(error=>{
                console.log(error)
            })
        },
        showPopup() {
            if(this.bannerStatus!="请求失败"){
            axios.get('/a/u/notice/read',{
                params:{
                    uid:JSON.parse(sessionStorage.getItem('dataID')),
                    nid:this.noticeId
                }
            })
            .then(res=>{
                if(res.data.code==200){
                    this.pointStatus=false;
                }
                console.log(res)
            })
            .catch(error=>{
                console.log(error)
            })
      this.show = true
      }else{
          this.show = true
      }
      },
       noticeInfo(){
           var _this=this
          axios.get('/a/u/notice/show')
          .then(res=>{
              console.log(111)
              _this.title=res.data.data.title
              _this.content=res.data.data.content
              _this.noticeId=res.data.data.id
              console.log(res)
              console.log(this.noticeId)
          })

          .catch(error=>{
              console.log(error)
          })
      },
      noticeStatus(){
            axios.get('/a/u/notice/selectRead',{
              params:{
                  uid:JSON.parse(sessionStorage.getItem('dataID')),
                  nid:this.noticeId
              }
          })

          .then(res=>{

              if(res.data.message=="请求失败"){

                  this.pointStatus=false;
                  this.bannerStatus="请求失败"
              }else{
                  this.pointStatus=true;
              }
              console.log(res)
          })
          .then(error=>{
              console.log(error)
          })
      },
      redpointStatus(){
          console.log(this.noticeId)
          //var _this=this
           axios.get('/a/u/notice/selectRead',{
              params:{
                  uid:JSON.parse(sessionStorage.getItem('dataID')),
                  nid:this.noticeId
              }
          })

          .then(res=>{

              if(res.data.message=="请求失败"){
                  this.pointStatus=false;
                  this.bannerStatus="请求失败"
              }
              console.log(res)
          })
          .then(error=>{
              console.log(error)
          })
      },

      initeSocket(){
        let url =`ws://${this.url}?${this.type}`
        this.webSocket= new WebSocket(url)
        this.webSocket.onopen=this.webSocketOnOpen
        this.webSocket.onclose=this.webSocketOnClose
        this.webSocket.onmessage=this.webSocketOnMessage
        this.webSocket.onerror=this.webSocketOnError
    },
    webSocketOnOpen(){//建立连接成功后的状态
        console.log('websocket连接成功')
    },
    webSocketOnMessage(res){//获取到后台消息的事件，操作数据的代码在onmessage中书写
        console.log(res);
        this.webSocket.send("发送数据")
    },
    webSocketOnClose(){//关闭连接
        console.log('websocket连接已关闭')
    },
    webSocketOnError(res){//连接失败的事件
    console.log('websocket连接失败');
    console.log(res);
    },

        getNowPageUrl(){//截取微信code码的信息字段
        var nowSize=window.location.search.substring(1);
        var nowUrl=nowSize.split('&');
        for(var i=0;i<nowUrl.length;i++){
            var pair =nowUrl[i].split("=");
            if(pair[0]=="code"){
                console.log(pair[1]);
                return pair[1];
            }
        }
    },
    removeHTMLTag(str) {
            str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
            //str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
            //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
            //str=str.replace(/ /ig,'');//去掉
            return str;
    },
     initeUserinfo(data){
         //var _this=this
        //console.log(aaaa)
         axios.get('/a/u/login/code',{params:{
             code:data
         }})
         .then(res=>{
             console.log(res)
             console.log(res)
             let date=res.data.data.id
             console.log(date)

             sessionStorage.setItem('dataID', JSON.stringify(date))
         })
         .catch(error=>{
             console.log(error)
         })
     }

    },




}
</script>

<style lang="scss" scoped>
img[src=""],img:not([src]){
      opacity:0;
 }
.home{
    background:url(../assets/homeBg.jpg) no-repeat;
    background-size: 100% 100%;
    display: flex;
    width: 100%;
    height: 100vh;
    position: absolute;
}
.position{
    position: absolute;
    //background-color: red;
}
.message{
    width: 37px;
    height: 38px;
    bottom: 12%;
    left: 28%;
}
.message img{
    width: 100%;
    height: 100%;
}
.mesasgeFont{
    //color: white;
    margin-left: 13px;
}
.sign{
      width: 37px;
    height: 38px;
     bottom: 12%;
    left: 41%;
}
.redPoints{
    width: 10px;
    height: 10px;
    background-color: #ff5722;
    border-radius: 100px;
    right: -22%;
    top: -24%;
    position: absolute;
}
.sign img{
    width: 100%;
    height: 100%;
}
.lessonCenter{
     width: 37px;
    height: 38px;
     bottom: 12%;
    left: 54%;
}
.lessonCenter img{
    width: 100%;
    height: 100%;
}
.MyPersonPage{
     width: 37px;
    height: 38px;
     bottom: 12%;
    left: 68%;
}
.MyPersonPage img{
    width: 100%;
    height: 100%;
}
.bottomFont{
    position: absolute;
    bottom: 6%;
    left: 28%;
    display: flex;
    justify-content: space-around;
    width: 56%;
    color:white;
}
.notice{
    background-image: url(../assets/notice.png);
    background-size: 100% 100%;
    width: 40px;
    height: 40px;
    bottom: 17%;
    transform: rotate(-36deg);
    left: 9%;
}
.notice-red{
    width: 8px;
    height: 8px;
    position: absolute;
    background-color: red;
    border-radius: 100px;
    left: 35px;
    margin-top: 10px;
}
.content-title{
    font-size: 18px;
}
.dialogInfo{
background-color: rgb(255,255,204);
color: #ff5722;
    width: 60%;
    padding: 5%;
}
</style>
