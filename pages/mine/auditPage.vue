<template>
	<view class="auditPage">
		<view class="audit_specification">我们要审核您的通讯录好友人数，用于确保您不是重新 注册微信进行欺骗</view>
		<view class="audit-pages-block">
			<image  src="../../static/other/examine1.png" ></image>
			<image  src="../../static/other/examine2.png" ></image>
		</view>
		<view class="explain">	请按照上方引导图片来进行上传微信好友通讯录截图与微信个人信息页面截图</view>
		<view class="add-block">
			<image class="add1" :src="sendImageList[0]" mode="" @click="upload(0)"></image>
			<image class="add2" :src="sendImageList[1]" mode="" @click="upload(1)"></image>
		</view>
		<view class="commit" @click="commitAudit">确认</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				smsCode: '',
				codeFalg: false,
				audit_image:"../../static/addPage.png",
				deleteStatus:false,
				auditList:[],
				historyAuditStatus:false,
				canUploadImage:true,
				sendImageList:['../../static/other/add.png','../../static/other/add.png'],
				sendImage:'',
				uploadStatus:[false,false],
				uploadImage:''
			}
		},
		onShow() {
			this.reviewInfo();
		},
		 methods: {
			upload(type){
				 var   self = this;
				 if(!this.$store.state.isLogin){
					 plus.nativeUI.toast('您还没有登录哦!');
					 return;
				 }
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
							self.$set(self.sendImageList, type,JSON.parse(uploadFileRes.data).imgurl)
							self.uploadStatus[type] = true;
					 	}
					 });
					}
				});
			},
			reviewInfo(){
				var  self  = this;
				
				uni.request({
					url: self.websiteUrl + '/api/user/reviewInfo',
					header: {
						Authorization:self.$store.state.userInfo.token
					},
					 success: res => {
						  console.log(res);
						 if(res.data.code == 200){
							  self.auditList = res.data.data;
							  if(res.data.status == 0 || res.data.status == 1 ){
								self.canUploadImage= false ;
							  }
							 if(self.auditList.length > 0){
								self.historyAuditStatus = true;
							 }else{
								self.historyAuditStatus = false;
							 }
						 }else{
							  plus.nativeUI.toast(res.data.msg);
						 }
					 },
					 fail: () => {},
					 complete: () => {}
				});
			},
			commitAudit(){
				var  self  = this;
				if(!this.$store.state.isLogin){
					plus.nativeUI.toast('您还没有登录哦!');
					return;
				}
				if(self.uploadStatus[0] && self.uploadStatus[1]){
					uni.request({
						url: self.websiteUrl +'/api/user/reviewSub',
						method: 'POST',
						header: {
							Authorization:self.$store.state.userInfo.token
						},
						data: {imgUrls:self.sendImageList},
						success: (res) => {
							if(res.data.code == 200){
								self.canUploadImage = false;
								self.reviewInfo();
							}
							plus.nativeUI.toast(res.data.msg);
							}
						});
				}else{
					 plus.nativeUI.toast('请上微信图片传图片');
				}
			}
		 }
	}
</script>

<style lang="less" scoped>
	.auditPage{
		width:750upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.audit_specification{
			width:705upx;
			margin: 0 auto;
			padding: 30upx 0;
			// text-align: center;
			font-size:28upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:40upx;
		}
		.audit-pages-block{
			word-wrap: nowrap;
			>image{
				display: inline-block;
				width:358upx;
				height:568upx;
			}
		}
		.explain{
			height:20upx;
			font-size:20upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(157,157,157,1);
			margin:30upx 0;
		}
		.add-block{
			width: 750upx;;
			word-wrap: nowrap;
			>image{
				display: inline-block;
				width:116upx;
				height:116upx;
				margin-left:50upx;
			}
		}
		.commit{
			margin:30upx 0;
			width:662upx;
			height:88upx;
			background:rgba(218,58,58,1);
			text-align: center;
			border-radius:44upx;
			font-size:28upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			line-height:88upx;
		}
	}
	
</style>
