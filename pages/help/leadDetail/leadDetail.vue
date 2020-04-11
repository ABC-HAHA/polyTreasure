<template>
	<view >
		<image class="head" src="../../../static/other/head.png" mode=""></image>
		<view class="text_title">一、请先通过审核
			<p>我们要审核您当通讯录好友人数，用于确保您不是 重新注册微信进行欺骗</p>
		</view>
		<image class="screenshot" src="../../../static/other/new1.png" mode=""></image>
		<view class="text_title">二、任务领取
			<p>点击APP下方的“任务”，任务选择图片、链接、视 频都可以接取，根据任务要求完成任务，即可获得 赏金</p>
		</view>
		<image class="screenshot" src="../../../static/other/new2.png" mode=""></image>
		<view class="text_title">三、邀请好友返佣
			<p>点击进去邀请好友页面，点击邀请好友会生成二维 码图片和邀请链接，分享给其他人用于注册，邀请 成功会在我的团队“中显示，佣金会在收入明细”中 显示</p>
		</view>
		<image class="screenshot" src="../../../static/other/new3.png" mode=""></image>
		<view class="text_title">四、转红包
			<p>点击APP下方的“红包”，会有限时红包和任务红包 两种。每天限时红包不固定，无限制的领取，任务 红包需要完成指定任务数量才可以领取红包</p>
		</view>
		<image class="screenshot" src="../../../static/other/new4.png" mode=""></image>
	</view>
		
			
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
	.head{
		width:750upx;
		height:300upx;
	}
	.text_title{
		font-size:44upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		padding:10upx 50upx;
		>p{
			font-size:30upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:40upx;
			padding:20upx 50upx;
		}
	}
	.screenshot{
		margin-left:50upx;
		width:650upx;
		height:1000upx;
	}

</style>
