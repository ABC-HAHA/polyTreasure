<template>
	<div class="container">
		<wlpSwiperbBanner :data="swiperImg"></wlpSwiperbBanner>
		<view class="inner" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
			<refresh ref="refresh" @isRefresh="isRefresh"></refresh>
			<view class="nav"><navTab ref="navTab" :tabTitle="tabTitle" @changeTab="changeTab"></navTab></view>
			<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
			<swiper style="min-height: 100vh;" :current="currentTab" @change="swiperTab">
				<swiper-item v-for="(listItem, listIndex) in list" :key="listIndex">
					<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
						<view class="content">
							<!-- card -->
							<FaceContent :listItem="listItem" :current="currentTab"></FaceContent>
						</view>
						<view class="noCard" v-if="listItem.length === 0">暂无信息</view>
						<view style="width: 100%;height: 100upx;opacity:0;">底部占位盒子</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<unimask :show="type === 'update_show'" position="middle" :shareStatus="true">
			<view class="shareGroup">
				<!-- 遮罩 -->
				<!-- {{ pro }} -->
				<view class="shareGroup_pro"><cmd-progress :percent="pro" :stroke-width="24" stroke-color="linear-gradient(to right, #ef32d9, #89fffd)"></cmd-progress></view>
			</view>
		</unimask>
	</div>
</template>

<script>
import cmdProgress from '@/components/cmd-progress/cmd-progress.vue';
import unimask from '@/pages/mine/uni-popup.vue';
var self;
const util = require('@/util/util.js');
import refresh from '@/components/refresh.vue';
import navTab from '@/components/navTab.vue';
import wlpSwiperbBanner from '@/components/wlp-swiper-banner/wlp-swiper-banner.vue';
import FaceContent from '@/components/faceContent/faceContent.vue';
export default {
	data() {
		return {
			swiperImg: [],
			currentPage: 'index',
			toView: '', //回到顶部id
			tabTitle: ['图文', '视频', '链接', '广告🔱'], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			pages: [1, 1, 1, 1], //第几个swiper的第几页
			list: [[], [], [], []], //数据格式
			listArr: [],
			start: 0, //起始查询序号
			page: 10, //每页查询条数
			progress: 0, //进度条
			type: '' //显示遮罩
		};
	},
	methods: {
		toTop() {
			this.toView = '';
			setTimeout(() => {
				this.toView = 'top' + this.currentTab;
			}, 10);
		},
		changeTab(index) {
			this.currentTab = index;
		},
		// 其他请求事件 当然刷新和其他请求可以写一起 多一层判断。
		isRequest() {
			return new Promise((resolve, reject) => {
				this.pages[this.currentTab]++;
				console.log(this.currentTab);
				var that = this;
				setTimeout(() => {
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: `请求数据成功`
					});
					if (this.currentTab == 0) {
						if (that.tuwenData() === undefined) {
							return;
						} else {
							let newData = that.tuwenData();
						}
					} else if (this.currentTab == 1) {
						if (that.shipinData() === undefined) {
							return;
						} else {
							let newData = that.shipinData();
						}
					} else if (this.currentTab == 2) {
						if (that.lianjieData() === undefined) {
							return;
						} else {
							let newData = that.lianjieData();
						}
					} else if (this.currentTab == 3) {
						if (that.adData() === undefined) {
							return;
						} else {
							let newData = that.adData();
						}
					}

					resolve(newData);
				}, 1000);
			});
		},
		// swiper 滑动
		swiperTab: function(e) {
			var index = e.detail.current; //获取索引
			this.$refs.navTab.longClick(index);
		},
		// 加载更多 util.throttle为防抖函数
		lower1: util.throttle(function(e) {
			console.log(`加载${this.currentTab}`); //currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.isRequest().then(res => {
				let tempList = this.list;
				tempList[this.currentTab] = tempList[this.currentTab].concat(res);
				// console.log(tempList);
				this.list = tempList;
				this.$forceUpdate(); //二维数组，开启强制渲染
			});
		}, 300),
		// 刷新touch监听
		refreshStart(e) {
			this.$refs.refresh.refreshStart(e);
		},
		refreshMove(e) {
			this.$refs.refresh.refreshMove(e);
		},
		refreshEnd(e) {
			this.$refs.refresh.refreshEnd(e);
		},
		isRefresh() {
			setTimeout(() => {
				uni.showToast({
					icon: 'success',
					title: '刷新成功'
				});
				this.$refs.refresh.endAfter(); //刷新结束调用
			}, 1000);
		},
		// 查询任务列表
		tuwenData() {
			(self = this),
				uni.request({
					url: this.websiteUrl + '/api/comnet/list/1',
					method: 'GET',
					data: {
						start: self.start,
						page: self.page
					},
					success: function(res) {
						// console.log(res.data.data.list);
						//
						if (res.data.data.list && res.data.data.list.length >= 0) {
							self.listArr = res.data.data.list;
							self.list[0] = self.listArr;
							self.page += self.page;
							return self.list[0];
						}
					}
				});
		},
		// 查询任务列表
		shipinData() {
			(self = this),
				uni.request({
					url: this.websiteUrl + '/api/comnet/list/2',
					method: 'GET',
					data: {
						start: self.start,
						page: self.page
					},
					success: function(res) {
						if (res.data.data.list && res.data.data.list.length >= 0) {
							self.listArr = res.data.data.list;
							self.list[1] = self.listArr;
							self.page += self.page;
							return self.list[1], self.page;
						}
					}
				});
		},
		// 查询任务列表
		lianjieData() {
			(self = this),
				uni.request({
					url: this.websiteUrl + '/api/comnet/list/3',
					method: 'GET',
					data: {
						start: self.start,
						page: self.page
					},
					success: function(res) {
						if (res.data.data.list && res.data.data.list.length >= 0) {
							self.listArr = res.data.data.list;
							self.list[2] = self.listArr;
							// console.log(self.list[2]);
							self.page += self.page;
							return self.list[2], self.page;
						}
					}
				});
		},
		// 查询播广告列表
		adData() {
			(self = this),
				uni.request({
					url: this.websiteUrl + '/api/pic/query?picType=1',
					method: 'GET',
					success: res => {
						self.listArr = res.data.list;
						self.list[3] = self.listArr;
						// console.log(self.list[3]);
						return self.list[3], self.page;
					},
					fail: () => {},
					complete: () => {}
				});
		},
		// 查询轮播广告banner
		lunboData() {
			(self = this),
				uni.request({
					url: this.websiteUrl + '/api/pic/query?picType=0',
					method: 'GET',
					success: res => {
						self.swiperImg = res.data.list;
						// console.log(self.swiperImg);
					},
					fail: () => {},
					complete: () => {}
				});
		},

		// 跳转详情
		toDetail(id) {
			console.log(id);
			if (this.currentTab == 0) {
				uni.navigateTo({
					url: 'detail/detail?esaId=' + id
				});
			} else if (this.currentTab == 1) {
				uni.navigateTo({
					url: 'detail/detail?esaId=' + id
				});
			} else if (this.currentTab == 2) {
				uni.navigateTo({
					url: 'detail/detail?esaId=' + id
				});
			}
		},
		update() {
			//#ifdef APP-PLUS
			let that = this;
			let systemName = plus.os.name.toUpperCase();
			let versionNum;
			// let progress = 0;
			let downtimer;
			let appid = plus.runtime.appid;
			let upgradeCycle = 604800000;
			let lastTime = 0;
			uni.getStorage({
				key: 'version_update_time',
				success: function(res) {
					lastTime = res.data;
				}
			});
			plus.runtime.getProperty(appid, function(wgtinfo) {
				versionNum = plus.storage.getItem('app-id'); // wgtinfo.versionCode;
				// console.log(versionNum);
				// console.log(111111111111111111111111111111111111, wgtinfo);
				if (!versionNum) {
					versionNum = wgtinfo.versionCode;
				} else {
					versionNum = versionNum.replace(/\./g, '');
				}
				// console.log(systemName, versionNum);
				uni.request({
					url: that.websiteUrl + '/sys/checkversion',
					method: 'POST',
					data: {
						systemName: systemName,
						versionCode: versionNum
					},
					success: res => {
						console.log(res);
						let data = res.data;
						if (data.data) {
							console.log(123456);
							var currentVersion = data.data.versionName;
						}
						// plus.storage.setItem("app-id", res.data.data.versionName.toString());
						let currentTime = new Date();
						currentTime = currentTime.getTime();
						if (data.data != null) {
							// console.log(updateType)
							console.log(1234567);

							if (lastTime + upgradeCycle > currentTime) {
								return;
							}
							console.log(1234569);
							if (plus.networkinfo.getCurrentType() != 3) {
								if (data.data.versionWgtPath != '') {
									uni.showModal({
										title: '发现新版本',
										content: '有新的版本发布，检测到您当前为非Wifi连接，是否立即进行新版本下载？',
										showCancel: true,
										cancelText: '下次再说',
										confirmText: '现在更新',
										success: res => {
											if (res.confirm) {
												switch (systemName) {
													case 'ANDROID':
														let downloadTask = uni.downloadFile({
															url: data.data.versionWgtPath,
															success: function(res) {
																if (res.statusCode === 200) {
																	plus.runtime.install(
																		res.tempFilePath,
																		{
																			force: true
																		},
																		function() {
																			plus.storage.setItem('app-id', currentVersion.toString());
																			plus.nativeUI.toast('更新成功');
																			plus.runtime.restart();
																		},
																		function() {
																			plus.nativeUI.toast('更新失败');
																		}
																	);
																} else {
																	plus.nativeUI.toast('下载失败，请检查网络');
																}
															}
														});
														downloadTask.onProgressUpdate(function(res) {
															that.progress = res.progress;
														});
														clearInterval(downtimer);
														that.type = '';
														downtimer = setInterval(function() {
															that.type = 'update_show';
															that.$store.commit('changeProgress', that.progress);
															if (progress == 100) {
																clearInterval(downtimer);
																that.type = '';
																return;
															}
														}, 500);
														break;
													case 'IOS':
														uni.downloadFile({
															url: data.data.versionWgtPath,
															success: function(res) {
																if (res.statusCode === 200) {
																	plus.runtime.install(
																		res.tempFilePath,
																		{
																			force: true
																		},
																		function() {
																			plus.storage.setItem('app-id', currentVersion.toString());
																			plus.nativeUI.toast('更新成功');
																			plus.runtime.restart();
																		},
																		function() {
																			plus.nativeUI.toast('更新失败');
																		}
																	);
																} else {
																	plus.nativeUI.toast('下载失败，请检查网络');
																}
															}
														});
														break;
												}
											} else {
												let currentTapTime = new Date();
												currentTapTime = currentTapTime.getTime();
												uni.setStorage({
													key: 'version_update_time',
													data: currentTapTime,
													success: function() {
														console.log('保存成功');
													}
												});
												return;
											}
										},
										fail: () => {},
										complete: () => {}
									});
								}
								if (data.data.path != '') {
									uni.showModal({
										title: '发现新版本',
										content: '有新的版本发布，检测到您当前为非Wifi连接，是否立即进行新版本下载？',
										showCancel: true,
										cancelText: '下次再说',
										confirmText: '现在更新',
										success: res => {
											if (res.confirm) {
												switch (systemName) {
													case 'ANDROID':
														let downloadTask = uni.downloadFile({
															url: data.data.path,
															success: function(res) {
																if (res.statusCode === 200) {
																	plus.runtime.install(
																		res.tempFilePath,
																		{
																			force: true
																		},
																		function() {},
																		function() {
																			plus.nativeUI.toast('安装失败');
																		}
																	);
																} else {
																	plus.nativeUI.toast('下载失败，请检查网络');
																}
															}
														});
														downloadTask.onProgressUpdate(function(res) {
															that.progress = res.progress;
														});
														clearInterval(downtimer);
														that.type = '';
														downtimer = setInterval(function() {
															that.type = 'update_show';
															that.$store.commit('changeProgress', that.progress);
															if (progress == 100) {
																clearInterval(downtimer);
																that.type = '';
																return;
															}
														}, 500);
														break;
													case 'IOS':
														plus.runtime.openURL(data.data.path);
														break;
												}
											} else {
												let currentTapTime = new Date();
												currentTapTime = currentTapTime.getTime();
												uni.setStorage({
													key: 'version_update_time',
													data: currentTapTime,
													success: function() {
														console.log('保存成功');
													}
												});
												return;
											}
										},
										fail: () => {},
										complete: () => {}
									});
								}
							} else {
								if (data.data.versionWgtPath != '') {
									uni.showModal({
										title: '发现新版本',
										content: '有新的版本发布，是否立即进行新版本下载？',
										showCancel: true,
										cancelText: '下次再说',
										confirmText: '现在更新',
										success: res => {
											if (res.confirm) {
												switch (systemName) {
													case 'ANDROID':
														let downloadTask = uni.downloadFile({
															url: data.data.versionWgtPath,
															success: function(res) {
																if (res.statusCode === 200) {
																	plus.runtime.install(
																		res.tempFilePath,
																		{
																			force: true
																		},
																		function() {
																			plus.storage.setItem('app-id', currentVersion.toString());
																			plus.nativeUI.toast('更新成功');
																			plus.runtime.restart();
																		},
																		function() {
																			plus.nativeUI.toast('更新失败');
																		}
																	);
																} else {
																	plus.nativeUI.toast('下载失败，请检查网络');
																}
															}
														});
														downloadTask.onProgressUpdate(function(res) {
															that.progress = res.progress;
														});

														clearInterval(downtimer);
														that.type = '';
														downtimer = setInterval(function() {
															that.type = 'update_show';
															that.$store.commit('changeProgress', that.progress);
															if (progress == 100) {
																clearInterval(downtimer);
																that.type = '';
																return;
															}
														}, 500);
														break;
													case 'IOS':
														uni.downloadFile({
															url: data.data.versionWgtPath,
															success: function(res) {
																if (res.statusCode === 200) {
																	plus.runtime.install(
																		res.tempFilePath,
																		{
																			force: true
																		},
																		function() {
																			plus.storage.setItem('app-id', currentVersion.toString());
																			plus.nativeUI.toast('更新成功');
																			plus.runtime.restart();
																		},
																		function() {
																			plus.nativeUI.toast('更新失败');
																		}
																	);
																} else {
																	plus.nativeUI.toast('下载失败，请检查网络');
																}
															}
														});
														break;
												}
											} else {
												let currentTapTime = new Date();
												currentTapTime = currentTapTime.getTime();
												uni.setStorage({
													key: 'version_update_time',
													data: currentTapTime,
													success: function() {
														console.log('保存成功');
													}
												});
												return;
											}
										},
										fail: () => {},
										complete: () => {}
									});
								}
								if (data.data.path != '') {
									uni.showModal({
										title: '发现新版本',
										content: '有新的版本发布，是否立即进行新版本下载？',
										showCancel: true,
										cancelText: '下次再说',
										confirmText: '现在更新',
										success: res => {
											if (res.confirm) {
												switch (systemName) {
													case 'ANDROID':
														let downloadTask = uni.downloadFile({
															url: data.data.path,
															success: function(res) {
																if (res.statusCode === 200) {
																	plus.runtime.install(
																		res.tempFilePath,
																		{
																			force: true
																		},
																		function() {},
																		function() {
																			plus.nativeUI.toast('安装失败');
																		}
																	);
																} else {
																	plus.nativeUI.toast('下载失败，请检查网络');
																}
															}
														});
														downloadTask.onProgressUpdate(function(res) {
															that.progress = res.progress;
														});
														clearInterval(downtimer);
														that.type = '';
														downtimer = setInterval(function() {
															that.type = 'update_show';
															that.$store.commit('changeProgress', that.progress);
															if (progress == 100) {
																clearInterval(downtimer);
																that.type = '';
																return;
															}
														}, 500);
														break;
													case 'IOS':
														plus.runtime.openURL(data.data.path);
														break;
												}
											} else {
												let currentTapTime = new Date();
												currentTapTime = currentTapTime.getTime();
												uni.setStorage({
													key: 'version_update_time',
													data: currentTapTime,
													success: function() {
														console.log('保存成功');
													}
												});
												return;
											}
										},
										fail: () => {},
										complete: () => {}
									});
								}
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			});
			//#endif
		}
	},
	components: {
		wlpSwiperbBanner,
		refresh,
		navTab,
		FaceContent,
		unimask,
		cmdProgress
	},
	onLoad: function() {
		this.tuwenData();
		this.shipinData();
		this.lianjieData();
		this.adData();
		this.lunboData();
	},
	onShow() {
		this.update();
	},
	computed: {
		pro: function() {
			return this.progress;
		}
	}
};
</script>

<style lang="less" scoped>
.container {
	margin-top: 45upx;
}
.inner {
	width: 100vw;
	font-size: 28upx;
	min-height: 100vh;
	overflow: hidden;
	color: #6b8082;
	position: relative;
	background-color: #f6f6f6;
}
.content {
	width: 100%;
}

.noCard {
	width: 90%;
	height: 200upx;
	margin: auto;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #999999;
	box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.1);
	border-radius: 10upx;
}

.nav {
	color: white;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	font-size: 24upx;
	background-color: #ffffff;
	z-index: 996;
}
.shareGroup {
	width: 750upx;
	height: 480upx;
	background-image: url(~@/static/update_img.png);
	background-size: 100% 100%;
	margin-top: 150upx;
	margin-left: 30upx;
	color: #007aff;
	position: relative;
	.shareGroup_pro {
		position: absolute;
		top: 330upx;
		left: 10%;
		width: 600upx;
	}
}
</style>
