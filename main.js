import Vue from 'vue'
import App from './App'
import './common/filter.js'
import store from './store/index.js'



import md5 from './js_sdk/js-md5/build/md5.min.js'
Vue.component('md5',md5)
import JIM from './js_sdk/wxmp-jiguang/jmessage-wxapplet-sdk-1.4.0/jmessage-wxapplet-sdk-1.4.0.min.js'
Vue.component('JIM',JIM)
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
// Vue.prototype.JIM=new JMessage({})

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store
// Vue.prototype.websiteUrl = 'http://192.168.5.254:8081/earnshare-api';
Vue.prototype.websiteUrl = 'http://47.114.182.123/earnshare-api';
// Vue.prototype.websiteUrl = 'http://118.31.120.214/earnshare-api';
// Vue.prototype.websiteUrl = 'http://192.168.5.123:8081/earnshare-api';
// Vue.prototype.websiteUrl = 'http://192.168.43.68:8081/earnshare-api';

const app = new Vue({
	...App
})
app.$mount()
