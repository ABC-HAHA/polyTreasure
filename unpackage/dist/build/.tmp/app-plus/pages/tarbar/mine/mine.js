(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tarbar/mine/mine"],{"13a6":function(t,e,n){"use strict";var i=n("eb1a"),a=n.n(i);a.a},"5a33":function(t,e,n){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("7af9"));function o(t){return t&&t.__esModule?t:{default:t}}var r={components:{formAlert:a.default},data:function(){return{inviteCode:"",userInfor:this.$store.state.uesrInfo,advertArr:[{name:"张三",money:20},{name:"李武",money:30}],userData:{bankCards:[]},alertLoginStatus:!1,customeQQ:976275793,gradeLevelArr:["低级","中级","高级"]}},onShow:function(){this.userData={bankCards:[]},this.getUserInfor()},computed:{user_image:function(){return this.$store.state.userInfo.wexinImg?this.$store.state.userInfo.wexinImg:""},user_name:function(){return this.$store.state.userInfo.wexinNickName?this.$store.state.userInfo.wexinNickName:"未登录"},inviteName:function(){return this.userData.inviteName?this.userData.inviteName:""},bind_number:function(){return this.userData.mobile?this.userData.mobile:""},bind_back_number:function(){return this.userData.bankCards[0]?this.userData.bankCards[0].cardId:""},userName:function(){return this.userData.userName?this.userData.userName:""},auditStatus:function(){var t=this.userData.statusStr?this.userData.statusStr:"未审核";return t},gradeLevel:function(){var t=this.$store.state.userInfo.inviteGroupId?this.$store.state.userInfo.inviteGroupId:0;return this.gradeLevelArr[t]},teams:function(){return this.userData.teams?this.userData.teams:"0"},balance:function(){return this.userData.balance?this.userData.balance:"0"},todayIncome:function(){return this.userData.todayIncome?this.userData.todayIncome:"0"},totalRevenue:function(){return this.userData.totalRevenue?this.userData.totalRevenue:"0"},promotionNumber:function(){return this.userData.promotionNumber?this.userData.promotionNumber:"0"},loginStatus:function(){return!!this.$store.state.isLogin&&this.$store.state.isLogin}},methods:{toMsg:function(){this.loginStatus,t.navigateTo({url:"/pages/mine/news",animationType:"slide-in-right"})},personalInformation:function(){this.loginStatus?t.navigateTo({url:"/pages/mine/personalPage",animationType:"slide-in-right"}):t.navigateTo({url:"/pages/mine/login",animationType:"slide-in-right"})},commitAudit:function(){t.navigateTo({url:"/pages/mine/auditPage",animationType:"slide-in-right"})},myTeam:function(){t.navigateTo({url:"/pages/mine/myTeam",animationType:"slide-in-right"})},briefIntroduction:function(){t.navigateTo({url:"/pages/mine/briefIntroduction",animationType:"slide-in-right"})},myRecord:function(){t.navigateTo({url:"/pages/mine/myRecord",animationType:"slide-in-right"})},withdrawal:function(){this.loginStatus?t.navigateTo({url:"/pages/mine/withdrawal?balance="+this.userData.balance,animationType:"slide-in-right"}):this.alertLoginStatus=!0},mobileNumber:function(){this.loginStatus?t.navigateTo({url:"/pages/mine/mobileNumber",animationType:"slide-in-right"}):this.alertLoginStatus=!0},alipay:function(){this.userData.userName?t.showToast({title:"已绑定账号",mask:!0}):t.navigateTo({url:"/pages/mine/alipay",animationType:"slide-in-right"})},gotoLogin:function(){t.navigateTo({url:"/pages/mine/login",animationType:"slide-in-right"})},invitationCode:function(){this.loginStatus?t.navigateTo({url:"/pages/mine/invitationCode",animationType:"slide-in-right"}):this.alertLoginStatus=!0},toLine:function(){plus.runtime.openWeb("https://train.yanola.com/talk/chatClient/chatbox.jsp?companyID=631055507&configID=391&jid=6145092818&s=1")},toQQ:function(){var e=this;t.request({url:this.websiteUrl+"/api/customer/qq",method:"GET",success:function(n){i("log",n.data.data.qq," at pages\\tarbar\\mine\\mine.vue:341"),e.customeQQ=n.data.data.qq,t.showModal({title:"提示",content:"QQ:请复制官方群号添加，进群提供邀请码+手机号码才可加入",success:function(t){t.confirm?(i("log","用户点击确定"," at pages\\tarbar\\mine\\mine.vue:348"),plus.runtime.openURL("mqq://im/chat?chat_type=wpa&uin="+e.customeQQ,function(t){plus.nativeUI.alert("本机没有安装QQ，无法启动")})):t.cancel&&i("log","用户点击取消"," at pages\\tarbar\\mine\\mine.vue:353")}})}})},inviteTeam:function(){t.navigateTo({url:"/pages/mine/inviteTeam",animationType:"slide-in-right"})},setting:function(){t.navigateTo({url:"/pages/mine/setting",animationType:"slide-in-right"})},myTaskList:function(){t.navigateTo({url:"/pages/mine/myTaskList",animationType:"slide-in-right"})},getUserInfor:function(){var e=this;e.loginStatus&&t.request({url:e.websiteUrl+"/api/user/userInfo",header:{Authorization:e.$store.state.userInfo.token},success:function(t){500==t.data.code?e.$store.commit("logout"):(e.userData=t.data.data,e.$store.commit("changeStatus",e.userData.status),e.$store.commit("login",e.userData))}})},closeAlert:function(){this.alertLoginStatus=!1},login:function(){t.navigateTo({url:"/pages/mine/login",animationType:"slide-in-right"})},getSwiperData:function(){var e=this;t.request({url:this.websiteUrl+"/api/cash/getWithdrawList",method:"GET",success:function(t){e.advertArr=t.data.data}})}},onLoad:function(){var e=this;this.getSwiperData(),t.getStorage({key:"openinstallInfo",success:function(t){i("log","ok"," at pages\\tarbar\\mine\\mine.vue:429"),e.inviteCode=JSON.parse(JSON.parse(t.data).bindData).inviteCode}})}};e.default=r}).call(this,n("6e42")["default"],n("0de9")["default"])},"7af9":function(t,e,n){"use strict";n.r(e);var i=n("8ab3"),a=n("7ecd");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("a80e");var r,s=n("f0c5"),u=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"8e2eef66",null,!1,i["a"],r);e["default"]=u.exports},"7dad":function(t,e,n){"use strict";n.r(e);var i=n("5a33"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},"7ecd":function(t,e,n){"use strict";n.r(e);var i=n("b1f0"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},"8ab3":function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return i})},a2ec:function(t,e,n){},a80e:function(t,e,n){"use strict";var i=n("a2ec"),a=n.n(i);a.a},b1f0:function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{title:{type:String,default:"网赚登录"}},data:function(){return{maskValue:!0,inviteCode:""}},onLoad:function(){var e=this;t.getStorage({key:"openinstallInfo",success:function(t){n("log","ok"," at components\\h-form-alert\\h-form-alert.vue:37"),e.inviteCode=JSON.parse(JSON.parse(t.data).bindData).inviteCode}})},methods:{closeMask:function(){this.$emit("closeEvent")},weixinlogin:function(){var e=this;t.login({provider:"weixin",success:function(n){t.getUserInfo({provider:"weixin",success:function(t){e.toWeixinLogin(n,t)}})}})},toWeixinLogin:function(e,n){var i=this,a={openid:e.authResult.openid,nickname:n.userInfo.nickName,headimgurl:n.userInfo.avatarUrl,accessToken:e.authResult.access_token,refreshToken:e.authResult.refresh_token,inviteCode:i.inviteCode};t.request({url:this.websiteUrl+"/api/user/weixin",method:"POST",data:a,success:function(e){200==e.data.code?(i.$store.commit("login",e.data.user),t.switchTab({url:"/pages/tarbar/mine/mine",animationType:"slide-in-right"})):plus.nativeUI.toast(e.data.msg)},fail:function(){},complete:function(){}})},iphonelogin:function(){t.navigateTo({url:"/pages/mine/login",animationType:"slide-in-right"})}}};e.default=i}).call(this,n("6e42")["default"],n("0de9")["default"])},e67c:function(t,e,n){"use strict";n.r(e);var i=n("ef6f"),a=n("7dad");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("13a6");var r,s=n("f0c5"),u=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"f3aab636",null,!1,i["a"],r);e["default"]=u.exports},e71e:function(t,e,n){"use strict";(function(t){n("69e0"),n("921b");i(n("66fd"));var e=i(n("e67c"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},eb1a:function(t,e,n){},ef6f:function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return i})}},[["e71e","common/runtime","common/vendor"]]]);