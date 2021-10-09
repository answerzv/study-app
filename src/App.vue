<template>
	<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
		<router-view v-if = "routerShow"/>
	</van-pull-refresh>
</template>

<script>
import { PullRefresh } from 'vant';   // 刷新组件
import { Notify } from 'vant';     // 通知组件

export default {
	name: 'App',
	provide(){
		return{
			reload:this.reload
		}
	},
	components: {
		[PullRefresh.name]: PullRefresh,
		[Notify.name]: Notify
	},
	data() {
		return {
			routerShow: true,   // 刷新页面
			isLoading: false    // 刷新图标
		}
	},
	mounted() {
		window.addEventListener('online', this.networkOn)   // 网络由异常到正常时触发
		window.addEventListener('offline', this.networkOff)  // 网络由正常常到异常时触发
	},
	methods: {
		reload(){
			this.routerShow=false
			this.$nextTick(function(){
				this.routerShow=true
			})
		},
		onRefresh() {    // 刷新页面函数
			this.routerShow = false
			this.$nextTick(() => {
				this.isLoading = false;
				this.routerShow = true	
			})
		},
		networkOn () {            // 网络由异常到正常时触发
			this.$notify({
				message: '网络恢复正常',
				duration: 1000,
				background: '#1989fa'
			});
		},
		networkOff () {           // 网络由正常常到异常时触发
			this.$notify({
				message: '网络连接错误',
				duration: 0
			});
		}
	}
}
</script>

<style lang="scss">
body {
	margin: 0;
	font-size: 12px!important;
}
.van-pull-refresh {
	width: 100%;
	min-height: 100vh;
}
</style>

