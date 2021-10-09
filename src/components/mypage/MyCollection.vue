<template>

      <van-list
        finished-text="没有更多了"
        @load="onLoad"
        :finished="finished"
      >
        <div v-show="notcourse" style="margin-top: 15vw; text-align: center">您没有收藏课程</div>
        <div v-show="course" style="width: 100%; display: flex ; justify-content: center">
        <div @click="cf()" style=" border-radius:5px; margin-top: 12vw; width:30vw; border: 1px solid black;height: 12vw; display: flex;justify-content: center;align-items: center">去看看</div>
        </div>
        <div v-for="item in list.data" :key="item" :title="item"  @click="getdata(item)"   class="course-main">
          <div class="course-row" >
            <div class='maintop'  ><img  :src="item.coursecover"></div>
            <div class="main-bottom" >
              <div class="introduce" >{{item.content}}</div>
              <div class="element">￥{{item.price}}</div>
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
                // title: '我的收藏',
                list: {
                    data:[]
                },
                // loading: false,
                finished: false, //没有更多了
                // isLoading: false
                notcourse:true,
                course:true
            }
        },
        methods: {
            // onRefresh() {
            //     setTimeout(() => {
            //         // this.$toast('刷新成功');
            //         // this.isLoading = false;
            //         this.count++;
            //         for (let i = 0; i < 3; i++) {
            //             this.list.push(this.list.length + 1);
            //         }
            //     }, 500);
            // },
            //刷新

            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    // for (let i = 0; i < 1; i++) {
                    //     this.list.data.push(this.list.data.length);
                    //     // this.list.data.pop()(this.list.data.length);
                    // }
                    // 加载状态结束
                    // this.loading = true;
                    //
                    // // 数据全部加载完成
                    // if (this.list.data.length >= 1) {
                    //     this.finished = true;
                    // }
                    this.finished = true; //没有更多了
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
            Axios.get('/a/u/collections?'+a).then(res=>{

               this.list.data=res.data.data;
               console.log(this.list.data,'p')
                var list={};
                var arr=this.list.data;
                for(var key in arr){
                    list[key]=arr[key].name
                }
                // console.log(list[key].id,'kk');
                this.listdata=list[key]
                console.log(this.listdata)
                if( this.listdata==undefined) {
                    this.notcourse=true;
                    this.course=true;

                }else {
                    this.notcourse=false;
                    this.course=false;

                }
            })


        },

    }
</script>


<style src="./utils/style/Mypage.css" scoped> /*局部*/
</style>
