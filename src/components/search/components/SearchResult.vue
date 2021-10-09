<template>
    <div class="search-result">
        <div class="outline van-hairline--surround" v-for="item in courseList" :key="item.id" @click="courseDetails(item)">
            <img class="img" :src="item.coursecover" >
            <div class="content">
                <div class="font-one">{{item.name}}</div>
                <div class="font-two">
                    已有{{item.buy}}人购买
                    <div class="price">￥{{item.price}}</div>
                </div>
            </div>
        </div>
        <van-loading v-if="loadingShow()" class="no-content">加载中...</van-loading>
        <div v-if="noCourse" class="no-content">没有搜索到任何内容</div>
    </div>
</template>
 
<script>
import { Loading } from 'vant';

export default {
    name: 'SearchResult',
    components: {
        [Loading.name]: Loading  // 使用加载标签
    },
    data () {
        return {
            courseList: [],    // 搜索后的课程列表
            noCourse: false,   // 没有课程时显示
        }
    },
    mounted () {
        this.requestCourse()   // 执行请求
        sessionStorage.searchSH = false   // 在当前页时刷新会在当前页(在Search中设置了)
        this.bus.$emit('searchHaedValue', this.$store.state.searchCourseValue);  // 刷新时把之前的搜索值传给搜索框
    },
    methods: {
        loadingShow () {    // 记载中是否显示
            if (this.courseList.length == 0 && this.noCourse == false) {
                return true
            }
            else {
                return false
            }
        },
        requestCourse () {   // 用搜索在vuex的值请求数据
            var gradeArray = [0, "一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "初一", "初二", "初三", "高一", "高二", "高三"],
                grade = gradeArray.indexOf(this.$store.state.grade),
                data = {
                    grade,
                    name: this.$store.state.searchCourseValue
            };
            this.$request.course(data)
            .then((success) => {
                var list = success.data.data.list 
                this.courseList = list
                console.log('搜索请求成功:', this.courseList)
                switch (list.length) {   // 判断没有课程文字是否显示
                    case 0: this.noCourse = true
                    break;
                    default: this.noCourse = false;
                }
            })
        },
        courseDetails (item) {   // 点击课程跳转到对应界面
            this.$router.push({path: '/coursedetails', query: item})
        }
    }
}
</script>

<style lang="scss" scoped>
[class*=van-hairline]::after {
    border-color: #7a7a7a;
}

.search-result {
    padding: 15px 27px 0;
    .outline {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        height: 95px;
        background: #ffffff;
        .img {
            margin-left: 10px;
            box-shadow: 0 0 0 2px #cccccc;
            height: 70px;
            width: 120px;
        }
        .content {
            box-sizing: border-box;
            padding: 3px 15px;
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
    .no-content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 144px;
        height: 30px;
        text-align: center;
        font-size: 16px;
    }
}
</style>