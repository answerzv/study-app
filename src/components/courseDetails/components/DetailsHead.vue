<template>
    <div>
        <div v-if="layer" class="layer" @click="layerBt"></div>
        <video :src="videoUrl" controls></video>
        <div class="font van-hairline--bottom">
            <div class="title">{{name}}</div>
            <div class="time">{{time}}</div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';

export default {
    name: 'DetailsHead',
    components: {
        [Toast.name]: Toast, // 提示组件
    },
    data () {
        return {
            videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',  // 视频地址
            layer: true,    // 遮罩层
            name: '',  // 课程名字
            time: ''   // 课程时间
        }
    },
    created () {
        this.$request.courseDetails(this.$route.query.id)  //请求课程内容
        .then((success) => {
            ({videocover: this.videoUrl,name: this.name, update_at: this.time} = success.data.data)//课程标题时间传给data数据
            var date = new Date(Number(this.time)),    // 时间戳转时间
            yera = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();
            this.time =  yera + '-' + month + '-' + day
        });

        var home=JSON.parse(sessionStorage.getItem('dataID'));
        var data = {                       // 请求接口，是否购买,关闭/打开遮罩层
            uid: home,
            cid: this.$route.query.id
        },
        that = this;
        this.$request.makeSure(data)
        .then(data => {
            if (data.data.code == 200) {     
                that.layer = false
            }
        })

        this.bus.$on("layerChange", () => {  //接受兄弟组件的购买，关闭遮罩层
            this.layer = false;
        })
    },
    methods: {
        layerBt () {  // 点击遮罩层提示购买
            this.$toast('请先购买课程');
        }
    }
   
}
</script>

<style lang="scss" scoped>
.layer {
    position: absolute;
    left: 0;
    top: 10px;
    z-index: 2;
    width: 100%;
    height: 178px;
}
video {
    display: block;
    margin: 10px 0 0;
    width: 100%;
    height: 178px;
}
.font {
    padding: 15px 18px;
    height: 50px;
    .title {
        margin-bottom: 13px;
        font-size: 14px;
    }
    .time {
        font-size: 12px;
    }
}
::v-deep [class*=van-hairline]::after {
    border-color: #797979;
}
</style>