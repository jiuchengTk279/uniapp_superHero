<template name="trailerStars">
	<view class="movie-score-wapper">
		<!-- <image src="../../static/icos/star-yellow.png" class="star-ico"></image>
		<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
		<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
		<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
		<image src="../../static/icos/star-gray.png" class="star-ico"></image>
		<view class="movie-score">9.1</view> -->
		
		<image v-for="(yellow, index1) in yellowScore" :key="index1" src="../../static/icos/star-yellow.png" class="star-ico"></image>
		<image v-for="(gray, index2) in grayScore" :key="index2" src="../../static/icos/star-gray.png" class="star-ico"></image>
		<view class="movie-score" v-show="showNum == 1">{{ innerScore }}</view>
	</view>
</template>

<script>
	export default {
		// name: 'trailerStars',
		data() {
			return {
				yellowScore: 0,
				grayScore: 5
			};
		},
		props: {
			// 定义外部传入的分数
			innerScore: 0,
			// 是否需要显示具体的分数  1：显示  0：不显示
			showNum: 0
		},
		// 生命周期，组件创建完成后被调用
		created() {
			var templScore = 0;
			if (this.innerScore != null && this.innerScore != undefined && this.innerScore != '') {
				templScore = this.innerScore
			}
			
			var yellowScore = parseInt(templScore / 2)
			var grayScore = 5 - yellowScore
			
			this.yellowScore = yellowScore
			this.grayScore = grayScore
		}
	}
</script>

<style>
	.movie-score-wapper {
		display: flex;
		flex-direction: row;
	}
	.star-ico {
		width: 20upx;
		height: 20upx;
		margin-top: 6px;
	}
	.movie-score {
		font-size: 12px;
		color: grey;
		margin-left: 8upx;
		margin-top: 6upx;
	}
</style>
