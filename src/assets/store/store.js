import Vue from 'vue'
import Vuex from 'vuex'

import { apiAddress } from '@/assets/network/api';
import qs from 'qs';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        searchCourseValue: '',     // 搜索课程按钮值
        grade: '一年级',              // 年级
        course: '推荐',              // 课程
        userid:'',
      data:{
        image:'',
        name:'',
        sex:'请选择',    //性别
        phone:'请绑定手机号',
        grade:'',
        yzm:'',
        id:'25'
      },
    },
    mutations: {
      userInfo(data,id){
            data.data.id=id;
            console.log( data.data.id,'d')

        },
        searchCourseValue (state, data) {      // 改变搜索课程值
            state.searchCourseValue = data
        },
        gradeChange (state, data) {          // 改变年级
            state.grade = data
        },
        courseChange (state, data) {         // 改变课程
            state.course = data
        },
      getdata(state,res,home){
        state.data=res.data;
        state.userid=home;
        console.log(state.data)
      },
      vv(state, data) {          // 改变年级
        state.data.grade = data
      },
    },

  actions:{
    getdata: function (context) {

    var home=JSON.parse(sessionStorage.getItem('dataID'));
      var Userid=qs.stringify({
        id:home,
      })
      apiAddress(Userid).then(res => {
        console.log(res,'v');
        context.commit('getdata', res);
      });

    }
  },
})
