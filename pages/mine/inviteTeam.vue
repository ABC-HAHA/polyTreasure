<template>
	<view class="invite_page">
		<view class="invite-bg" :style="{ backgroundImage: 'url(' + bgImg + ')', backgroundSize: '100% 100%' }">
			<scroll-view class="scroll-rule" :scroll-top="scrollTop" scroll-y="true">
				<image class="rule-head" src="../../static/other/rule-head.png" mode=""></image>
				<view class="rule-article">如果您没有通过资质审核，您当下级产生收益的时候您将不会 产生收益，请牢记</view>
				<view class="rule-article">您当收益=1级返利20%+2级返利15%+3级返利10%+4级返利5%</view>
				<view class="rule-article">
					也就是说您邀请了一个亲朋，当他获取任务赏金时，比如说获 得了5元， 那么你将获得一级返利(20%)也就是1元的返佣。当 您的亲朋也邀请了一位好友，当该用户获得任务赏金时，
					比如 5元，您将获得二级返利(15%)0.75元的奖励，以此类推，您当 收益颇为丰富。
				</view>
				<view class="rule-article">1.邀请您的家人、朋友、同事，邀请的越多，返利就越多</view>
				<view class="rule-article">2.分享到您当微信群、朋友圈、分享的越多，您的返利就越多</view>
				<view class="rule-article">3.可以告诉您的家人朋友：注册进来就可以领取倒计时红包， 收益高提现秒到账哦！</view>
				<view class="rule-article">4.禁止刷单或其他作弊行为，请勿使用刷单工具或第三方刷单 平台，否则损失后果自负</view>
				<view class="rule-article">5.本活动的解释权在法律规范范围内归本光束所有</view>
			</scroll-view>
			<view class="invite_butt"><image src="../../static/other/generate-invite-code.png" @click="generateInviteCode"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollTop: 0,
			bgImg: '/static/other/invite-page.png'
		};
	},
	methods: {
		generateInviteCode() {
			uni.navigateTo({
				url: '/pages/mine/invitationCode',
				animationType: 'slide-in-right'
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #ee4329;
}
.invite_page {
	width: 750upx;
	.invite-bg {
		width: 750upx;
		height: 1305upx;
		position: relative;
	}

	.invite_butt {
		position: fixed;
		width: 750upx;
		text-align: center;
		> image {
			width: 400upx;
			height: 75upx;
		}
		bottom: 20upx;
	}
	.scroll-rule {
		position: absolute;
		border-radius: 30upx;
		width: 710upx;
		top: 430upx;
		left: 20upx;
		right: 20upx;
		margin: 0 auto;
		background-color: #fdf7eb;
		height: 772upx;
		.rule-head {
			width: 320upx;
			height: 31upx;
			margin: 30upx 200upx;
		}
		.rule-article {
			padding: 10upx 30upx;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 40upx;
		}
	}
}
</style>
