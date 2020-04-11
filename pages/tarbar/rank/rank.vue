<template>
	<div class="container">
		<view class="rankbox" v-for="(item, index) in rankListData" :key="index">
			<image :src="item.wexinImg" mode="widthFix"></image>
			<view class="rank_list">
				<view class="rank_name">{{ item.weixinNickname }}</view>
				<view class="rank_price">提现{{ item.withdrawalAmount }}元</view>
			</view>
		</view>
		<Loading :loadingType="loadingType" :showFalg="showFalg"></Loading>
	</div>
</template>

<script>
import Loading from '../../../components/loading/loading.vue';
var self;
export default {
	data() {
		return {
			rankListData: [],
			start: 0, //起始查询序号
			page: 10, //每页查询条数
			showFalg: true,
			loadingType: 0 //0，加载，，1加载中，，，2加载全部
		};
	},
	methods: {
		rankData() {
			(self = this),
				// console.log(self.page)
				uni.request({
					url: this.websiteUrl + '/api/cash/ranking',
					method: 'GET',
					data: {
						start: self.start,
						page: self.page
					},
					success: function(res) {
						if (res.data.data.list.length >= res.data.data.totalCount) {
							self.rankListData = res.data.data.list;
							self.loadingType = 2;
							return;
						}
						self.rankListData = res.data.data.list;
						// console.log(self.rankListData);
						self.page += self.page;
					}
				});
		}
	},
	onLoad: function() {
		this.rankData();
	},
	onReachBottom() {
		// console.log('onReachBottom');
		this.loadingType = 0;
		setTimeout(() => {
			this.rankData();
		}, 300);
	},
	components: { Loading }
};
</script>

<style lang="less" scoped>
.container {
	background: rgba(238, 238, 238, 1);
}
.rankbox {
	width: 710upx;
	height: 200upx;
	background: rgba(255, 255, 255, 1);
	margin: 10upx 0 10upx 20upx;
	display: flex;
	align-items: center;
	>image {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		margin: 10upx;
	}
	.rank_list {
		width: 100%;
		margin: 40upx 20upx;
		font-family: PingFang SC;
		text-align: right;
		.rank_name {
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			font-size: 28upx;
		}
		.rank_price {
			color: rgba(102, 102, 102, 1);
			font-size: 24upx;
		}
	}
}
</style>
