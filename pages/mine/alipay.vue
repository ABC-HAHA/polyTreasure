<template>
	<view>
		<view class="page_block">
            <view class="page_top">
				<image class="logo" src="../../static/152x152.png" mode=""></image>
				<view class="registered_account">
				    <input class="" v-model="userName" maxlength="11" placeholder="请输入真实姓名" placeholder-class="placeholder_style" @blur="checkName"/>
				</view>
				<view class="registered_account">
				    <input type="number" v-model="alipay" placeholder="请输入支付宝账号" placeholder-class="placeholder_style" @blur="checkCode"/>
				</view>
				 <view class="add-aliply-block">
					 <view class="aliply-title">请添加支付宝收款码</view>
					 <image class="add-aliply" :src="audit_image"  @click="upload"></image>
				 </view>
				  <view class="block_btn" @click="commitAlipay">提交</view>
            </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: '',
				alipay: '',
				uploadImage:'',
				sendImage:'',
				audit_image:"../../static/other/add.png",
			}
		},
		 methods: {
			 upload(){
			 	var   self = this;
			 	uni.chooseImage({
			 	count:1, //默认9
			 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			 	sourceType: ['album'], //从相册选择
			 		success: function (res) {
			 	     console.log(JSON.stringify(res.tempFilePaths[0]));
			 		 self.uploadImage = res.tempFilePaths[0];
			 		uni.uploadFile({
			 		 	header: {
			 		 		Authorization:self.$store.state.userInfo.token
			 		 	},
			 		 	url: self.websiteUrl +'/api/file/uploadFile',//仅为示例，非真实的接口地址
			 		 	filePath: self.uploadImage,
			 		 	name: 'file',
			 		 	success: (uploadFileRes) => {
			 				self.audit_image =  self.uploadImage;
			 				 self.deleteStatus = true;
			 		 		self.sendImage = JSON.parse(uploadFileRes.data).imgurl;
			 		 	}
			 		 });
			 		}
			 	});
			 },
			checkName(){
			    if (this.userName != '') {
			        return true
			     } else {
			        uni.showToast({
			            title: '用户名不能为空',
			            icon: 'none',
			            mask: true
			        });
			        setTimeout(function(){
			            uni.hideToast();
			        },2000)
			        return false
			     }
			 },
			 checkCode(){
			      if (this.alipay != '') {
			         return true;
			     } else {
			         uni.showToast({
			             title: '支付宝账号不能为空',
			             icon: 'none',
			             mask: true
			         });
			         setTimeout(function(){
			             uni.hideToast();
			         },2000)
			         return false
			     }
			 },
			 commitAlipay(){
				 if(this.checkName() && this.checkCode()){
					  uni.request({
					 	url: this.websiteUrl +'/api/user/bindingAlipay',
							 method: 'POST',
							 header: {
							 	Authorization:this.$store.state.userInfo.token
							 },
							 data: {
								actualName:this.userName,
								alipayNu: this.alipay,
								alipayPicture:this.audit_image
							 },
					 	success: (res) => {
							console.log(res);
							if(res.data.code == 200){
								plus.nativeUI.toast("绑定成功!");
								 uni.switchTab({
									url: '/pages/tarbar/mine/mine',
								    animationType: 'slide-in-right'
								})
							}else{
								plus.nativeUI.toast(res.data.data);
							}    
					 	}
					 });
				 }
			 }
		 }
	}
</script>
<style lang="less" scoped>
	.logo{
		width:126upx;
		height:126upx;
	}
	.add-aliply-block{
		margin-top:50upx;
		width:560upx;
		.aliply-title{
			font-size:20upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(157,157,157,1);
			line-height:24upx;
		}
		.add-aliply{
			margin-top:20upx;
			width:116upx;
			height:116upx;
		}
	}
	
</style>
