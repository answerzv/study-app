<template>
    <div class="search-all">
       <search-head @refresh="refresh" :show-hidden="showHidden"></search-head>
       <search-history v-if="showHidden" @refresh="refresh"></search-history>
       <search-result v-if="!showHidden"></search-result>
    </div>
</template>

<script>
import SearchHead from './components/SearchHead'
import SearchHistory from './components/SearchHistory'
import SearchResult from './components/SearchResult'

export default {
    name: 'Search',
    components: {
       SearchHead,          // 搜索部分
       SearchHistory,       // 搜索历史
       SearchResult,        // 搜索结果
    },
    data () {
        return {
            showHidden: true,   // 搜索历史,搜索结果。页面显示或隐藏
        }
    },
    created () {     // 刷新时判断是在历史页，还是搜索页
        if (sessionStorage.searchSH == undefined) {
            this.showHidden = true
        }
        else {
            this.showHidden = false
        }
    },
    methods: {
        refresh (val) {        // 搜索历史，搜索结果。显示隐藏
            if (val == 'request') {         // 搜索,点击标签。执行
                this.showHidden = true
                this.$nextTick(() => {
                    this.showHidden = false
                })
            } 
            else {                        // 取消时执行
                this.showHidden = true              
            }
        }
    },
    beforeRouteLeave(to, form, next) {
        if (sessionStorage.searchSH != undefined) {   // 离开页面，删除session，让初次进搜索页时在历史记录页面
            sessionStorage.removeItem('searchSH')
        }
        next()
    }
}
</script>

<style lang="scss" scoped>
.search-all {
    min-height: 100vh;
    background: #f2f2f2;
}
</style>