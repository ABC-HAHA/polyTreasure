<template>
	<view>
		<view class="cu-chat" id="chatlist">
			<!-- <view class="cu-item self">
				<view class="main">
					<view class="content bg-green shadow">
						<text>喵喵喵！喵喵喵！喵喵喵！喵喵！喵喵！！喵！喵喵喵！</text>
					</view>
				</view>
				<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">2018年3月23日 13:23</view>
			</view>
			<view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="username">是你美错:</view>
					<view class="content shadow">
						<text>喵喵喵！喵喵喵！</text>
					</view>
				</view>
				<view class="date "> 13:23</view>
			</view> -->
			<view class="cu-item" :class="item.from_id==username?'self':''" v-for="(item,index) in Chat_Record" :key="index" :id="(item)">
				<view class="cu-avatar round" v-if="item.from_id!==username" :style="{backgroundImage:'url('+item.msg_body.extras.nick_image+')'}"></view>
				
				<view class="main">
					<view class="username" v-if="item.from_id!==username">{{item.msg_body.extras.nick_name}}：</view>
					<view class="content shadow" :class="item.from_id==username?'bg-green':''">
						<text>{{item.msg_body.text}}</text>
					</view>
				</view>
				<view v-if="item.from_id==username" class="cu-avatar round" :style="{backgroundImage:'url('+my_avatar+')'}"></view>
				
				<view class="date ">{{item.timess}}</view>
			</view>
		</view>

		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10" @focus="InputFocus"
			 @blur="InputBlur" v-model="my_say_text"></input>
			<!-- <view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view> -->
			<button class="cu-btn bg-green shadow" @click="to_send()">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: this.$store.state.userInfo.inviteCode,
				my_avatar: this.$store.state.userInfo.wexinImg,
				chater_info: null,//聊天室信息
				Chat_Record: [],//聊天记录
				my_say_text: '',//要发送的消息
				InputBottom: 0,//输入框高度
				Time_now: {
					Date: '',
					Y: '',
					M: '',
					D: '',
					h: '',
					m: '',
					s: ''
				},
				userId:this.$store.state.userInfo.userId,
				nick_name:this.$store.state.userInfo.wexinNickName,
				nick_image:this.$store.state.userInfo.wexinImg,
				list:30
			};
		},
		onLoad() {
			this.Times_now();
			this.load_chater_info()
			this.to_bottom();
			this.enterChatroom();
			this.onRoomMsg();
			this.liaotianRecord();
		},
		onShow() {
			this.to_bottom()
		},
		methods: {
			
			hump2Underline(s) {
			    return s.replace(/([A-Z])/g, '_$1').toLowerCase()
			},
			
			// JSON对象的key值转换为下划线格式
			jsonToUnderline(obj) {
			    var that = this;
			    if (obj instanceof Array) {
			        obj.forEach(function (v, i) {
			            that.jsonToUnderline(v)
			        })
			    } else if (obj instanceof Object) {
			        Object.keys(obj).forEach(function (key) {
			            var newKey =  that.hump2Underline(key)
			            if (newKey !== key) {
			                obj[newKey] = obj[key]
			                delete obj[key]
			            }
			            that.jsonToUnderline(obj[newKey])
			        })
			    }
			},
			// 初始化聊天室信息
			load_chater_info() {
				var that = this;
				var chater_info;
				chater_info = uni.getStorageSync('chater_info')
				that.chater_info = chater_info
				console.log("聊天室信息",chater_info)
				uni.setNavigationBarTitle({
					title: chater_info.name
				})
				this.onRoomMsg()
				that.to_bottom()
			},
			// 监听聊天室消息，聊天室消息加入聊天记录
			onRoomMsg(){
				var that = this;
				this.JIM.onRoomMsg(function(data) {
					// data.room_id 聊天室 id
					// data.msg_id 消息 id
					// data.ctime_ms 消息生成时间
					// data.content
					console.log('聊天室信息监听');
					console.log(data);
					//下方初始化聊天记录
					that.Chat_Record.push(data.content)
					for (var e = 0; e < that.Chat_Record.length; e++) {
						that.get_message_time(that.Chat_Record[e].create_time, e)
					}
					
					console.log(that.Chat_Record)
				});
			},
			to_bottom() {
				setTimeout(function() {
					uni.pageScrollTo({
						scrollTop: 3000
					})
				}, 1000);

			},
			Times_now() {
				var that = this;
				var date = new Date();
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + '';
				var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
				// console.log(date)
				that.Time_now.Date = date;
				that.Time_now.Y = Y;
				that.Time_now.M = M;
				that.Time_now.D = D;
				that.Time_now.h = h;
				that.Time_now.m = m;
				that.Time_now.s = s;
			},
			// 每条聊天记录设置当前时间
			get_message_time(timestamp, msg_ids) {
				let that = this;
				let Time_now = that.Time_now;

				var date = new Date(timestamp);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + '';
				var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
				if (Y == Time_now.Y && M == Time_now.M && D == Time_now.D) {
					that.Chat_Record[msg_ids].timess = h + m;
				} else {
					that.Chat_Record[msg_ids].timess = M + D;
				}
				// return Y + M + D + h + m + s;
			},
			// 进入聊天室
			enterChatroom(){
				var that = this;
				this.JIM.enterChatroom({
				                  'id' : that.chater_info.id
				                }).onSuccess(function(data) {
									console.log('进入聊天室成功：',JSON.stringify(data))
				                  //data.code 返回码
				                  //data.message 描述
				                  //data.id 聊天室 id
				              }).onFail(function(data) {
				                  //data.code 返回码
				                  //data.message 描述
				              });
			},
			
			
			// 发送消息，消息加入聊天记录
			to_send() {
				var that = this;
				var my_say_text = that.my_say_text
				if (!my_say_text || my_say_text == '') {
					//无内容直接跳出
					return;
				}
				console.log(that.Chat_Record)
				
				 // 发送文本消息
				   this.JIM.sendChatroomMsg({
				                 'target_rid' : that.chater_info.id,
				                 'content' : my_say_text,
								 'extras' : {
									 userId:that.userId,
									 nick_name:that.nick_name,
									 nick_image:that.nick_image,
								 },
				               }).onSuccess(function(data , msg) {
								   console.log("发送消息data",JSON.stringify(data))
								   console.log("发送消息msg",JSON.stringify(msg))
				                  //data.code 返回码
				                  //data.message 描述
				                  //data.room_id 目标聊天室 id
				                  //data.msg_id 发送成功后的消息 id
				                  //data.ctime_ms 消息生成时间,毫秒
								  //发送成功了
								  that.Times_now();
								  msg.content.timess = that.Time_now.h + that.Time_now.m
								  that.Chat_Record.push(msg.content)
								  that.my_say_text = ''
								  that.to_bottom()
				               }).onFail(function(data) {
				                  //data.code 返回码
				                  //data.message 描述
								  uni.showToast({
								  	title: '发送失败'
								  })
				               });
			},
			liaotianRecord(){
				(self = this),
					uni.request({
						url: this.websiteUrl + '/api/jim/getMessageList?roomId='+self.chater_info.id+'&count='+self.list,
						method: 'GET',
						success: function(res) {
							console.log(res);
							self.jsonToUnderline(res.data)
							self.Chat_Record=res.data
							self.list+=self.list
						}
					});
			},
			onPullDownRefresh:function(){
			  this.liaotianRecord();
			  setTimeout(function () {
			      uni.stopPullDownRefresh();
			  }, 1000);
			 },
			//编辑框事件
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: 100upx;
	}
</style>
