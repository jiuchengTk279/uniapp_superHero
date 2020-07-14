<template>
	<view class="page page-fill">
		<view class="header">
			<view v-if="userIsLogin">
				<!-- <image src="../../static/icos/108x108.png" class="face"></image> -->
				<image :src="userInfo.faceImage" class="face"></image>
			</view>
			<view v-else>
				<image src="http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png" class="face"></image>
			</view>
			
			
			<view class="info-wapper" v-if="userIsLogin">
				<view class="nickname">
					<!-- Next 学院 -->
					{{ userInfo.nickname }}
				</view>
				<view class="nav-info">ID: <!-- 123sadsa33 --> {{ userInfo.id }}</view>
			</view>
			<view v-else>
				<navigator url="../registLogin/registLogin">
					<view class="nickname regist-login">
						注册/登录
					</view>
				</navigator>
			</view>
			
			
			<view class="set-wapper" v-if="userIsLogin">
				<image src="../../static/icos/settings.png" class="settings"></image>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userIsLogin: false,
				userInfo: {}
			}
		},
		methods: {
			
		},
		onShow() {
			var _this = this
			// 用户状态的切换
			// var userInfo = uni.getStorageSync('globalUser')
			// if (userInfo !== null && userInfo !== undefined && userInfo !== '') {
			// 	_this.userIsLogin = true
			// 	_this.userInfo = userInfo
			// } else {
			// 	_this.userIsLogin = false
			// 	_this.userInfo = {}
			// }
			
			// 使用挂载方法获取用户数据
			var userInfo = _this.getGlobalUser('globalUser')
			if (userInfo !== null) {
				_this.userIsLogin = true
				_this.userInfo =  userInfo
			} else {
				_this.userIsLogin = false
				_this.userInfo = {}
			}
			
		}
	}
</script>

<style>
	@import url("me.css");
</style>
