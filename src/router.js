import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'

import MyPage from './components/mypage/MyPage'  // 我的页面
import MyCollection from '@/components/mypage/MyCollection'  // 我的收藏
import MyCourses from '@/components/mypage/MyCourses'  // 我的课程
import PersonalInfo from  '@/components/mypage/PersonalInfo' //编辑资料
import signHeader from './components/sign/signHeader'
import message from './components/message/message'
import CourseHomePage from './components/curoseHomePage/CourseHomePage' // 课程首页
import CourseDetails from './components/courseDetails/CourseDetails' // 课程首页
import Search from './components/search/Search'  // 搜索页面
Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
     
    },
    {
      path:'/MyPage',  // 我的
      name:MyPage,
      component: MyPage,
      meta:{
        requireLogin:true
      },
    },
    {
      path:'/MyCourses',  // 我的课程
      name:MyCourses,
      component:MyCourses,
      meta:{
        requireLogin:true
      },
    },
    {
      path:'/MyCollection',  // 我的收藏
      name:MyCollection,
      component:MyCollection,
      meta:{
        requireLogin:true
      },
    },
    {
      path:'/PersonalInfo',  //编辑资料
      name:'PersonalInfo',
      component:PersonalInfo,
      meta:{
        requireLogin:true
      },
    },
    {
      path:'/signHeader',
      name:signHeader,
      component:signHeader,
      meta:{
        requireLogin:true
      },
    },
    {
      path:'/message',
      name:'message',
      component:message,
      meta:{
        requireLogin:true
      },
    },
    {
      path:'/coursehomepage',  // 课程首页
      component: CourseHomePage,
      meta:{
        requireLogin:true
      },
    },
    {
      path:'/coursedetails',  // 课程详情
      component: CourseDetails,
      meta:{
        requireLogin:true
      },
    },
    {
      path:'/search',  // 搜索页面
      component: Search,
      meta:{
        requireLogin:true
      },
    }
  ]
})

// 0
export default router