<template>
	<div class="container">
		<swiper class="swiper" :current="swiperCurrent" disable-touch="true" :duration="1000" @change="changeSwiper">
			<swiper-item class="task_redpacket">
				<view class="task_redpacket">
					<image class="task_red_bg" src="/static/task_red_bg.png" mode="scaleToFill"></image>
					<view class="midddle">
						<image class="task_middle" src="/static/red_packet.png" mode="widthFix"></image>
						<view class="middel_txt">
							完成10个任务即可开启红包
							<br />
							当前已完成{{ currentTaskTotal }}个任务
						</view>
						<image class="middle_kai" src="/static/gray_btn.png" mode="widthFix" v-if="showTaskRedBtn"></image>
						<image class="middle_kai" src="/static/kai_btn.png" mode="widthFix" v-if="!showTaskRedBtn" @tap="kaiTaskRedPacket"></image>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="task_redpacket">
				<view class="task_redpacket">
					<image class="task_red_bg" src="/static/dao_red_bg.png" mode="scaleToFill"></image>
					<view class="midddle">
						<image class="task_middle" src="/static/red_packet.png" mode="widthFix"></image>
						<view class="middel_txt">请留意下次红包开放时间</view>
						<view class="middle_time" v-if="daoTime !== ''"><DT :endTime="daoTime" @timeEnd="timeEnd"></DT></view>
						<image class="middle_kai" src="/static/gray_btn.png" v-if="showRedBtn" mode="widthFix"></image>
						<image class="middle_kai" src="/static/kai_btn.png" v-if="!showRedBtn" mode="widthFix" @tap="getRedPacket"></image>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="down">
			<view v-for="(item, index) in picList" :key="index" :data-current="index" @click="tapTab"><image class="btn_pic" :src="item.pic" mode="widthFix"></image></view>
		</view>
	</div>
</template>

<script>
import DT from '@/components/dao-time/dao-time.vue';
export default {
	data() {
		return {
			USERTOKEN: this.$store.state.userInfo.token,
			userId: this.$store.state.userInfo.userId,
			daoTime: '',
			showRedBtn: true, //显示领红包倒计时按钮
			isOpen: '', //可领取红包daojishi
			activityId: '', //倒计时红包返回的activityId倒计时
			isTaskEnable: '', //任务红包可领取
			activityTaskId: '', //任务红包id
			showTaskRedBtn: true, //显示任务领取红包按钮
			currentTaskTotal: 0, //已完成任务数
			picList: [{ pic: '/static/task_btn1.png' }, { pic: '/static/task_btn2.png' }],
			swiperCurrent: 0
		};
	},
	methods: {
		changeSwiper(e) {
			this.swiperCurrent = e.detail.current;
		},
		tapTab(e) {
			//点击tab-bar
			// console.log(e.currentTarget);
			let tabIndex = e.currentTarget.dataset.current;
			if (this.swiperCurrent === tabIndex) {
				return false;
			} else {
				this.swiperCurrent = tabIndex;
			}
			// console.log(this.swiperCurrent);
		},
		timeEnd() {
			console.log('时间到了');
			this.daoTime = '';
			// 可领取
			this.showRedBtn = false;
		},
		kaiTaskRedPacket() {
			if (this.isTaskEnable == 1) {
				var self = this;
				uni.request({
					url: self.websiteUrl + '/api/activity/receive',
					method: 'POST',
					data: {
						activityId: self.activityTaskId,
						userId: self.userId
					},
					header: {
						Authorization: self.USERTOKEN
					},
					success: res => {
						// console.log(res);
					},
					fail: res => {
						console.log(res);
					}
				});
			} else {
				uni.showToast({
					title: '红包已失效',
					mask: true
				});
			}
			console.log('点击了领红包');
		},
		// 领取倒计时红包
		getRedPacket() {
			if (this.isOpen >= 0) {
				var self = this;
				uni.request({
					url: self.websiteUrl + '/api/activity/receive',
					method: 'POST',
					data: {
						activityId: self.activityId,
						userId: self.userId
					},
					header: {
						Authorization: self.USERTOKEN
					},
					success: res => {
						// console.log(res);
					},
					fail: res => {
						console.log(res);
					}
				});
			} else {
				uni.showToast({
					title: '红包已领完',
					mask: true
				});
			}
			// console.log('点击了领红包');
		},
		// init任务红包
		initTask() {
			var self = this;
			uni.request({
				url: self.websiteUrl + '/api/activity/missionRedEnvelope',
				method: 'GET',
				header: {
					Authorization: self.USERTOKEN
				},
				success: res => {
					// console.log(res);
					if (res.data.list[0] && res.data.list[0].isOpen == 1) {
						// activityId
						self.activityTaskId = res.data.list[0].activityId;
						// 可领取倒计时红包
						self.isTaskEnable = res.data.list[0].enable;
						// total
						self.currentTaskTotal = res.data.list[0].numberOfOurrentTasks;
					}
				},
				fail: res => {
					console.log(res);
				}
			});
		},
		initDao() {
			var self = this;
			uni.request({
				url: self.websiteUrl + '/api/activity/timeRedEnvelope',
				method: 'GET',
				header: {
					Authorization: self.USERTOKEN
				},
				success: res => {
					// console.log(res.data.list[0]);
					if (res.data.list[0] && res.data.list[0].isOpen == 1) {
						// 倒计时结束时间
						self.daoTime = res.data.list[0].startDate;
						// activityId
						self.activityId = res.data.list[0].activityId;
						// 可领取倒计时红包
						self.isOpen = res.data.list[0].total - res.data.list[0].completedCount;
					}

					// console.log(self.daoTime);
				},
				fail: res => {
					console.log(res);
				}
			});
		}
	},
	onLoad() {
		if (this.$store.state.isLogin) {
			this.initTask();
			this.initDao();
		} else {
			uni.showToast({
				title: '请先去登录',
				mask: true
			});
		}
	},
	components: {
		DT
	}
};
</script>

<style scoped lang="less">
.swiper {
	width: 750upx;
	height: 1200upx;
}
.task_redpacket {
	text-align: center;
	.task_red_bg {
		width: 750upx;
		height: 1200upx;
		overflow: hidden;
		position: fixed;
		left: 0;
		top: 0;
	}
	.midddle {
		width: 710upx;
		height: 700upx;
		position: relative;
		left: 20upx;
		top: 200upx;
		// border: 1upx solid #007aff;
		.task_middle {
			width: 600upx;
			position: absolute;
			left: 40upx;
			top: 20upx;
		}
		.middle_kai {
			width: 200upx;
			position: absolute;
			left: 250upx;
			top: 200upx;
		}
		.middel_txt {
			width: 500upx;
			font-size: 30upx;
			color: #e7ebed;
			text-align: center;
			position: absolute;
			left: 90upx;
			top: 450upx;
		}
		.middle_time {
			width: 500upx;
			font-size: 30upx;
			color: #e7ebed;
			text-align: center;
			position: absolute;
			left: 90upx;
			top: 500upx;
		}
	}
}

.down {
	width: 750upx;
	position: fixed;
	left: 0;
	bottom: 80upx;
	display: flex;
	justify-content: space-around;
	.btn_pic {
		width: 300upx;
	}
}
</style>
