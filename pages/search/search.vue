<template>
	<view class="page">
		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/icos/search.png" class="search-ico"></image>
			</view>
				<input placeholder="搜索预告" maxlength="10" class="search-text" confirm-type="search" @confirm="searchMe" />
		</view>
			
			<view class="movie-list page-block">
				<!-- <view class="movie-wapper">
					<image src="" class="poster"></image>
				</view> -->
				<view class="movie-wapper" v-for="(trailer, index) in trailerList" :key="index">
					<image :src="trailer.cover" :data-trailerId="trailer.id" @click="showTrailer"  class="poster"></image>
				</view>
			</view>
			
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				trailerList: [],
				// 搜索的关键字
				keywords: [],
				// 当前第几页
				page: 1,
				// 总页数
				totalPages: 1
			}
		},
		methods: {
			showTrailer (e) {
				var trailerId = e.currentTarget.dataset.trailerid
				// 页面跳转接口 api
				uni.navigateTo({
					url: '../movie/movie?trailerId=' + trailerId
				})
			},
			pagedTrailerList(keywords, page, pageSize) {
				var _this = this
				uni.showLoading({
					mask: true,
					title: '请稍后...'
				})
				uni.showNavigationBarLoading()
				
				var serverUrl = _this.serverUrl
				// 查询搜索  热门超英/预告片 数据列表
				uni.request({
					url: serverUrl + '/search/list?keywords='+ keywords + '&page=' + page + '&pageSize=' + pageSize,
					method: 'POST',
					success: (res) => {
						if (res.data.status === 200) {
							var tempList = res.data.data.rows
							// 数组的拼接  concat
							_this.trailerList = _this.trailerList.concat(tempList)
							// 获取总页数
							_this.totalPages = res.data.data.total
							// 覆盖当前页面的 page
							_this.page = page
						}
					},
					complete: () => {
						uni.hideNavigationBarLoading()
						uni.hideLoading()
					}
				})
			},
			searchMe(e) {
				var _this = this
				// 获取到搜索的内容
				var value = e.detail.value
				_this.keywords = value
				_this.trailerList = []
				_this.pagedTrailerList(value, 1, 15)
			}
		},
		onLoad() {
			var _this = this
			uni.showLoading({
				mask: true,
				title: '请稍后...'
			})
			uni.showNavigationBarLoading()
			
			var serverUrl = _this.serverUrl
			// 查询搜索  热门超英/预告片 数据列表
			uni.request({
				url: serverUrl + '/search/list?keywords=&page=&pageSize=',
				method: 'POST',
				success: (res) => {
					if (res.data.status === 200) {
						var trailerList = res.data.data.rows
						_this.trailerList = trailerList
					}
				},
				complete: () => {
					uni.hideNavigationBarLoading()
					uni.hideLoading()
				}
			})
			
		},
		onReachBottom() {
			var _this = this
			// 查询下一页面，当前页数累加 1
			var page = _this.page + 1
			// 获得当前页面中 data 里的搜索值
			var keywords = _this.keywords
			// 获取总页数
			var totalPages = _this.totalPages
			
			// 如果当前需要分页的分页数和总页数相等，就不分页
			if (page > totalPages) {
				return
			}
			
			_this.pagedTrailerList(keywords, page, 15)
		}
	}
</script>

<style>
	@import url('search.css')

</style>
