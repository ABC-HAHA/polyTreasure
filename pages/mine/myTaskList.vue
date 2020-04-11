<template>
	<view class="task_page">
		<view class="page_head"></view>
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view
				v-for="(tab, index) in tabBars"
				:key="tab.id"
				class="swiper-tab-list"
				:class="tabIndex == index ? '' : 'active'"
				:id="tab.id"
				:data-current="index"
				@click="tapTab"
			>
				{{ tab.name }}
			</view>
		</scroll-view>

		<no-data v-if="taskList.length == 0"></no-data>
		<view class="list_item" v-for="(tab, index) in taskList" :key="index" :id="tab.taskId" @tap="taskDetails(tab.taskId)">
			<image class="item_image" :src="tab.taskImg" mode=""></image>
			<view class="item_text">
				<view>{{ tab.taskName }}</view>
				<text>任务状态：{{ tab.status | statusing }}</text>
			</view>
			<view class="item_money">￥{{ tab.price }}</view>
		</view>
	</view>
</template>

<script>
import noData from '@/pages/mine/nodata.vue';
export default {
	components: {
		noData
	},
	data() {
		return {
			scrollLeft: 0,
			tabIndex: 0,
			tabBars: [{ id: 1, name: '图文分享' }, { id: 2, name: '视频分享' }, { id: 3, name: '链接分享' }],
			tabIndexTwo: 0,
			taskList: []
		};
	},
	onShow() {
		this.myTask();
	},
	methods: {
		async tapTab(e) {
			//点击tab-bar
			console.log(e.target);
			let tabIndex = e.target.dataset.current;
			if (this.tabIndex === tabIndex) {
				return false;
			} else {
				this.tabIndex = tabIndex;
			}
			console.log(this.tabIndex);
			this.myTask();
		},

		myTask() {
			uni.request({
				url: this.websiteUrl + '/api/task/myTask?typeId=' + this.tabIndex,
				header: {
					Authorization: this.$store.state.userInfo.token
				},
				success: res => {
					if (res.data.data) {
						this.taskList = res.data.data;
						console.log(this.taskList);
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		taskDetails(id) {
			// /pages/mine/login
			console.log(id);
			if (this.tabIndex == 0) {
				uni.navigateTo({
					url: '/pages/tuwenPromoting/detail/detail?esaId=' + id,
					animationType: 'slide-in-right'
				});
			} else if (this.tabIndex == 1) {
				uni.navigateTo({
					url: '/pages/shipinPromoting/detail/detail?esaId=' + id,
					animationType: 'slide-in-right'
				});
			} else {
				uni.navigateTo({
					url: '/pages/lianjiePromoting/detail/detail?esaId=' + id,
					animationType: 'slide-in-right'
				});
			}
		}
	},
	filters: {
		statusing: function(msg) {
			switch (msg) {
				case 0:
					return '待审核';
					break;
				case 1:
					return '审核中';
					break;
				case 2:
					return '审核完成';
					break;
				default:
					return '审核失败';
					break;
			}
		}
	}
};
</script>

<style lang="less" scoped>
.task_page {
	.page_head {
		width: 750upx;
		background-color: #f1f1f1;
		border-bottom: 1upx solid #888888;
	}
	.uni-swiper-tab {
		margin: 60upx auto;
		text-align: center;
		font-size: 36upx;
		font-weight: bolder;
		.swiper-tab-list {
			width: 200upx;
			padding: 20upx;
			display: inline-block;
			text-align: center;
			font-size: 36upx;
			color: #a5673f;
		}
	}
	.swiper-tab-list.active {
		color: #333333;
	}
	.list_item {
		width: 710upx;
		height: 251upx;
		border-radius: 20upx;
		margin-left: 20upx;
		box-shadow: 5px 5px 5px #bfbfbf;
		background: rgba(255, 255, 255, 1);
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin-top: 30upx;
		.item_image {
			width: 240upx;
			height: 240upx;
			border-radius: 10upx;
		}
		.item_text {
			width: 250upx;
			font-size: 34upx;
			margin: 10upx;
			color: #333333;
			font-weight: bolder;
			> view {
				margin: 30upx 0;
			}
			> text {
				font-size: 24upx;
				color: rgba(175, 175, 175, 1);
			}
		}
		.item_money {
			margin-right: 20upx;
			font-size: 40upx;
			color: #a5673f;
		}
	}
}
</style>
