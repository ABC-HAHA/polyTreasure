(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"223f":function(e,t,n){"use strict";var o=n("ab49"),a=n.n(o);a.a},"2afd":function(e,t,n){"use strict";n.r(t);var o=n("f507");for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);n("223f");var u,r,i,c,l=n("f0c5"),f=Object(l["a"])(o["default"],u,r,!1,null,null,null,!1,i,c);t["default"]=f.exports},"51c2":function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=c(n("66fd")),u=c(n("93aa")),r=c(n("abec")),i=n("2f62");function c(e){return e&&e.__esModule?e:{default:e}}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){f(e,t,n[t])})}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p=e.requireNativePlugin("openinstall-plugin"),s={onLaunch:function(){var t=this;e.onTabBarMidButtonTap(function(){e.navigateTo({url:"/pages/tarbar/redpacket/redpacket"})}),p.getInstall(8,function(t){e.setStorage({key:"openinstallInfo",data:JSON.stringify(t),success:function(e){o("log","ok"," at App.vue:19")}})}),e.getStorage({key:"userInfo",success:function(e){e.data&&t.login(e.data)}}),e.getStorage({key:"weixinUserInfo",success:function(e){e.data&&t.wixinlogin(e.data)}}),o("log","App Launch"," at App.vue:54")},onShow:function(){o("log","App Show"," at App.vue:66"),a.default.prototype.JIM=new u.default({});var t="07a987a5aae3ef43d0ce4aa1",n=(new Date).getTime(),i=(0,r.default)("appkey=07a987a5aae3ef43d0ce4aa1&timestamp="+n+"&random_str=022cd9fd995849b66666&key=1e10bb122ac861ac18a583fe");o("log",i," at App.vue:72"),this.JIM.init({appkey:t,random_str:"022cd9fd995849b66666",signature:i,timestamp:n,flag:1}).onSuccess(function(e){o("log","JIM初始化成功",e," at App.vue:81")}).onFail(function(e){o("log","JIM初始化失败",e," at App.vue:85")}),this.JIM.onDisconnect(function(){o("log","JIM断开链接"," at App.vue:89")}),this.JIM.onMsgReceive(function(t){o("log","在线接受消息"," at App.vue:94"),o("log",t," at App.vue:95"),e.$emit("msg_ol",t.messages[0].content)})},onHide:function(){o("log","App Hide"," at App.vue:109")},methods:l({},(0,i.mapMutations)(["login","wixinlogin","allowDown","allowPush","storeImage","storeDevice","inviteCode"]))};t.default=s}).call(this,n("6e42")["default"],n("0de9")["default"])},8369:function(e,t,n){"use strict";(function(e){n("69e0"),n("921b");var t=u(n("66fd")),o=u(n("2afd")),a=u(n("b231"));function u(e){return e&&e.__esModule?e:{default:e}}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){i(e,t,n[t])})}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=function(){return n.e("common/vendor").then(n.t.bind(null,"5f5b",7))};t.default.component("md5",c);var l=function(){return Promise.resolve().then(n.t.bind(null,"93aa",7))};t.default.component("JIM",l);var f=function(){return n.e("colorui/components/cu-custom").then(n.bind(null,"b5ee"))};t.default.component("cu-custom",f),t.default.config.productionTip=!1,o.default.mpType="app",t.default.prototype.$store=a.default,t.default.prototype.websiteUrl="http://47.114.182.123/earnshare-api";var p=new t.default(r({},o.default));e(p).$mount()}).call(this,n("6e42")["createApp"])},ab49:function(e,t,n){},f507:function(e,t,n){"use strict";n.r(t);var o=n("51c2"),a=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,function(){return o[e]})}(u);t["default"]=a.a}},[["8369","common/runtime","common/vendor"]]]);