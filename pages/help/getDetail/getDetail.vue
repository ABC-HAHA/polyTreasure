<template>
	<div>
		<image class="banner_pic" src="/static/step1.png" mode=""></image>
		<view class="text_title">
			<view class="txt_bold">一、请领取任务：</view>
			<view class="txt">选择您想要做的任务进行领取</view>
			<view class="pic_box"><image src="/static/step2.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="pic_box"><image src="/static/step3.png" mode=""></image></view>
		</view>
		<view class="text_title">
			<view class="txt_bold">三、从我的相册进去评价：</view>
			<view class="txt">打开您的微信，进入“我”的页面，点击相册，点击 “我的朋友圈”，找到您刚才发的这条任务，再详情 中进行评价</view>
			<view class="pic_box"><image src="/static/step4.png" mode=""></image></view>
		</view>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
	.banner_pic{
		width: 750upx;
		height: 300upx;
	}
.text_title {
	font-size: 33upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(90, 90, 90, 1);
	padding-top: 55upx;
	.txt_bold {
		font-size: 40upx;
		font-weight: bold;
		margin: 10upx;
	}
	.txt {
		margin: 45upx 10upx;
	}
	.pic_box {
		text-align: center;
		image {
			width: 685upx;
			height: 1296upx;
		}
	}
}
</style>
