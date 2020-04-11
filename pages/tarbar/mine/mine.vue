<template>
	<view class="mine-block">
		<view class="mine-bottom-block">	
			<view  v-if="loginStatus" class="head_bot">
				<view class="head_bottom">
					<view class="item_dec"  @tap="myTeam">
						<image src="../../../static/other/teamImg.png" mode=""></image>
						<view>我的团队</view>
					</view>
					<view class="item_dec" @tap="myTaskList">
						<image src="../../../static/other/taskImg.png" mode=""></image>
						<view>我的任务</view>
					</view>
				</view>
			</view>
			<view  v-if="loginStatus" class="profit_list">
				<view class="profit_dec">
					{{ todayIncome }}
					<view>今日收益</view>
				</view>
				<view class="profit_dec">
					{{ totalRevenue }}
					<view>总收益</view>
				</view>
				<view class="profit_dec">
					{{ promotionNumber }}
					<view>推广总数</view>
				</view>
			</view>
			<view class="mine_other_list">
				<view class="other_list" @tap="toMsg">
					<image class="mine_other_list_icon" src="../../../static/other/new.png"></image>
					<view class="mine_other_list_content">我的消息</view>
					<image class="mine_other_list_image" src="../../../static/jiantou.png"></image>
				</view>
				<view class="other_list" @tap="myRecord">
					<image class="mine_other_list_icon" src="../../../static/other/detal.png"></image>
					<view class="mine_other_list_content">收支明细</view>
					<image class="mine_other_list_image" src="../../../static/jiantou.png"></image>
				</view>
				<view class="other_list" @tap="alipay">
					<image class="mine_other_list_icon" src="../../../static/other/alipay.png"></image>
					<view class="mine_other_list_content">绑定支付宝</view>
					<image class="mine_other_list_image" src="../../../static/jiantou.png"></image>
				</view>
				<view class="other_list" @tap="withdrawal">
					<image class="mine_other_list_icon" src="../../../static/other/alipay.png"></image>
					<view class="mine_other_list_content">提现</view>
					<image class="mine_other_list_image" src="../../../static/jiantou.png"></image>
				</view>
				<view class="other_list" @tap="briefIntroduction">
					<image class="mine_other_list_icon" src="../../../static/other/money.png"></image>
					<view class="mine_other_list_content">如何赚佣</view>
					<image class="mine_other_list_image" src="../../../static/jiantou.png"></image>
				</view>
				<view class="other_list" @tap="helpCenter">
					<image class="mine_other_list_icon" src="../../../static/other/help.png"></image>
					<view class="mine_other_list_content">帮助中心</view>
					<image class="mine_other_list_image" src="../../../static/jiantou.png"></image>
				</view>
				<!-- <view class="other_list" @tap="invitationCode">
					<image class="mine_other_list_icon" src="../../../static/ma.png"></image>
					<view class="mine_other_list_content">绑定邀请码</view>
					<image class="mine_other_list_image" src="../../../static/jiantou.png"></image>
				</view> -->
				
				<view class="other_list" @tap="toLine">
					<image class="mine_other_list_icon" src="../../../static/other/kefu.png"></image>
					<view class="mine_other_list_content">在线客服</view>
					<image class="mine_other_list_image" src="../../../static/jiantou.png"></image>
				</view>
				<view class="other_list" @tap="inviteTeam">
					<image class="mine_other_list_icon" src="../../../static/other/invited.png"></image>
					<view class="mine_other_list_content">邀请好友</view>
					<image class="mine_other_list_image" src="../../../static/jiantou.png"></image>
				</view>
				<!-- <view class="other_list" @tap="toQQ">
					<image class="mine_other_list_icon" src="../../../static/QQ.png"></image>
					<view class="mine_other_list_content">QQ客服</view>
					<image class="mine_other_list_image" src="../../../static/jiantou.png"></image>
				</view> -->
				<!-- <view class="other_list" @tap="login">
					<image class="mine_other_list_icon" src="../../../static/wode.png"></image>
					<view class="mine_other_list_content">登录</view>
					<image class="mine_other_list_image" src="../../../static/jiantou.png"></image>
				</view> -->
				<!-- <view class="other_list" @tap="setting">
					<image class="mine_other_list_icon" src="../../../static/shezhi.png"></image>
					<view class="mine_other_list_content">设置</view>
					<image class="mine_other_list_image" src="../../../static/jiantou.png"></image>
				</view> -->
			</view>
			</view>
			
		<view class="mine-top">
			<image class="head_top_set" src="../../../static/other/seetting.png" @tap="setting"></image>
			<view class="head_top">
				<view class="head_left" @tap="personalInformation">
					<image class="head_img" :src="user_image" mode=""></image>
					<view class="head_dec">
						{{ user_name }}
						<view>余额:{{ balance }}</view>
					</view>
				</view>
				<view class="auditGo" @tap="commitAudit"  @click="commitAudit">
					{{ auditStatus }}
				</view>
			</view>
		</view>
		<form-alert v-if="alertLoginStatus" @closeEvent="closeAlert"></form-alert>
	</view>
</template>

<script>
// @/pages/mine/nodata.vue   ../../../components/h-form-alert/h-form-alert.vue
import formAlert from '@/components/h-form-alert/h-form-alert.vue'; //加载动画
export default {
	components: {
		formAlert
	},
	data() {
		return {
			inviteCode: '',
			userInfor: this.$store.state.uesrInfo,
			advertArr: [
				{
					name: '张三',
					money: 20.0
				},
				{
					name: '李武',
					money: 30.0
				}
			],
			userData: {
				bankCards: []
			},
			alertLoginStatus: false,
			customeQQ: 976275793, //客服qq。
			gradeLevelArr: ['低级', '中级', '高级']
		};
	},
	onShow() {
		this.userData = {
			bankCards: []
		};
		// console.log(55555555555555);
		// var sss = this.$store.state.userInfo;
		// console.log(sss);
		this.getUserInfor();
		// 	// this.tempList = this.tabBars;
	},
	computed: {
		user_image: function() {
			return this.$store.state.userInfo.wexinImg ? this.$store.state.userInfo.wexinImg : '';
		},
		user_name: function() {
			return this.$store.state.userInfo.wexinNickName ? this.$store.state.userInfo.wexinNickName : '未登录';
		},
		inviteName: function() {
			return this.userData.inviteName ? this.userData.inviteName : '';
		},
		bind_number: function() {
			return this.userData.mobile ? this.userData.mobile : '';
		},
		bind_back_number: function() {
			return this.userData.bankCards[0] ? this.userData.bankCards[0].cardId : '';
		},
		// ailpayNo: function() {
		// 	return this.userData.ailpayNo ? this.userData.ailpayNo : '';
		// },
		userName: function() {
			return this.userData.userName ? this.userData.userName : '';
		},
		auditStatus: function() {
			let statusStr = this.userData.statusStr ? this.userData.statusStr : '去审核';
			return statusStr;
		},
		gradeLevel: function() {
			let gradeLevelIndex = this.$store.state.userInfo.inviteGroupId ? this.$store.state.userInfo.inviteGroupId : 0;
			return this.gradeLevelArr[gradeLevelIndex];
		},

		teams: function() {
			return this.userData.teams ? this.userData.teams : '0';
		},
		balance: function() {
			return this.userData.balance ? this.userData.balance : '0';
		},
		todayIncome: function() {
			return this.userData.todayIncome ? this.userData.todayIncome : '0';
		},
		totalRevenue: function() {
			return this.userData.totalRevenue ? this.userData.totalRevenue : '0';
		},
		promotionNumber: function() {
			return this.userData.promotionNumber ? this.userData.promotionNumber : '0';
		},
		loginStatus: function() {
			return this.$store.state.isLogin ? this.$store.state.isLogin : false;
		}
	},
	methods: {
		toMsg() {
			if (this.loginStatus) {
				uni.navigateTo({
					url: '/pages/mine/news',
					animationType: 'slide-in-right'
				});
			} else {
				uni.navigateTo({
					url: '/pages/mine/news',
					animationType: 'slide-in-right'
				});
			}
		},
		personalInformation() {
			if (this.loginStatus) {
				uni.navigateTo({
					url: '/pages/mine/personalPage',
					animationType: 'slide-in-right'
				});
			} else {
				uni.navigateTo({
					url: '/pages/mine/login',
					animationType: 'slide-in-right'
				});
			}
		},
		commitAudit() {
			uni.navigateTo({
				url: '/pages/mine/auditPage',
				animationType: 'slide-in-right'
			});
		},
		myTeam() {
			uni.navigateTo({
				url: '/pages/mine/myTeam',
				animationType: 'slide-in-right'
			});
		},
		briefIntroduction() {
			uni.navigateTo({
				url: '/pages/mine/briefIntroduction',
				animationType: 'slide-in-right'
			});
		},
		myRecord() {
			uni.navigateTo({
				url: '/pages/mine/myRecord',
				animationType: 'slide-in-right'
			});
		},
		withdrawal() {
			if (!this.loginStatus) {
				this.alertLoginStatus = true;
				return;
			}
			uni.navigateTo({
				url: '/pages/mine/withdrawal?balance=' + this.userData.balance,
				animationType: 'slide-in-right'
			});
		},
		mobileNumber() {
			if (!this.loginStatus) {
				this.alertLoginStatus = true;
				return;
			}
			uni.navigateTo({
				url: '/pages/mine/mobileNumber',
				animationType: 'slide-in-right'
			});
		},
		helpCenter(){
			uni.navigateTo({
				url: '/pages/help/leadDetail/leadDetail',
				animationType: 'slide-in-right'
			});
		},
		// bindBankNumber() {
		// 	uni.navigateTo({
		// 		url: '/pages/mine/backNumber',
		// 		animationType: 'slide-in-right'
		// 	});
		// },
		alipay() {
			// if (!this.loginStatus) {
			// 	this.alertLoginStatus = true;
			// 	return;
			// }
			// console.log(this.userData.userName);
			if (this.userData.userName) {
				uni.showToast({
					title: '已绑定账号',
					mask: true
				});
				return;
			}
			uni.navigateTo({
				url: '/pages/mine/alipay',
				animationType: 'slide-in-right'
			});
		},
		gotoLogin() {
			uni.navigateTo({
				url: '/pages/mine/login',
				animationType: 'slide-in-right'
			});
		},
		invitationCode() {
			if (!this.loginStatus) {
				this.alertLoginStatus = true;
				return;
			}
			uni.navigateTo({
				url: '/pages/mine/invitationCode',
				animationType: 'slide-in-right'
			});
		},
		toLine() {
			// #ifdef APP-PLUS
			plus.runtime.openWeb('https://train.yanola.com/talk/chatClient/chatbox.jsp?companyID=631055507&configID=391&jid=6145092818&s=1');
			// #endif
		},
		toQQ() {
			var self = this;
			uni.request({
				url: this.websiteUrl + '/api/customer/qq',
				method: 'GET',
				success: res => {
					console.log(res.data.data.qq);
					self.customeQQ = res.data.data.qq;
					uni.showModal({
						title: '提示',
						content: 'QQ:请复制官方群号添加，进群提供邀请码+手机号码才可加入',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + self.customeQQ, function(res) {
									plus.nativeUI.alert('本机没有安装QQ，无法启动');
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			});
		},
		inviteTeam() {
			uni.navigateTo({
				url: '/pages/mine/inviteTeam',
				animationType: 'slide-in-right'
			});
		},
		setting() {
			uni.navigateTo({
				url: '/pages/mine/setting',
				animationType: 'slide-in-right'
			});
		},
		myTaskList() {
			uni.navigateTo({
				url: '/pages/mine/myTaskList',
				animationType: 'slide-in-right'
			});
		},
		// 获取用户信息
		getUserInfor() {
			var self = this;
			if (self.loginStatus) {
				uni.request({
					url: self.websiteUrl + '/api/user/userInfo',
					header: {
						Authorization: self.$store.state.userInfo.token
					},
					success: res => {
						// console.log(res);
						if (res.data.code == 500) {
							// console.log(666666);
							self.$store.commit('logout');
						} else {
							self.userData = res.data.data;
							self.$store.commit('changeStatus', self.userData.status);
							// console.log(111, self.userData);
							self.$store.commit('login', self.userData);
						}
					}
				});
			}
		},
		//关闭提示页面
		closeAlert() {
			this.alertLoginStatus = false;
		},
		login() {
			uni.navigateTo({
				url: '/pages/mine/login',
				animationType: 'slide-in-right'
			});
		},
		// lunbo
		getSwiperData() {
			uni.request({
				url: this.websiteUrl + '/api/cash/getWithdrawList',
				method: 'GET',
				success: res => {
					// console.log(res);
					this.advertArr = res.data.data;
				}
			});
		}
	},
	onLoad() {
		this.getSwiperData();
		uni.getStorage({
			key: 'openinstallInfo',
			success: res => {
				console.log('ok');
				this.inviteCode = JSON.parse(JSON.parse(res.data).bindData).inviteCode;
			}
		});
	}
};
</script>

<style lang="less" scoped>
.mine-block {
	width:750upx;
	.mine-bottom-block{
		padding-top:350upx;
	}
	.item_dec {
		width: 250upx;
		margin-left: 70upx;
		
		font-size: 48upx;
		color: rgba(34, 34, 34, 1);
		text-align: center;
		> view {
			font-size: 36upx;
			font-family: PingFang SC;
			color: rgba(34, 34, 34, 1);
			padding-top: 10upx;
		}
		> image {
			width: 36upx;
			height: 39upx;
		}
	}
	.head_bot {
		width: 690upx;
		height: 170upx;
		margin-left:30upx;
		margin-top:20upx;
		text-align: center;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0upx 0upx 9upx 9upx #dddddd;
		border-radius: 42upx;
		font-size: 36upx;
		color: rgba(34, 34, 34, 1);
		.head_bottom {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding-top: 10upx;
			.bottom_dec {
				text-align: center;
				width: 300upx;
				> view {
					text-align: left;
					padding-left: 30upx;
					font-size:32upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(0,0,0,1);
				}
				.withdrawal {
					float: right;
					width: 160upx;
					height: 60upx;
					margin: 50upx 60upx 60upx 0upx;
					// margin-right:60upx;
					// margin-bottom:60upx;
					padding-left: 0upx;
					text-align: center;
					line-height: 60upx;
					background: rgba(255, 255, 255, 1);
					border: 2upx solid #e4444c;
					border-radius: 30upx;
					font-size: 36upx;
					color: #e4444c;
				}
			}
		}
	}
	
	.mine-top {
		background-color: #e54d42;
		top: 0;
		position: fixed;
		height: 344upx;
		width: 750upx;
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// justify-content: center;
		.head_top_set{
			width:30upx;
			height:24upx;
			margin-top:100upx;
			margin-left: 650upx;
		}
		.head_top {
			height: 140upx;
			padding-top: 30upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}
		.head_left {
			width: 450upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: left;
		}
		.auditGo{
			width: 120upx;
			height: 40upx;
			text-align:center;
			line-height:40upx;
			background-color: #ffffff;
			font-size:24upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(218,58,58,1);
			
		}
		.head_dec {
			width: 200upx;
			margin-left: 20upx;
			font-size:32upx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
			word-break: keep-all; /* 不换行 */
			white-space: nowrap; /* 不换行 */
			overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
			text-overflow: ellipsis;
			// font-weight:bold;
			> view {
				font-size:24upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				padding-top: 10upx;
			}
		}
		.head_img {
			width: 136upx;
			height: 136upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 50%;
		}

	}
	.notice {
		width: 750upx;
		height: 90upx;
		background: rgba(255, 255, 255, 1);
		display: flex;
		// flex-direction: row;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		> image {
			margin-left: 40upx;
			width: 40upx;
			height: 40upx;
		}
		.video-guanggao-swiper {
			width: 720upx;
			height: 50upx;
			margin-left: 30upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
		}
		.video-guanggao-item {
			width: 720upx;
			height: 176upx;
			font-size: 36upx;
			color: rgba(63, 138, 240, 1);
		}
	}
	.profit_list {
		width: 750upx;
		height: 180upx;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		font-size: 40upx;
		color: rgba(34, 34, 34, 1);
		z-index: 99;
		margin-top: 20upx;
		.profit_dec {
			width: 300upx;
			text-align: center;
			> view {
				margin-top: 10upx;
				font-size: 36upx;
				color: rgba(34, 34, 34, 1);
			}
		}
	}
	.mine_other_list {
		// margin-top:10upx;
		.other_list {
			display: flex;
			flex-direction: row;
			align-items: center;
			// justify-content: center;;
			margin-top: 2upx;
			line-height: 110upx;
			background-color: #ffffff;
			.mine_other_list_icon {
				margin-left: 34upx;
				width: 40upx;
				height: 40upx;
			}
			.mine_other_list_image {
				// margin-right:10upx;
				width: 17upx;
				height: 29upx;
			}
			.mine_other_list_content {
				// margin-top: 20upx;;
				width: 600upx;
				font-size: 28upx;
				color: rgba(40, 40, 40, 1);
				margin-left: 30upx;
				> text {
					margin-left: 100upx;
					font-size: 30upx;
					color: rgba(227, 52, 52, 1);
				}
			}
		}
	}
}
</style>
