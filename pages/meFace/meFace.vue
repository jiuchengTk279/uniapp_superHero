<template>
	<view class="page page-fill">
		<view class="pending-wapper">
			<image id="face" :src="tempFace" class="pending-face" mode="scaleToFill"></image>
		</view>
		
		<view class="notice">
			<view class="notice-words">
				* 请从相册中选择等比宽高的图片噢~
			</view>
		</view>
		
		<view class="footer-opertor">
			<view class="opertor-words" @click="changePendingFace">
				重新选择
			</view>
			<view class="opertor-words" @click="upload">
				确认上传
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tempFace: ''
			}
		},
		methods: {
			// 重新选择头像
			changePendingFace() {
				var _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success(res) {
						// 获取临时路径
						var tempFilePath = res.tempFilePaths[0]
						_this.tempFace = tempFilePath
					}
				})
			},
			upload() {
				var _this = this
				var globalUser = _this.getGlobalUser('globalUser')
				
				uni.showLoading({
					mask: true,
					title: '上传中，请稍后'
				})
				
				uni.uploadFile({
					url: _this.serverUrl + '/user/uploadFace?userId=' + globalUser.id,
					filePath: _this.tempFace,
					name: 'file',
					header: {
						"headerUserId": globalUser.id,
						"headerUserToken": globalUser.userUniqueToken
					},
					success(res) {
						var resDataStr = res.data
						var resData = JSON.parse(resDataStr)
						// console.log(resData)
						if (resData.status === 200) {
							// 获得最新的用户数据
							var userInfo = resData.data
							uni.setStorageSync('globalUser', userInfo)
							uni.navigateBack({
								delta: 1
							})
						} else if (resData.status == 502 || resData.status == 500) {
							uni.showToast({
								title: res.data.msg,
								image: '../../static/icos/error.png',
								duration: 2000
							})
						}
					}, 
					complete() {
						uni.hideLoading()
					}
				})
			}
		},
		onLoad(params) {
			var tempFilePath = params.tempFilePath
			this.tempFace = tempFilePath
		}
	}
</script>

<style>
	@import url("meFace.css");
</style>
