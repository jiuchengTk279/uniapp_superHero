<template>
	<view class="black">
		<!-- src="http://122.152.205.72:88/superhero/MARVEL/Venom/cover.jpg" -->
		<!-- <image src="http://122.152.205.72:88/superhero/MARVEL/Venom/cover.jpg" mode="widthFix" class="cover"></image> -->
		<image :src="cover" mode="widthFix" class="cover" @longpress="operator"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cover: ''
			}
		},
		methods: {
			operator() {
				var _this = this
				uni.showActionSheet({
					itemList: ['保存图片到本地'],
					success: function(res) {
						// 下标为 0 则下载
						if (res.tapIndex == 0) {
							uni.showLoading({
								title: '图片保存中'
							})
							uni.downloadFile({
								url: _this.cover,
								success: function(result) {
									// 获取下载图片文件的临时路径
									var tempFilePath = result.tempFilePath
									// 临时路径保存到相册中，但是 H5 不支持
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success: function() {
											uni.showToast({
												title: '保存成功',
												duration: 200
											})
										},
										complete: function() {
											uni.hideLoading()
										}
									})
								}
							})
						}
					}
				})
			}
		},
		onLoad(params) {
			var cover = params.cover
			this.cover = cover
			
			// 通过api修改导航栏的属性
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#000000"
			});
		}
	}
</script>

<style>
.black {
	background-color: #000000;
	width: 100%;
	height: 100%;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: fixed;
}
.cover {
	align-self: center;
}
</style>
