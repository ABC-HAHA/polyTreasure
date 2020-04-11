<template>
	<div class="box">
		<view class="card" v-for="(item, index) in listItem" v-if="listItem.length > 0 && current !== 3" :key="index" @tap="toDetail(item.esaId, current)">
			<image class="pic" :src="item.esaPicUrl" mode=""></image>
			<view class="right">
				<view class="min_left">
					<view class="min_left_title">{{ item.esaAppName }}</view>
					<view class="min_left_text">
						<view class="">参与人数{{ item.esaTotalCount }}</view>
						<view class="">剩余次数{{ item.esaTotalCount - item.esaUsedCount }}</view>
					</view>
				</view>
				<view class="min_right">
					<view class="min_rigth_up">
						<image class="min_right_pic" :src="item.esaTotalCount - item.esaUsedCount > 0 ? '/static/lingqu.png' : '/static/nolingqu.png'" mode=""></image>
					</view>
					<view class="min_rigth_down">
						<view class="min_right_price">{{ item.esaUnitPrice | numFloat }}￥</view>
						<view class="min_right_text">{{ item.createDate | dateFilter }} 发布</view>
					</view>
				</view>
			</view>
		</view>

		<view class="card" v-for="(item, index) in listItem" v-if="listItem.length > 0 && current == 3" :key="index" @tap="toDetail(item.esaId, current)">
			<image class="pic2" :src="item.picUrl" mode="" @tap="toad(item.skipUrl)"></image>
		</view>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		// 跳转详情
		toDetail(id, current) {
			// console.log(id);
			if (current == 0) {
				uni.navigateTo({
					url: '/pages/task/tuwenPromoting/detail/detail?esaId=' + id
				});
			} else if (current == 1) {
				uni.navigateTo({
					url: '/pages/task/shipinPromoting/detail/detail?esaId=' + id
				});
			} else if (current == 2) {
				uni.navigateTo({
					url: '/pages/task/lianjiePromoting/detail/detail?esaId=' + id
				});
			}
		},
		toad(url) {
			plus.runtime.openURL(url);
		}
	},

	props: {
		listItem: {
			type: Array
		},
		current: {
			type: Number
		}
	}
};
</script>

<style lang="less" scoped>
.box {
	width: 750upx;
	// display: flex;
	// justify-content: space-around;
	// flex-wrap: wrap;
	.card {
		width: 720upx;
		height: 251upx;
		background-color: white;
		margin: 5upx auto 20upx auto;
		background: #ffffff;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		position: relative;
		display: flex;
		align-items: center;
		.pic {
			width: 240upx;
			height: 240upx;
			margin-right: 20upx;
		}
		.pic2 {
			width: 720upx;
			height: 240upx;
		}
		.right {
			display: flex;
			align-items: center;
			.min_left {
				width: 250upx;
				height: 240upx;
				.min_left_title {
					margin: 50upx 0;
					color: #333333;
				}
				.min_left_text {
					font-size: 20upx;
				}
			}
			.min_right {
				width: 200upx;
				height: 240upx;
				// border: 1upx solid red;
				.min_rigth_up {
					.min_right_pic {
						width: 200upx;
						height: 120upx;
					}
				}
				.min_rigth_down {
					text-align: right;
					.min_right_price {
						font-size: 28upx;
						color: #ff7903;
					}
					.min_right_text {
						font-size: 18upx;
						margin: 20upx 0;
					}
				}
			}
		}
	}
}
</style>
