<template>
    <van-list
      finished-text="没有更多了"
      @load="onLoad"
      :finished="finished"
    >
      <div v-show="notcourse" style="margin-top: 15vw; text-align: center">您没有购买课程</div>
      <div v-show="course" style="width: 100%; display: flex ; justify-content: center">
        <div @click="cf()" style="border-radius:5px; margin-top: 12vw; width:30vw; border: 1px solid black;height: 12vw; display: flex;justify-content: center;align-items: center">去看看</div>
      </div>
      <div v-for="(itm,index) in curriculum.data" :key="index" :title="itm"  class="course-main">
        <div class="course-row" >
          <div class='maintop'  ><img  :src="itm.coursecover"></div>
          <div class="main-bottom" >
            <div class="introduce" >{{itm.name}}</div>
            <div @click="getdata(itm)" style="color:white;background-color:#1d7ad9;width: 20vw; height: 4vh; float: right;display: flex;align-items: center;justify-content: center;border-radius: 7px;font-size: 2vh;">去学习</div>
          </div>
        </div>
      </div>

    </van-list>
</template>

<script>

    import Axios from "axios";
    import qs from 'qs'
  export default {

      data() {
          return {
              // title: '我的课程',
              curriculum:{
                  data:[]

              },

              finished: false, //没有更多了
              notcourse:false,
              course:false
          }
      },
      methods: {


      onLoad() {
          // 异步更新数据
          setTimeout(() => {

                  this.finished = true;

          }, 500);

      },

      //下拉刷新




          getdata(a){
              let  listId={id:a.id}
              console.log(listId,'bv')
              this.$router.push({path:'/coursedetails', query: listId})
          },
          cf(){
              this.$router.push({path:'/coursehomepage'})
          }
      },

      created() {   //初始化获取列表数据
          var home=JSON.parse(sessionStorage.getItem('dataID'));
          let a=qs.stringify({
              uid:home,
          })
          Axios.get('/a/u/course/mine?'+a).then(res=>{

              this.curriculum=res.data;
              var list={};
              var arr=this.curriculum.data
              for(var key in arr){
                  list[key]=arr[key].name
              }
              // console.log(list[key].id,'kk');
              this.listdata=list[key]
              console.log(this.listdata)
              if( this.listdata==undefined) {
                  this.notcourse=true;
                  this.course=true

              }else {
                  this.notcourse=false;
                  this.course=false
              }
          })


      },



      }



</script>

<style src="./utils/style/Mypage.css" scoped> /*局部*/
</style>
