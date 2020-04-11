<template>
    <view class="page_block">
			<view class="invite-block">
				<!-- <image :src="baseUrl + '/api/activity/getCode?url=http://faku123.com/afx/download?inviteCode=' + inviteCode" mode="widthFix" @tap="hidePopup"></image> -->
				<image class="invite-code-back" :src="baseUrl + '/api/activity/getCode?createUrl=http://mazhuan.net?inviteCode=' + inviteCode +'&&backgroundUrl='+ currentBackground"></image>
			</view>
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
			<view class="scroll-item" v-for="(item,index) in backgroundList":key="index"  @click="changeBackground(index,item.url)">
				<image  class="invite-frame" v-if="currentIndex==index" src="../../static/other/invate-frame.png" mode=""></image>
				<image class="invate-image" :src="item.url" mode=""></image>
			</view>	
			</scroll-view>
			<view class="invite_butt">
				<image src="../../static/other/generate-invite-code.png" @click="generateInvitedCode"></image>
			</view>
    		</view>	
</template>
<script>
export default {
  data() {
    return {
		baseUrl: this.websiteUrl,
		inviteCode: this.$store.state.userInfo.inviteCode,
		currentBackground:"http://47.114.182.123:80/group1/M00/00/00/rBDUgV6C6fmAfWf5AAKwmgDqPqs362.png",
		currentInviteCode:"../../static/kefux.png",
		backgroundList:[{src:'../../static/other/head.png'},{src:'../../static/other/head.png'}],
		loadSurvey: true,
		currentIndex:0
    }
  },
  onLoad() {
  	// this.getInviteCode();
	this.getInviteBackhround();
  },
  methods: {
	  generateInvitedCode(){
		  uni.saveImageToPhotosAlbum({
				filePath: this.baseUrl + '/api/activity/getCode?createUrl=http://mazhuan.net?inviteCode=' + this.inviteCode +'&&backgroundUrl='+ this.currentBackground,
				success: function () {
					plus.nativeUI.toast("合成并保存图片成功");
				  },
				  fail: () => {
					  plus.nativeUI.toast("合成并保存图片失败");
				  },
				  complete: () => {} 
			  });
	  },
	  changeBackground(index,url){
		this.currentIndex = index;
		this.currentBackground = url;
		this.loadSurvey = false;
		this.$nextTick(() => {
			this.loadSurvey = true
		})
	  },
	  getInviteBackhround(){
		  uni.request({
		      url: this.websiteUrl + '/api/background/query',
		      method: 'GET',
		      success: res => {
		        this.backgroundList = res.data.list;
				this.currentBackground = this.backgroundList[0].url;
				this.loadSurvey = true;
		      },
		      fail: () => {},
		      complete: () => {}
		  });
	  },
	}
}
</script>
<style lang="less">
   page {
   	background:linear-gradient(0deg,rgba(204,114,138,1),rgba(252,73,102,1));
   	}
   	.page_block{
   		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
   	}
	.invite-block{
		position: relative;
		margin:30upx 0;
		width:500upx;
		height:740upx;
		.invite-code-back{
			width:500upx;
			height:740upx;
		}
		.invite-code{
			position: absolute;
			top:500upx;
			left:250upx;
			width: 200upx;
			height: 200upx;
		}
	}
   	.scroll-view_H{
   		height:320upx;
   		white-space: nowrap; // 滚动必须加的属性
   	}
   	.scroll-item{
   		width: 215upx;
   		height: 318upx;
   		position:relative ;
   		display: inline-block;
   		margin-left:10upx;
   		.invite-frame{
   			width: 215upx;
   			height: 318upx;	
   		}
   		.invate-image{
   			position: absolute;
   			top:15upx;
   			left:10upx;
   			width: 196upx;
   			height: 290upx;
   		}
   		
   	}
   	.invite_butt{
   		position:fixed;
   		width:750upx;
   		text-align: center;
   		>image{
   			width:400upx;
   			height:75upx;
   		}
   		bottom:20upx;
   	}
</style>