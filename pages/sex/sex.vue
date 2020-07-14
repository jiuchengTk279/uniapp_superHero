<template>
	<view class="page page-fill">
			
		<form @submit="formSubmitSex">
			
			<view class="page-block" style="margin-top: 20upx;">
				
				<radio-group class="radio-sex" @change="sexChange">
					<label class="radio-single">
						<radio value="1" :checked="sex == 1"/>男
					</label>
					<label class="radio-single">
						<radio value="0" :checked="sex == 0"/>女
					</label>
				</radio-group>
				
			</view>
			
			<button type="primary" form-type="submit" class="submitBtn">提交</button>
			
		</form>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				globalUser: {},
				sex: "-1"
			}
		},
		onLoad() {
			var _this = this
			var globalUser = _this. getGlobalUser('globalUser')
			_this.globalUser = globalUser
			_this.sex= globalUser.sex
		},
		methods: {
			sexChange(e) {
				this.sex = e.detail.value
			},
			formSubmitSex() {
				var _this = this
				var sex = _this.sex
				
				uni.request({
					url: _this.serverUrl + '/user/modifyUserinfo',
					data: {
						"userId": _this.globalUser.id,
						"sex": sex
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

</style>
