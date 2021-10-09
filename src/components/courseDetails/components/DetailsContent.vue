<template>
    <div>
        <van-tabs class="nav-bar van-hairline--top">
            <van-tab title="详情">
                <div class="content-font">
                    <div class="details-title">{{this.name}}</div>
                    <!-- <div class="details-content">{{this.content}}</div> -->
                    <div class="details-content" v-html="content"></div>
                </div>
            </van-tab>
            <van-tab title="相关推荐">
                <div class="content-font">
                    <div class="recommend-title">推荐课程</div>
                    <div class="recommend-img">进入主页发现更多课程</div>
                </div>
            </van-tab>
        </van-tabs>
        <div class="bottom van-hairline--top">
            <div class="price" v-if="!priceShow" @click="buyBt">课程价格￥{{this.price}}</div>
            <div class="price" v-else>已购买</div>
            <van-rate @click.native="collectBt" v-model="collect" icon="like" void-icon="like-o" :count="1" size="24" color="#ee0a24"/>
        </div>
    </div>
</template>

<script>
import { Tab, Tabs, Rate, Dialog, Notify } from 'vant';

export default {
    name: 'DetailsContent',
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Rate.name]: Rate,
        [Dialog.name]: Dialog,
        [Notify.name]: Notify
    },
    data () {
        return {
            name: '',    // 课程名称
            content: '', // 课程价格
            price: '',   // 课程详情
            priceShow: '', //是否显示已购买
            collect: 0,  // 收藏颜色假 
            collectTrue: 0, // 收藏颜色真
            UidCid: ''   //请求用的课程id，用户id
        }
    },
    created () {
        var home=JSON.parse(sessionStorage.getItem('dataID'));
        this.UidCid = {  //请求用的课程ID，用户ID
            cid: this.$route.query.id,
            uid: home
        }

        this.$request.courseDetails(this.$route.query.id)  //请求课程内容
        .then((success) => {
            ({name: this.name, content: this.content, price: this.price} = success.data.data) //接收路由传过来的课程参数
        });

        this.$request.makeSure(this.UidCid)   //是否显示已购买
        .then(data => {
            if(data.data.code != 401) {
                this.priceShow = true
            }
        })

        this.$request.collect(this.UidCid)  //查看是否收藏
        .then((success) => {
            this.collect = success.data.data
            this.collectTrue = success.data.data
        })
    },
    methods: {
        buyBt () {  //购买课程
            Dialog.confirm({    
                message: "是否购买该课程"
            })
            .then(() => {
                this.$request.buyCourse(this.UidCid)
                .then(() => {
                    Notify({ type: 'success', message: '购买成功' })
                    this.priceShow = true
                    this.bus.$emit("layerChange")  //关闭兄弟组件遮罩层
                })
                
            })
            .catch(() => {})
        },

        collectBt () { //收藏/取消收藏
            this.collect = this.collectTrue
            Dialog.confirm({    
                message: this.collectTrue == 0? "是否收藏该课程":"是否取消收藏该课程"
            })
            .then(() => {
                if (this.collectTrue == 0) {
                    this.$request.collectTrue(this.UidCid)   //课程收藏
                    .then((success) => {
                        console.log(success,1111111)
                        Notify({ type: 'success', message: '成功收藏' })
                        this.collect = 1
                        this.collectTrue = 1
                    }) 
                }
                else {
                     this.$request.collectFalse(this.UidCid)  //课程取消收藏
                    .then((success) => {
                        console.log(success,22222222)
                        Notify({ type: 'success', message: '取消收藏成功' })
                        this.collect = 0
                        this.collectTrue = 0
                    }) 
                }
            })
            .catch(() => {})
        }
    }
}
</script>

<style lang="scss" scoped>
.nav-bar {
    margin-top: 20px;
    ::v-deep .van-tabs__wrap, ::v-deep .van-tab {
        height: 54px;
        line-height: 54px;
    }
    ::v-deep .van-tabs__line {
        background-color: #027db4;
    }
}
.content-font {
    box-shadow: border-box;
    padding: 0 35px;
    .details-title {
        font-size: 13px;
        font-weight: 700;
        line-height: 50px;
        text-align: center;
    }
    .details-content {
        margin-bottom: 55px;
        line-height: 20px;
        text-align: justify;
    }
    .recommend-title {
        @extend .details-title;
        text-align: left;
    }
    .recommend-img {
        margin: 40px auto;
        box-sizing: border-box;
        padding-top: 90px;
        width: 120px;
        height: 110px;
        text-align: center;
        background: url(~@/assets/img/detailes.png) center 0/ 90px 70px no-repeat;
    }
}

.bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #ffffff;
    .price {
        border-radius: 50px;
        margin: 10px auto;
        width: 60%;
        line-height: 30px;
        text-align: center;
        color: #ffffff;
        background-color: #169bd5;
    }
    .van-rate {
        position: absolute;
        top: 12px;
        right: 6%;
    }
}

::v-deep [class*=van-hairline]::after {
    border-color: #797979;
}
</style>