<template>
    <div class="course-home-page" @scroll="lineShowFunc">
        <course-head @refresh="refreshFuc" :lineShow="lineShow"></course-head>
        <course-content v-if="showHidden"></course-content>
    </div>
</template>

<script>
import CourseHead from './components/CourseHead'
import CourseContent from './components/CourseContent'

export default {
    name: 'CourseHomePage',
    components: {
        CourseHead,
        CourseContent,
    },
    data () {
        return {
            showHidden: true,   // 课程内容显示隐藏
            lineShow: false    // 子组件看是否显示横线
        }
    },
    methods: {
        refreshFuc () {  // 选择年级，课程时触发: 课程内容显示隐藏
            this.showHidden = false
            this.$nextTick(() => {
                this.showHidden = true
            })
        },
        lineShowFunc (e) {     // 计算高度传值给子组件看是否显示横线
            if (e.target.scrollTop > 120) {
                this.lineShow = true;
            }
            else {
                this.lineShow = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.course-home-page {
    padding: 0 20px;
    overflow: auto;
    height: 100vh;
    background: #ffffff;
}
</style>