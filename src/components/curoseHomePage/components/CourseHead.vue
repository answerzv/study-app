<template>
    <div class="course-head">
        <!-- 第一行搜索 -->
        <div class="course-one-row">
            <div class="select" @click="gradeSelectBt">
                {{this.$store.state.grade}}
                <van-icon class="arrow-down" name="arrow-down" />
            </div>
            <van-search class="van-hairline--surround" @focus="searchBt" placeholder="请输入搜索关键词" v-model="searchValue" />
        </div>
		<van-popup v-model="gradeShow">
			<div class="set-grade">
				<div class="set-grade-font">设置年级</div>
				<div class="grade-out" v-for="(item,index) in gradeAll" :key="index">
					<div class="grade-title">{{item.name}}</div>
					<div class="bfc">
						<div :class="gradeBg(name)" v-for="(name,index) in item.grade" :key="index" @click="gradeBt(name)">{{name}}</div>
					</div>
				</div>
			</div>
		</van-popup>
        <!-- 第二行滑动导航，第三行轮播 -->
        <van-tabs class="course-slide" line-height="0" :border="false" @click="courseNameBt" v-model="courseNow">
            <van-tab v-for="(item,index) in courseAll" :title="item" :key="index"></van-tab>
        </van-tabs>
        <div v-show="course || lineShow" class="line"></div>
		<van-swipe v-if="!course" :autoplay="3000" indicator-color="#555555">
			<van-swipe-item v-for="(item,index) in banner" :key="index" @click="swiperBt(item)">
				<img :src="item.url" />
			</van-swipe-item>
		</van-swipe>
    </div>
</template>

<script>
import { Icon, Search, Popup, Tab, Tabs, Swipe, SwipeItem } from "vant";

export default {
	name: "CourseHead",
	props: ['lineShow'],
    components: {
        [Icon.name]: Icon, // 图标组件
        [Search.name]: Search, // 搜索组件
        [Popup.name]: Popup, // 遮罩组件
        [Tab.name]: Tab, // 滑动标签组件
        [Tabs.name]: Tabs, // 滑动标签组件
        [Swipe.name]: Swipe, // 轮播组件
        [SwipeItem.name]: SwipeItem // 轮播组件
    },
    data() {
        return {
            searchValue: "", // 搜索框的值
            gradeShow: false, // 选择年级是否显示
            gradeAll: [       // 选择年级的内容
                {name: "小学", grade: ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"]},
                {name: "初中", grade: ["初一", "初二", "初三"]},
                {name: "高中", grade: ["高一", "高二", "高三"]}
            ],
			courseAll: ["推荐", "数学", "英语", "语文", "物理", "化学", "生物", "历史"], //滑动标签课程
			courseNow: 0,
            banner: [],   // 轮播图存放地址
            course: 0     // 请求的课程,用来判断轮播是否显示
        };
    },
	created() {
		var store = this.$store.state
		if (store.course != "推荐") {
			this.course = true
			this.courseNow = this.courseAll.indexOf(store.course)
		}

		this.$request.banner()      //请求轮播图
		.then(success => {
			this.banner = success.data.data.list;
			this.banner.length = 3;
		});
	},
	methods: {
		// 第一块选择年级，搜索
		gradeBg(name) {      // 选择年级后的黑色背景
			if (name == this.$store.state.grade) {
				return "grade van-hairline--surround grade-bg";
			}
			else {
				return "grade van-hairline--surround";
			}
		},
		searchBt() {          // 搜索按钮进搜索页面
			this.$router.push("/search");
		},
		gradeSelectBt() {        // 选择年级显示
			this.gradeShow = true;
		},
		gradeBt(name) {        // 选择哪个年级
			this.$store.commit("gradeChange", name);
			this.$emit("refresh");
			this.gradeShow = false;
		},
		// 第二块滑动导航，轮播
		courseNameBt(index) {        // 点击课程
			var name = this.courseAll[index];
			this.course = index;
			this.$store.commit("courseChange", name);
			this.$emit("refresh");
		},
		swiperBt (item) {
			this.$router.push({path: '/coursedetails', query: item})
		}
	}
};
</script>

<style lang="scss" scoped>
// 第一块选择年级，搜索
.course-head {
	min-height: 114px;
}
.course-one-row {
    display: flex;
    flex-wrap: wrap;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	padding: 25px 20px 0;
	width: calc(100% - 40px);
	background: #ffffff;
    .select {
		box-sizing: border-box;
		padding-right: 20px;
		width: 105px;
		height: 34px;
		line-height: 34px;
		font-size: 18px;
		font-weight: 700;
    }
    .arrow-down {
		margin-left: 5px;
		vertical-align: -3px;
    }
    .van-search {
		width: calc(100% - 105px);
		height: 34px;
    }
    .van-search__content {
		background: #ffffff;
		padding-left: 0;
    }
    ::v-deep [class*="van-hairline"]::after {
		border-radius: 12px;
		border-color: #acacac !important;
    }
    ::v-deep .van-overlay {
		background-color: rgba(255, 255, 255, 0);
    }
    .van-popup--center {
        top: 270px;
    }
}

.set-grade {
	border: 1px solid #797979;
	width: 300px;
	height: 380px;
	.bfc {
		overflow: hidden;
	}
	.set-grade-font {
		display: inline-block; 
		margin: 20px 0 12px;
		width: 100%;
		height: 18px;
		text-align: center;
		font-size: 16px;
		font-weight: 700;
	}
	.grade-out {
		margin: 20px 0 12px 10px;
		.grade-title {
			font-size: 14px;
			font-weight: 700;
			margin-bottom: 15px;
		}
		.grade {
			float: left;
			border-radius: 30px;
			margin-left: 10%;
			margin-bottom: 12px;
			width: 20%;
			height: 25px;
			font-size: 13px;
			line-height: 24px;
			text-align: center;
		}
		::v-deep [class*="van-hairline"]::after {
			z-index: -1;
			border-radius: 30px;
		}
		.grade-bg {
			background: #8cb6c0;
		}
	}
}

// 第二块滑动导航，轮播
.course-slide {
	position: fixed;
	left: 20px;
	top: 59px;
	z-index: 999;
	box-sizing: border-box;
	padding-top: 10px;
	width: calc(100% - 40px);
	background: #ffffff;
	::v-deep .van-tab--active {
		font-weight: 700;
    }
    ::v-deep .van-tab {
		padding: 0;
		text-align: left;
    }
}
.line {
	position: fixed;
	left: 20px;
	top: 112px;
	z-index: 999;
    margin-left: -20px;
    border-bottom: 1px solid #bfbfbf;
    width: calc(100% + 40px);
    height: 1px;
	background: #ffffff;
}
.van-swipe {
	box-sizing: border-box;
    border: 5px solid #cccccc;
    margin: 116px auto 10px;
    width: 100%;
    height: 120px;
    img {
		width: 100%;
		height: 100%;
    }
}
::v-deep .van-swipe__indicator {
    background-color: white;
    opacity: 1;
}
</style>