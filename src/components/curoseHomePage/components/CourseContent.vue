<template>
    <div>
        <div class="course-name">{{this.$store.state.course}}课程</div>
        <div class="outline van-hairline--surround" 
            v-for="item in courseList" 
            :key="item.id"
            @click="courseDetails(item)">
                <img class="img" :src="item.coursecover" >
                <div class="content">
                    <div class="font-one">{{item.name}}</div>
                    <div class="font-two">
                        已有{{item.buy}}人购买
                        <div class="price">￥{{item.price}}</div>
                    </div>
                </div>
        </div>
        <van-loading v-if="courseList.length === 0"/>
        <van-divider v-if="courseList.length !== 0 && courseList!==false" class="bottom-line">没有更多了</van-divider>
        <div class="course-null" v-if="courseList === false">暂无课程</div>
    </div>
</template>

<script>
import { Loading, Divider } from 'vant';

export default {
    name: 'CourseContent',
    components: {
        [Loading.name]: Loading,
        [Divider.name]: Divider
    },
    data () {
        return {
            courseList: [],  //请求后的课程列表
            grade: ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "初一", "初二", "初三", "高一", "高二", "高三"]  //请求时年级换成数字
        }
    },
    created () {
        this.requestCourse()
    },
    methods: {
        requestCourse () {   // 请求对应年级、课程的函数
            var grade = this.grade.indexOf(this.$store.state.grade) + 1
            var data = {
                grade,
                subject: this.$store.state.course,
                name: ''
            }
            if (this.$store.state.course == "推荐") {
                delete data.subject
            }
            this.$request.course(data)
            .then((success) => {
                this.courseList = success.data.data.list
                if (data.subject == '推荐') {   // 判断推荐数量不超过110条
                    if (this.courseList.length > 10) {
                        this.courseList.length = 10;
                    }
                }
                if ( success.data.data.list.length == 0) { //为空时显示暂无该课程
                    this.courseList = false
                }
                console.log('课程请求成功:', success, this.courseList)
            })
        },
        courseDetails (item) {   // 点击课程跳转到对应界面
            this.$router.push({path: '/coursedetails', query: item})
        }
    }
}
</script>

<style lang="scss" scoped>
.course-name {
    margin: 20px 0 20px;
    font-size: 16px;
}


.outline {    // 复用之前的，看要不要提取
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    box-sizing: border-box;
    height: 95px;
    background: #ffffff;
    .img {
        margin-left: 10px;
        box-shadow: 0 0 0 2px #cccccc;
        width: 120px;
        height: 70px;
    }
    .content {
        box-sizing: border-box;
        padding: 3px 0 0 30px;
        width: calc(100% - 150px);
        height: 75px;
        .font-one {
            display: -webkit-box;
            height: 38px;
            font-size: 14px;
            text-align: justify;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical; 
            -webkit-line-clamp: 2;          
        }
        .font-two {
            margin-top: 17px;
            height: 12px;
            line-height: 12px;
        }
        .price {
            float: right;
        }
    }
}

.van-loading {
    margin-top: 40px;
    text-align: center;
}

.bottom-line {
    margin: 20px auto;
    border-color: #bfbfbf;
    width: 90%;
}
.course-null {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 66px;
    height: 20px;
    font-size: 16px;
}
</style>