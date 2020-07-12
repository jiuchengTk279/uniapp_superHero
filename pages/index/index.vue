<template>
	<view class="page">
		
		<!-- 轮播图  -->
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<!-- <swiper-item>
				<image src="../../static/carousel/batmanvssuperman.png" class="carousel"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/carousel/spiderman.png" class="carousel"></image>
			</swiper-item> -->
			<swiper-item v-for="(item, index) in carouselList" :key="index">
				<image :src="item.image" class="carousel"></image>
			</swiper-item>
		</swiper>
		
		
		<!-- 热门超英 -->
		<view class="page-block super-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/hot.png" mode="" class="hot-ico"></image>
				<view class="hot-title">
					热门超英
				</view>
			</view>
		</view>
		
		<scroll-view scroll-x="true" class="page-block hot">
				
				<!-- <view class="single-poster"> -->
				<view class="single-poster" v-for="(superhero,index) in hotSuperHeroList" :key="index">
					<view class="poster-wapper">
						<!-- <image src="../../static/poster/civilwar.jpg" class="poster"></image>
						<view class="movie-name">
							蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
						</view> -->
						
						<image :src="superhero.cover" class="poster"></image>
						<view class="movie-name">
							{{ superhero.name }}
						</view>
						
						<!-- <view class="movie-score-wapper">
							<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
							<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
							<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
							<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
							<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
							<view class="movie-score"> 9.1 </view>
						</view> -->
						
						<TrailerStars :innerScore="superheros.score" showNum="1"></TrailerStars>
					</view>
				</view>	
		</scroll-view>
		
		
		<!-- 热门预告 -->
		<view class="page-block super-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/interest.png" class="hot-ico"></image>
				<view class="hot-title">
					热门预告
				</view>
			</view>
		</view>
		
		<view class="hot-movies page-block">
			<video v-for="(trailer,index) in hotTrailerList" :key="index" :src="trailer.trailer" :poster="trailer.poster" controls class="hot-movie-single"></video>
		</view>
		
		
		<!-- 猜你喜欢 -->
		<view class="page-block super-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/guess-u-like.png" class="hot-ico"></image>
				<view class="hot-title">
					猜你喜欢
				</view>
			</view>
		</view>
		
		<!-- <view class="page-block guess-u-like">
			<view class="single-like-movie">
				<image src="" class="like-movie"></image>
				<view class="movie-desc">
					<view class="movie-title">
						蝙蝠侠大战超人
					</view>
					<TrailerStars innerScore="9.1" showNum="1"></TrailerStars>
					<view class="movie-info">
						2018 / 美国 / 科幻 / 动作
					</view>
					<view class="movie-info">
						大卫 / 科比
					</view>
				</view>
				<view class="movie-oper" @click="praiseMe">
					<image src="../../static/icos/praise.png" class="praise-ico"></image>
					<view class="praise-me">点赞</view>
					<view :animation="animationData" class="praise-me animation-opacity">+1</view>
				</view>
			</view>
		</view> -->
		
		<view class="page-block guess-u-like" v-for="(guess,gindex) in guessULikeList" :key="gindex">
			<view class="single-like-movie">
				<image :src="guess.cover" class="like-movie"></image>
				<view class="movie-desc">
					<view class="movie-title">
						{{ guess.name }}
					</view>
					<TrailerStars :innerScore="guess.score" showNum="1"></TrailerStars>
					<view class="movie-info">
						{{ guess.basicInfo }}
					</view>
					<view class="movie-info">
						{{ guess.releaseDate }}
					</view>
				</view>
				<view class="movie-oper" @click="praiseMe" :data-gIndex="gIndex">
					<image src="../../static/icos/praise.png" class="praise-ico"></image>
					<view class="praise-me">点赞</view>
					<view :animation="animationDataArr[gindex]" class="praise-me animation-opacity">+1</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	// import common from '../../common/common.js'
	import TrailerStars from '../../components/trailerStars/trailerStars.vue'
	
	export default {
		data() {
			return {
				carouselList: [],
				hotSuperHeroList: [],
				hotTrailerList: [],
				animationData: {},
				guessULikeList: [],
				animationDataArr: [
					{},{},{},{},{}
				]
			}
		},
		components: {
			TrailerStars
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.refresh()
		},
		// 页面卸载的时候，清除动画数据
		onUnload() {
			this.animationData = {}
			this.animationDataArr = [ {},{},{},{},{} ]
		},
		onLoad() {
			var _this = this
			
			// #ifdef APP-PLUS || MP-WEIXIN
			// 在页面创建的时候，创建一个临时动画对象
			this.animation = uni.createAnimation()
			// #endif
			
			// 获取common.js中的服务器地址
			// var serverUrl = common.serverUrl
			
			// 通过挂载到main.js中获取服务器的地址，作为全局变量
			var serverUrl = _this.serverUrl;
			
			// 请求轮播图数据
			uni.request({
				url: serverUrl + '/index/carousel/list',
				method: 'POST',
				success: (res) => {
					console.log(res.data)
					
					// 获取真实数据之前，务必判断状态是否为200
					if (res.data.status === 200) {
						var carouselList = res.data.data;
						_this.carouselList = carouselList;
					}
				}
			})
			
			
			// 查询热门超英
			uni.request({
				url: serverUrl + '/index/movie/hot?type=superhero',
				method: 'POST',
				success: (res) => {
					if (res.data.status === 200) {
						var hotSuperHeroList = res.data.data
						_this.hotSuperHeroList = hotSuperHeroList
					}
				}
			})
			
			
			// 查询热门预告
			uni.request({
				url: serverUrl + '/index/movie/hot?type=trailer',
				method: 'POST',
				success: (res) => {
					if (res.data.status === 200) {
						var hotTrailerList = res.data.data
						_this.hotTrailerList = hotTrailerList
					}
				}
			})
			
			
			// 猜你喜欢
			uni.request({
				url: serverUrl + '/index/guessULike',
				method: 'POST',
				success: (res) => {
					if (res.data.status === 200) {
						var guessULikeList = res.data.data
						_this.guessULikeList = guessULikeList
					}
				}
			})
			
			
		},
		methods: {
			refresh() {
				var _this = this
				
				uni.showLoading({
					// 开启遮罩
					mask: true
				})
				uni.showNavigationBarLoading()
				
				var serverUrl = _this.serverUrl;
				
				// 猜你喜欢
				uni.request({
					url: serverUrl + '/index/guessULike',
					method: 'POST',
					success: (res) => {
						if (res.data.status === 200) {
							var guessULikeList = res.data.data
							_this.guessULikeList = guessULikeList
						}
					},
					complete: () => {
						// 隐藏导航栏遮罩
						uni.hideNavigationBarLoading()
						// 隐藏遮罩展示
						uni.hideLoading()
						// 停止下拉刷新
						uni.stopPullDownRefresh()
					}
				})
			},
			// 实现点赞动画效果
			praiseMe(e) {
				// #ifdef APP-PLUS || MP-WEIXIN
				var gindex =  e.currentTarget.dataset.gindex
				console.log(gindex)
				
				// step 是动画队列
				// 构建动画数据，并且通过step来表示这组动画的完成
				this.animation.translateY(-60).opacity(1).step({
					duration: 400
				})
				
				 // 导出动画数据到view组件，实现组件的动画效果
				// this.animationData = this.animation.export()
				this.animationData = this.animation
				this.animationDataArr[gindex] = this.animationData.export()
				
				
				// 还原动画
				setTimeout(function() {
					this.animation.translateY(0).opacity(0).step({
						duration: 0
					})
					// this.animationData = this.animation.export()
					this.animationData = this.animation
					this.animationDataArr[gindex] = this.animationData.export()
				}.bind(this), 500)
				// #endif
			}
		}
	}
</script>

<style>
	@import './index.css';
</style>
