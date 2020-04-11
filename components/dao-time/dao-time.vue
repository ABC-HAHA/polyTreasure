<template>
	<span style="color: #e7ebed;">{{ time }}</span>
</template>

<script>
export default {
	data() {
		return {
			time: '',
			flag: false
		};
	},
	mounted() {
		let tt = setInterval(() => {
			if (this.flag == true) {
				clearInterval(tt);
				for (var i = 1; i < 1000; i++) {
					clearInterval(i);
				}
			}
			this.timeDown();
		}, 1000);
	},
	props: {
		endTime: {
			type: String
		}
	},
	methods: {
		timeDown() {
			const endTime = new Date(this.endTime);
			const nowTime = new Date();
			let leftTime = parseInt((endTime.getTime() - 28800000 - nowTime.getTime()) / 1000);
			let d = parseInt(leftTime / (24 * 60 * 60));
			let h = this.formate(parseInt((leftTime / (60 * 60)) % 24));
			let m = this.formate(parseInt((leftTime / 60) % 60));
			let s = this.formate(parseInt(leftTime % 60));
			// console.log(leftTime);
			if (leftTime <= 0) {
				for (var i = 1; i < 1000; i++) {
					clearInterval(i);
				}
				this.flag = true;
				this.$emit('timeEnd');
			}
			this.time = `${d}天${h}小时${m}分${s}秒`;
			// console.log(this.time);
		},
		formate(time) {
			if (time >= 10) {
				return time;
			} else {
				return `0${time}`;
			}
		}
	}
};
</script>

<style scoped></style>
