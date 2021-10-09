<template>
    <div class="message-width">
        <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>

        <div class="message-info" v-for="(d,index) in list" :key="index" v-show="index < pageSize">
            <div class="message-top">
                
                <span class="message-bell">
                    <span class="message-red" v-if="d.notice==1?false:true"></span>
                </span>
                <span class="message-lesson">{{d.title}}</span>
            </div>
            <div class="message-main">
                {{d.content}}
            </div>
            <div class="message-bottom">
                <span>
                    {{timeChange(d.pushTime)}}
                </span>
                <span>
                    <button class="lookfor"  @click="clickRed(d.id)">去看看</button>
                </span>
            </div>
        </div>

       </van-list>
    </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue';
import { List } from 'vant';

Vue.use(List);
export default {
    inject:['reload'],
    data(){
        return{
            info:4,
            //isLoading: false,
            redStatus:true,//小红点状态
            pageSize:4,//页面渲染条数
            list:[],
            messagetable:[],
            loading:false,
            finished:false,
        }
    },
    mounted(){
        this.messageList();
        console.log("test1")
        if(sessionStorage.getItem('loadingInfo')){
            this.pageSize=sessionStorage.getItem('loadingInfo')
        }
    console.log(1111);

    },
    methods:{
        timeChange(data){
            return this.$functions.timestamp(data)
        },
    messageList(){//消息列表
    var _this=this
    axios.get('/a/message/home/List'
    ,
    {
        params:{
            userId:JSON.parse(sessionStorage.getItem('dataID'))
        }
    }
    )
    .then(res=>{
        console.log(res)
        _this.list=res.data.data.list;
    })
    },
    clickRed(data){
        //this.redStatus=false;
        console.log(data)
        axios.get('/a/message/home/detail',{
            params:{
                userId:JSON.parse(sessionStorage.getItem('dataID')),
                id:data
            }
        })
        .then(res=>{
            console.log(res)
            this.reload();
        })
    },
      onLoad() {
          var _this=this;
      // 异步更新数据
      setTimeout(() => {
        for (let i = 1; i < Math.floor(_this.list.length/4); i++) {
          //this.list.push(this.list.length + 4);i
          _this.pageSize=_this.pageSize+4
          console.log(_this.pageSize)
        }

//        setTimeout(()=>{ 
//            console.log(_this.pageSize)
//         console.log(_this.list.length)
//            if(_this.pageSize<_this.list.length){
//             _this.pageSize=_this.pageSize+(_this.list.length-this.pageSize)
//         }
// console.log(_this.pageSize)
//         console.log(_this.list.length)
//         },500)
        //if(_this.pageSize)
        // 加载状态结束
        sessionStorage.setItem('loadingInfo',_this.pageSize)
        this.loading = false;

        // 数据全部加载完成
        
        if ( _this.pageSize>=_this.list.length ) {
          this.finished = true;
        }
      }, 2000);
    }
  
    }
}
</script>
<style>
.messageHeight{
    height: 100vh;
}
.message-width{
    width: 90%;
    margin: 0 auto;
}
.message-bell{
    background-image: url(../../assets/bell.png);
    background-size: 100%;
    width: 50px;
    height: 50px;
    border: 1px solid #999;
    border-radius: 100px;
    position: relative;
}
.message-info{
    padding:5%;
    border: 1px solid #dedede;
    box-shadow: 2px 2px 5px #dedede;
    margin-top: 15%;
}
.message-info:first-child{
    margin-top: 5%;
}
.message-lesson{
    margin-left: 15px;
    font-size: 18px;
    font-weight: bolder;
}
.message-top{
    display: flex;
    align-items: center;
    
}
.message-bottom{
    display: flex;
    justify-content: space-between;
    
    align-items: center;
    width: 95%;
    margin:20px auto 0 auto;
}
.lookfor{
    width: 75px;
    background-color: black;
    color: white;
    border-radius: 20px;
    line-height: 2
}
.message-main{
    margin-top: 20px;
}
.numberinfo{
    display: flex;
    margin-top: 20px;
}
.numberinfo hr{
    border: none;
    width: 30%;
    height: 1px;
    background-color: rgb(121, 121, 121)
}
.message-red{
    width: 8px;
    height: 8px;
    background-color: red;
    border-radius: 100px;
    position: absolute;
    right: 3px;
    top: 2px;
}
</style>