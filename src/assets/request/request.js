import axios from 'axios'

export default {
    course (data) {    // 课程搜索,除推荐外的主页
        return axios.get('/a/u/course/select', {
            params: data
        })
    },
    recommend (data) {    // 课程主页内推荐
        return axios.get('/a/u/course/home', {
            params: data
        })
    },
    banner () {        // banner轮播图
        return axios.get('a/u/banner/search')
    },
    courseDetails (id) {  // 课程详情
        return axios.get('/a/u/course/info?id=' + id)
    },
    makeSure (data) {     //查询课程是否购买 
        return axios.get('/a/u/course/makeSure', {
            params: data
        })
    },
    buyCourse (data) {   //购买课程
        return axios.post(`/a/u/course/pay?cid=${data.cid}&uid=${data.uid}`)
    }, 
    collect (data) {    //课程是否收藏 
        return axios.get(`a/u/collect/select?cid=${data.cid}&uid=${data.uid}`)
    },
    collectTrue (data) {   //课程收藏
        return axios.post(`/a/u/course/collect?cid=${data.cid}&uid=${data.uid}`)
    },
    collectFalse (data) {   //课程取消收藏
        return axios.delete(`/a/u/course/undoCollect?cid=${data.cid}&uid=${data.uid}`)
    }
}