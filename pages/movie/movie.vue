<template>
	<view class="page">
		<!-- 视频播放 -->
		<view class="player">
			<video :src="trailerInfo.trailer" :poster="trailerInfo.poster" class="movie" controls></video>
		</view>
		
		
		<!-- 影片基本信息 -->
		<view class="movie-info">
			<image :src="trailerInfo.cover" class="cover"></image>
			<view class="movie-desc">
				<view class="title">{{ trailerInfo.name }}</view>
				<view class="basic-info">{{ trailerInfo.basicInfo }}</view>
				<view class="basic-info">{{ trailerInfo.originalName }}</view>
				<view class="basic-info">{{ trailerInfo.totalTime }}</view>
				
				<view class="basic-info">{{ trailerInfo.releaseData }}</view>
				
				<view class="score-block">
					<view class="big-score">
						<view class="score-words">综合评分：</view>
						<view class="movie-score">{{ trailerInfo.score }}</view>
					</view>
					
				</view>
				
				<view class="score-stars">
					<block  v-if="trailerInfo.score >= 0" >
						<TrailerStars :innerScore="trailerInfo.score" showNum="0"></TrailerStars>
					</block>
					
					<view class="price-counts">
						{{ trailerInfo.prisedCounts}} 人点赞
					</view>
				</view>
					
			</view>
		</view>
		
		<!-- 分割线 -->
		<view class="line-wapper">
			<view class="line"></view>
		</view>
		
		<!-- 剧情介绍 -->
		<view class="plots-block">
			<view class="plots-title">剧情介绍</view>
			<view class="plots-desc">{{ trailerInfo.plotDesc }}</view>
		</view>
		
		
		<!-- 演职人员 -->
		<view class="score-block">
			<view class="plots-title">演职人员</view>
			<scroll-view scroll-x class="scroll-list">
				
				<view class="actor-wapper" v-for="(director,staffIndex) in directorArray" :key="staffIndex">
					<image :src="director.photo" class="single-actor" mode="aspectFill" @click="lookStaffs" :data-staffIndex="staffIndex"></image>
					<view class="actor-name">{{ director.name }}</view>
					<view class="actor-role">{{ director.actName }}</view>
				</view>
				
				<view class="actor-wapper" v-for="(actor,actorIndex) in actorArray" :key="actorIndex">
					<image  :src="actor.photo" class="single-actor" mode="aspectFill" @click="lookStaffs" :data-staffIndex="actorIndex + directorArray.length"></image>
					<view class="actor-name">{{ actor.name }}</view>
					<view class="actor-role">{{ actor.actName }}</view>
				</view>
						
			</scroll-view>
		</view>
		
		
		<!-- 剧照 -->
		<view class="scroll-block">
			<view class="plots-title">剧照</view>
			<scroll-view scroll-x class="scroll-list">
				<image v-for="(img,index) in plotPicsArray" :key="index" class="plot-image" :src="img" mode="aspectFill" @click="lookMe" :data-imgIndex="index"></image>
			</scroll-view>
		</view>
		
	</view>

</template>

<script>
	import TrailerStars from '../../components/trailerStars/trailerStars.vue'
	
	export default {
		data() {
			return {
				trailerInfo: {},
				// 剧照
				plotPicsArray: [],
				// 导演列表
				directorArray: [],
				// 演员列表
				actorArray: []		
			}
		},
		components: {
			TrailerStars
		},
		methods: {
			lookMe(e) {
				var _this = this
				var imageIndex = e.currentTarget.dataset.index
				
				uni.previewImage({
					current: _this.plotPicsArray[index],
					urls: _this.plotPicsArray
				})
			},
			lookStaffs (e) {
				var _this = this
				var staffIndex = e.currentTarget.dataset.staffIndex
				// 拼接导演和演员的数组，成为一个新数组
				var directorArray = _this.directorArray
				var actorArray = _this.actorArray
				var newStaffArray = []
				newStaffArray = newStaffArray.concat(directorArray).concat(actorArray)
				
				var urls = []
				for (var i = 0; i < newStaffArray.length; i++) {
					var tempPhoto = newStaffArray[i].photo
					urls.push(tempPhoto)
				}
				
				uni.previewImage({
					current: urls[staffIndex],
					urls: urls
				})
			}
		},
		onLoad(params) {
			var _this = this
			// 获取上一个页面传入的参数
			var trailerId = params.trailerId
			
			// 通过api修改导航栏的属性
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#000000"
			});
			
			// 获取预告片的详细信息
			var serverUrl = _this.serverUrl
			uni.request({
				url: serverUrl + '/search/trailer/' + trailerId,
				method: 'POST',
				success: (res) => {
					if (res.data.status === 200) {
						var trailerInfo = res.data.data
						_this.trailerInfo = trailerInfo
					
						// 把剧照的字符串转换为json array
						var plotPicsArray = JSON.parse(trailerInfo.plotPics)
						_this.plotPicsArray = plotPicsArray
					}
				}
			})
			
			
			// 获取导演
			uni.request({
				url: serverUrl + '/search/staff/' + trailerId + '/1',
				method: 'POST',
				success: (res) => {
					if (res.data.status === 200) {
						_this.directorArray = res.data.data
						
					}
				}
			})
			
			
			// 获取演员
			uni.request({
				url: serverUrl + '/search/staff/' + trailerId + '/2',
				method: 'POST',
				success: (res) => {
					if (res.data.status === 200) {
						_this.actorArray = res.data.data
						
					}
				}
			})
		}
	}
</script>

<style>
	@import url('movie.css')

</style>
