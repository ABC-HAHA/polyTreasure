<template>
	<view>
		<nodata v-if="room == null"></nodata>
		<view class="cu-list menu-avatar">
			<!-- <view class="cu-item" v-for="(item, index) in Conversation" :key="index" :id="item" @click="to_chat(index)">
				<view class="cu-avatar round lg" :style="{ backgroundImage: 'url(' + item.avatar + ')' }">
					<view v-if="item.unread_msg_count != 0" class="cu-tag badge">{{ item.unread_msg_count }}</view>
				</view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">{{ item.nickName }}</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{ item.timess }}</view>
					<view class="cuIcon-notice_forbid_fill text-gray"></view>
				</view>
			</view> -->

			<view class="cu-item" v-for="(item, index) in room" :key="index" :id="item" @click="to_chat(index)">
				<!-- <view class="cu-avatar round lg" :style="{ backgroundImage: 'url(' + item.avatar + ')' }">
					<view v-if="item.unread_msg_count != 0" class="cu-tag badge">{{ item.unread_msg_count }}</view>
				</view> -->
				<view class="cu-avatar round lg" :style="{ backgroundImage: 'url(/static/chatBg.png)' }"></view>
				<view class="content">
					<view class="text-bold">
						<view class="text-black">{{ item.name }}</view>
					</view>
					<view class="text-grey">
						<view class="text-cut">{{ item.description }}</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{ item.timess }}</view>
					<!-- <view class="cuIcon-notice_forbid_fill text-gray"></view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import nodata from '@/components/nodata/nodata.vue';
export default {
	data() {
		return {
			room: null, //聊天室列表
			Time_now: {
				Date: '',
				Y: '',
				M: '',
				D: '',
				h: '',
				m: '',
				s: ''
			},
			username: this.$store.state.userInfo.inviteCode,
			password: this.$store.state.userInfo.wexinOpenId
		};
	},
	onLoad() {
		this.log();

		// this.JIM.register({
		// 	username: 'moxiyu',
		// 	password:  'weiaini',
		// 	nickname: 'moxiyu',
		// 	is_md5: false,
		// 	address: '江苏',
		// 	extras: {
		// 		avatar: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/github.svg'
		// 	},
		// 	media_id: 'qiniu/image/j/4A70699BFF43CC1CE992DD3070AD0909.png'
		// })
		// 	.onSuccess(function(data) {
		// 		console.log('%c%s', 'color: red; font-size: 24px;', '注册成功');
		// 		uni.showToast({
		// 			title: '注册成功'
		// 		});
		// 	})
		// 	.onFail(function(data) {
		// 		console.log('JIM -注册失败');
		// 		console.log(data);
		// 		uni.showToast({
		// 			title: '注册失败'
		// 		});
		// 	});
	},
	onShow() {
		this.Times_now();
		this.getAppkeyChatrooms();
	},
	methods: {
		log() {
			var that = this;
			console.log(that.username, that.password);
			this.JIM.login({
				username: that.username,
				password: that.password
			})
				.onSuccess(function(data) {
					console.log('%c%s', 'color: red; font-size: 24px;', '登录成功');
					console.log(data);
					uni.reLaunch({
						url: '/pages/tarbar/chat/chat'
					});
				})
				.onFail(function(data) {
					console.log(JSON.stringify(data));
					console.log('JIM -登录失败');
				});
		},
		// 获取聊天室列表
		getAppkeyChatrooms() {
			var that = this;
			this.JIM.getAppkeyChatrooms({
				start: 0
			})
				.onSuccess(function(data) {
					console.log(data.result.rooms);
					console.log('聊天室', JSON.stringify(data.result.rooms));
					that.room = data.result.rooms.reverse();
					//data.code 返回码
					//data.message 描述
					//data.result.total 聊天室总数量
					//data.result.start 本次查询 index 下标值
					//data.result.count 本次查询返回列表大小
					//data.result.rooms[].id 聊天室 id
					//data.result.rooms[].name 聊天室名字
					//data.result.rooms[].description 聊天室描述
					//data.result.rooms[].appkey 聊天室所属 appkey
					//data.result.rooms[].total_member_count 当前聊天室人数
					//data.result.rooms[].max_member_count 聊天室最大容量
					for (var i = 0; i < data.result.rooms.length; i++) {
						that.get_message_time(data.result.rooms[i].ctime, i);
					}
				})
				.onFail(function(data) {
					//data.code 返回码
					//data.message 描述
				});
		},

		// 给聊天室每个对象加一个当前时间
		get_message_time(timestamp, msg_ids) {
			let that = this;
			let Time_now = that.Time_now;

			// var date = new Date(timestamp);
			var date = new Date();
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
			var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + '';
			var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			if (Y == Time_now.Y && M == Time_now.M && D == Time_now.D) {
				that.room[msg_ids].timess = h + m;
				console.log(that.room);
			} else {
				that.room[msg_ids].timess = M + D;
				console.log(that.room);
				console.log(JSON.stringify(that.room));
			}
			// return Y + M + D + h + m + s;
		},
		// test() {
		// 	con = {
		// 		version: '1.4.0',
		// 		target_type: 'single',
		// 		target_id: 'moxiyu',
		// 		from_type: 'user',
		// 		from_id: 'test3',
		// 		from_name: 'test3',
		// 		create_time: '时间戳，精确到秒',
		// 		msg_type: 'text, voice, image, file, video, location, custom',
		// 		msg_body: ''
		// 	};
		// },
		Times_now() {
			var that = this;
			var date = new Date();
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
			var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			// console.log(date)
			that.Time_now.Date = date;
			that.Time_now.Y = Y;
			that.Time_now.M = M;
			that.Time_now.D = D;
			that.Time_now.h = h;
			that.Time_now.m = m;
			that.Time_now.s = s;
		},
		// 进入聊天室页面，存当前聊天时信息chater_info
		to_chat(list_id) {
			var that = this;
			console.log(that.room[list_id]);
			// console.log(JSON.stringify(that.room[list_id]))

			var chater_info = that.room[list_id];
			uni.setStorage({
				key: 'chater_info',
				data: chater_info
			});
			uni.navigateTo({
				url: '../../chat/chat',
				animationDuration: 300
			});
		}
	},
	components: {
		nodata
	}
};
</script>

<style></style>
