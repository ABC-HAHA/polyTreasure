<template>
	<view class="news_page">
		<view class="news-item" v-for="(item, index) in newsList" :key="index">
			<view class="news-left">
				<view class="news-title">{{ item.type | typeType }}</view>
				<view class="news-remarks">
					<text>{{ item.status | statusType }}</text>
					<text>{{ item.message }}</text>
				</view>
			</view>
			<view class="news-right">{{ item.time }}</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			newsList: []
		};
	},
	methods: {
		getNews() {
			uni.request({
				url: this.websiteUrl + '/api/inform/queryAuditStatusInform',
				method: 'GET',
				data: {
					// userId:3,
					userId: this.$store.state.userInfo.userId
				},
				success: res => {
					console.log(res);
					if (res.data.list) {
						this.newsList = res.data.list;
					}
				}
			});
		}
	},
	onShow() {
		this.getNews();
	},
	computed: {},
	onLoad() {},
	filters: {
		typeType: function(msg) {
			switch (msg) {
				case 0:
					return '用户审核';
					break;
				case 1:
					return '任务审核';
					break;
				default:
					return '提现审核';
					break;
			}
		},
		statusType: function(msg) {
			switch (msg) {
				case 0:
					return '审核通过';
					break;
				default:
					return '审核未通过';
					break;
			}
		}
	}
};
</script>

<style lang="less" scoped>
.news_page {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	.news-item {
		width: 750upx;
		height: 152upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1upx solid black;
		.news-left {
			padding: 0 20upx;
			.news-title {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				line-height: 24upx;
			}
			.news-remarks {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(157, 157, 157, 1);
				line-height: 60upx;
				> text {
					padding-left: 10upx;
				}
			}
		}
		.news-right {
			padding: 0 20upx;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(157, 157, 157, 1);
			line-height: 24upx;
		}
	}
}
</style>
