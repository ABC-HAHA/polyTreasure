<template>
	<view class="introduction">
		<!-- <no-data></no-data> -->
		<!-- <view class="no_data_block">
			<image  class="no_data" src="../../static/no.png" mode=""></image>
			<view>暂无数据</view>
		</view> -->
		<image class="logo" src="../../static/152x152.png"></image>
		<view class="box">
			请广泛利用好您的朋友圈、微信、短信等其他联系方 式，多多分享，返利比你想象的高
			<!-- 如何赚佣:<br/>1、下载APP后注册登陆，提交申请成为会员，并绑定支付宝；<br/> 2、在账户等级认证中，填写个人资料，提交审核；<br/>
			3、在任务中领取后台发布的任务，根据要求完成商家发布的任务，赚取佣金。 -->
		</view>
		<view class="box">
			每天注意倒计时红包的发放时间
		</view>
		<view class="box">
			请核对好自己账号的昵称、绑定的支付宝以免信息错误造成你的损失                            
		</view>
		<view class="box">
			在完成任务的时候，请不要屏蔽朋友圈，以免让我们	的审核人员没有办法准确查看，导致您当任务失败
		</view>
		<view class="box">
			请每天多做一些任务，多领取一些红包，实时关注我们  
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
		return {};
	},
	methods: {
		login() {}
	}
};
</script>

<style lang="less" scoped>
.introduction {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.no_data_block {
		width: 750upx;
		text-align: center;
		margin-top: 400upx;
		.no_data {
			width: 464upx;
			height: 298upx;
		}
		> view {
			font-size: 31upx;
			color: rgba(104, 104, 104, 1);
		}
	}
}
.logo{
	width:198upx;
	height:198upx;
	margin-top:80upx;
}
.box {
	padding:10upx 0;
	width:700upx;
	font-size:28upx;
	font-family:PingFang SC;
	font-weight:500;
	color:rgba(51,51,51,1);
	line-height:60upx;
}
</style>
