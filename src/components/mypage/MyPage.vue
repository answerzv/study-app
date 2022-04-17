
<template>
  <div style=" background-color: #f2f2f2; height: 100vh ">

    <div  class="PersonalCenter-edit" @click="edit()" >  <!--style="padding-top: 6.5vh"-->
      <div class="left-View" >

          <img :src="$store.state.data.image" class="PersonalCenter-Avatar">


        <div>
          <span >{{$store.state.data.name}}</span>
          <span class="Edit-profile" >编辑资料</span>
        </div>
      </div>
      <div class="self-View">
        <van-icon name="arrow" />
      </div>
    </div>

    

    <div class="PersonalCenter-stock">
      <div class="Subset-stock">
        <div class="stock" >
          <div style="cursor:pointer" @click="course()">
            <div class="stock-map">
              <van-icon name="orders-o" />
            </div>
            <div>我的课程</div>
          </div>
          <div style="cursor:pointer" @click="collection()">
            <div class="stock-map">
              <van-icon name="like-o" />
            </div>
            <div>我的收藏</div>
          </div>
        </div>
      </div>
    </div>


    <div class="PersonalCenter-list">
      <div class="Subset-advisory" @click="Consultation()">
        <div class="left-mig">
         <div class="phone-map">
           <van-icon name="phone" />
         </div>
          <div>客服咨询</div>
        </div>
        <div class="arrow-map" >
          <van-icon name="arrow" />
        </div>
      </div>

      <div class="Subset-advisory" @click="news()" >
        <div class="left-mig">
         <div class="phone-map" style="position: relative">
          <van-icon name="chat-o" />
           <span v-show="red_spot" style="position:absolute;right: 0; top:3vh; width: 2vw; height:2.3vw; border-radius: 50%;background-color:red"></span>
         </div>
          <div>我的消息</div>
        </div>
        <div class="arrow-map" >
          <van-icon name="arrow" />
        </div>
      </div>

      <div class="Subset-advisory">
        <div class="left-mig">
         <div class="phone-map">
          <van-icon name="underway-o" />
         </div>
          <div>历史记录</div>
        </div>
        <div class="arrow-map" >
          <van-icon name="arrow" />
        </div>
      </div>

      <div class="Subset-advisory">
        <div class="left-mig">
         <div class="phone-map">
          <van-icon name="setting-o" />
         </div>
          <div>设置</div>
        </div>
        <div class="arrow-map" >
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import wx from 'weixin-js-sdk';
    import {apiAddHead,redRews} from '@/assets/network/api'
    import qs from 'qs'
    import {Dialog } from 'vant';
  export default {
      components: {

          [Dialog.Component.name]: Dialog.Component,

      },
    data(){
      return{
        red_spot:false,
        title:'我的',
          avatar: 'http://b-ssl.duitang.com/uploads/item/201606/07/20160607191023_isxzV.jpeg',
      }
    },
    methods:{
      course(){
        this.$router.push({path:"/Mycourses",query:{ id:1, }})  //课程

      },
        collection(){
          this.$router.push({path:"/MyCollection"})   //收藏
      },

      edit(){
        this.$router.push({path:"/PersonalInfo",query:{ id:1, }})
          let headUrl=qs.stringify({
              url:'http://dev.home.rulaifozu.xiuzhenyuan.cn/PersonalInfo'
          });

          apiAddHead( headUrl).then(res=>{
              this.WX =res.data;
              console.log(this.WX,'打印fffff');
              wx.config({
                  debug:true,
                  accessToken:this.WX.accessToken,
                  access_token:this.WX. access_token,
                  appId:this.WX.appId,
                  nonceStr:this.WX.nonceStr,
                  signature:this.WX.signature,
                  ticket:this.WX.ticket,
                  timestamp:this.WX.timestamp,
                  jsApiList:[
                      'chooseImage'
                  ]
              });


          });
      },

      off(){
        this.$router.push({path:"/"})
      },

        Consultation(){
            Dialog.confirm({
                title: '客服热线',
                message: '010-59478634'
            }).then(() => {
                // on confirm
            }).catch(() => {
                // on cancel
            });
        },

        news(){
            this.$router.push({path:"/message"})

        }




    },
      created(){
          this.$store.dispatch('getdata')
          var id=JSON.parse(sessionStorage.getItem('dataID'))
          let a=qs.stringify({
              userId:id
          })
          redRews(a).then(res=>{
              console.log(res);
              for (let i in res.data.list){
                  console.log(res.data.list[i].notice)
                  res.data.list[i].notice==0?this.red_spot=true:this.red_spot=false
              }
          })

      },
      mounted() {


      }
  }

</script>

<style src="./utils/style/Mypage.css" scoped> /*局部*/
</style>

