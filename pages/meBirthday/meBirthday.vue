<template>
	<view class="page page-fill">
			
		<form @submit="formSubmitBirthday">
			
			<view class="page-block" style="margin-top: 20upx;">
				<picker mode="date" @change="dateChange">
					<view class="birthday">{{birthday}}</view>
				</picker>
			</view>
			
			<button type="primary" form-type="submit" class="submitBtn">提交</button>
			
		</form>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				birthday: '',
				globalUser: {}
			}
		},
		onLoad() {
			var _this = this
			var globalUser = _this. getGlobalUser('globalUser')
			_this.globalUser = globalUser
			_this.birthday = globalUser.birthday
		},
		methods: {
			dateChange(e) {
				this.birthday = e.detail.value
			},
			formSubmitBirthday(e) {
				var _this = this
				var birthday = _this.birthday
				
				uni.request({
					url: _this.serverUrl + '/user/modifyUserinfo',
					data: {
						"userId": _this.globalUser.id,
						"birthday": birthday
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
	@import url("meBirthday.css");
</style>
