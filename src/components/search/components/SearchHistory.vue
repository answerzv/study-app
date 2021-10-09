<template>
    <div class="search-history">
       <div>
           <span class="span-history">搜索历史</span>
           自动保存最近10条搜索
           <van-icon class="icon-delete" name="delete" @click="deleteBt" />
       </div>
       <div class="tag-history">
            <van-tag plain round v-for="(item, index) in tagHistoryList" :key="item">
               <div class="tag-history-font" @click="historyTagBt(item)">{{item}}</div>
               <van-icon class="icon-cross" name="cross" @click="crossBt(index)" />
            </van-tag>
       </div>
    </div>
</template>

<script>
import {Icon, Tag} from 'vant';

export default {
    name: 'SearchHistory',
    components: {
       [Icon.name]: Icon,
       [Tag.name]: Tag,
    },
    data () {
        return {
            tagHistoryList: JSON.parse(localStorage.searchHistory)  // 搜索历史记录。
        }
    },
    mounted () {          // 让页面刷新时，停留在当前页(在Search中设置了)
        if (sessionStorage.searchSH != undefined) {
            sessionStorage.removeItem('searchSH')
        }
    },
    methods: {
        crossBt (index) {   // x符号按钮
            var array = JSON.parse(localStorage.searchHistory);
            array.splice(index, 1)
            localStorage.searchHistory = JSON.stringify(array)
            this.tagHistoryList = array
        },
        deleteBt () {    // 回收站按钮
            localStorage.searchHistory = JSON.stringify([])
            this.tagHistoryList = []
        },
        historyTagBt (item) {  // 点击标签搜索
            this.$store.commit('searchCourseValue', item)
            this.$emit('refresh', 'request')
        }
    }
}
</script>

<style lang="scss" scoped>
.search-history {
    box-sizing: border-box;
    padding: 10px 23px 0 27px;
    .span-history {
        margin-right: 15px;
        font-size: 14px;
    }
    .icon-delete {
        float: right;
        font-size: 18px;
        line-height: 22px;
    }
    .tag-history {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        ::v-deep .van-tag {
            position: relative;
            margin: 0 5px 30px;
            border-radius: 20px;
            box-sizing: border-box;
            padding: 0 28px 0 8px;
            min-width: calc(100% / 3 - 10px);
            height: 27px;
            font-size: 13px;
            line-height: 26px;
            text-align: center;
        }
        ::v-deep .van-tag--round::after {
            border-radius: 30px;
        }
        .tag-history-font {
            margin-top: 1px;
            max-width: 260px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .icon-cross {
            position: absolute;
            right: 8px;
            top: 5.5px;
            font-size: 16px;
        }
    }
    
}
</style>