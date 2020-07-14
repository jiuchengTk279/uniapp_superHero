<template>
	<view class="page page-fill">
		<form @submit="formSubmitNickname" style="margin-top: 20upx;">
			<view class="page-block">
				<input type="text" name="nickname" :value="globalUser.nickname" class="input" placeholder="请输入昵称" placeholder-class="graywords" maxlength="10"/>
			</view>
			
			<button type="primary" form-type="submit" class="submitBtn"></button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				globalUser: {}
			}
		},
		onLoad() {
			var _this = this
			var globalUser = _this.getGlobalUser('globalUser')
			_this.globalUser = globalUser
		},
		methods: {
			formSubmitNickname(e) {
				var _this = this
				var nickname = e.detail.value.nickName
				
				uni.request({
					url: _this.serverUrl + '/user/modifyUserinfo',
					data: {
						"userId": _this.globalUser.id,
						"nickname": nickname
					},
					header: {
						"headerUserId": _this.globalUser.id,
						"headerUserToken": _this.globalUser.userUniqueToken
					},
					method: 'POST',
					success(res) {
						var resData = res.data
						if (resData.status == 200) {
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
					}
				})
			}
			
		}
	}
</script>

<style>
	@import url("meNickName.css");
</style>
