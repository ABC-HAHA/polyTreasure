(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/task/shipinPromoting/detail/detail"],{"56d5":function(t,e,a){"use strict";var i=a("765d"),n=a.n(i);n.a},"6f78":function(t,e,a){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(a("7af9"));function s(t){return t&&t.__esModule?t:{default:t}}var o,u,r,l,d,c=function(){return a.e("components/uni-popup/uni-popup").then(a.bind(null,"f33d"))},f=function(){return a.e("components/share/share").then(a.bind(null,"9edc"))},h=[],p={data:function(){return{cancelShow:!1,showMaskValue:!1,btnArray:"",btnIndex:0,showUpload:!1,checkValue:!0,detailData:[],upperLimit:0,isLimit:!1,upPic:"",upPicList:"",type:""}},methods:{play:function(){this.showMaskValue=!this.showMaskValue,t("log",this.showSwiperValue," at pages\\task\\shipinPromoting\\detail\\detail.vue:92")},close:function(){this.showMaskValue=!this.showMaskValue},closeAlert:function(){this.cancelShow=!1},getTask:function(e){this.$store.state.isLogin?(t("log",this.$store.state.userInfo.status," at pages\\task\\shipinPromoting\\detail\\detail.vue:109"),t("log",this.btnIndex," at pages\\task\\shipinPromoting\\detail\\detail.vue:112"),1==this.btnIndex?(t("log",this.btnIndex," at pages\\task\\shipinPromoting\\detail\\detail.vue:115"),t("log",u," at pages\\task\\shipinPromoting\\detail\\detail.vue:116"),t("log",this.$store.state.isLogin," at pages\\task\\shipinPromoting\\detail\\detail.vue:117"),o=this,i.request({url:this.websiteUrl+"/api/task/recieve",method:"GET",header:{Authorization:l},data:{esaid:u,userId:r},success:function(e){t("log",e,11111111111," at pages\\task\\shipinPromoting\\detail\\detail.vue:130"),601==e.data.code?(i.showToast({title:"请去审核账户！",mask:!0}),i.redirectTo({url:"/pages/mine/auditPage",animationType:"slide-in-right",animationDuration:300})):705==e.data.code?(plus.nativeUI.toast(e.data.msg),o.btnIndex=2):200==e.data.code&&(o.showUpload=!0,i.showToast({title:"领取成功",mask:!0}),o.btnArray="提交审核",o.btnIndex=2)}})):2==this.btnIndex&&(t("log","点击了提交审核"," at pages\\task\\shipinPromoting\\detail\\detail.vue:165"),this.submitAudit())):(this.cancelShow=!0,t("log","未登录"," at pages\\task\\shipinPromoting\\detail\\detail.vue:175"))},copy:function(){var t=this.detailData.esaDescribe1;i.setClipboardData({data:this.strFormat(t),success:function(){i.showToast({title:"复制成功",mask:!0}),setTimeout(function(){i.hideToast()},2e3)}})},pinglun:function(){var t=this.detailData.esaDescribe1;i.setClipboardData({data:this.strFormat(t),success:function(){i.showToast({title:"复制评论语成功",mask:!0}),setTimeout(function(){i.hideToast()},2e3)}})},strFormat:function(t){return t.replace(/<br\s*\/?>/gi,"\r\n")},hidePopup:function(){this.type=""},share:function(){this.type="bottom_share"},successShare:function(){i.showToast({title:"分享成功！！！",mask:!0})},failShare:function(){i.showToast({title:"分享失败！！！",mask:!0})},saveVideo:function(){var t=this.detailData["url"];i.downloadFile({url:t,success:function(t){i.saveVideoToPhotosAlbum({filePath:t.tempFilePath,success:function(){i.showToast({title:"保存成功",duration:2e3,mask:!0}),setTimeout(function(){i.hideToast()},2e3)},fail:function(t){i.showToast({title:"保存失败",icon:"none",duration:2e3,mask:!0}),setTimeout(function(){i.hideToast()},2e3)}})},fail:function(){i.showToast({title:"下载失败",icon:"none",duration:2e3,mask:!0}),setTimeout(function(){i.hideToast()},2e3)}})},publish:function(){i.navigateTo({url:"/pages/help/getDetail/getDetail",animationType:"slide-in-left"})},upload:function(){var t=this;i.chooseImage({success:function(e){var a=e.tempFilePaths;i.uploadFile({url:t.websiteUrl+"/api/file/uploadFile",filePath:a[0],name:"file",header:{Authorization:l},success:function(t){i.showToast({title:"上传成功",mask:!0}),o.upPic=JSON.parse(t.data).imgurl,h.push(o.upPic),o.checkValue=!1}})}})},submitAudit:function(){0==h.length?plus.nativeUI.toast("请上传需要审核的照片！！！"):i.request({url:this.websiteUrl+"/api/comnet/audit",method:"POST",header:{Authorization:l},data:{extendId:d,imgList:h},success:function(e){t("log",e.data," at pages\\task\\shipinPromoting\\detail\\detail.vue:357"),i.showToast({title:"提交审核成功",mask:!0}),o.showUpload=!0,o.checkValue=!1,1==e.data.status&&(o.btnArray=e.data.statusStr,o.btnIndex=3)}})}},components:{hFormAlert:n.default,uniPopup:c,sharePage:f},onLoad:function(e){r=this.$store.state.userInfo.userId,l=this.$store.state.userInfo.token,o=this,u=e.esaId,this.$store.state.isLogin?(t("log","已经登录"," at pages\\task\\shipinPromoting\\detail\\detail.vue:387"),i.request({url:this.websiteUrl+"/api/comnet/info/"+u,method:"GET",data:{userId:r},success:function(e){if(o.detailData=e.data.data,d=o.detailData.extendInfoId,t("log",o.detailData," at pages\\task\\shipinPromoting\\detail\\detail.vue:398"),-1==o.detailData.status){if(o.upperLimit=o.detailData.esaUsedCount,o.upperLimit>=o.detailData.esaTotalCount)return o.isLimit=!0,void(o.btnArray="任务已达上限");o.btnIndex=1,o.btnArray="领取任务"}0==o.detailData.status&&(o.btnIndex=2,o.btnArray=o.detailData.statusStr,o.showUpload=!0),1==o.detailData.status&&(o.btnIndex=3,o.btnArray=o.detailData.statusStr,o.showUpload=!0,o.checkValue=!1,o.upPicList=o.detailData.imgs[0].image),2==o.detailData.status&&(o.btnArray=o.detailData.statusStr,o.showUpload=!1,o.checkValue=!0,o.detailData.status,o.btnIndex=1,o.btnArray="领取任务"),3==o.detailData.status&&(o.btnArray=o.detailData.statusStr,o.showUpload=!0,o.checkValue=!1)}})):(t("log","未登录"," at pages\\task\\shipinPromoting\\detail\\detail.vue:465"),i.request({url:this.websiteUrl+"/api/comnet/info/"+u,method:"GET",success:function(e){if(o.detailData=e.data.data,t("log",o.detailData," at pages\\task\\shipinPromoting\\detail\\detail.vue:471"),-1==o.detailData.status){if(o.upperLimit=o.detailData.esaUsedCount,o.upperLimit>=o.detailData.esaTotalCount)return o.isLimit=!0,void(o.btnArray="任务已达上限");o.btnIndex=1,o.btnArray="领取任务"}}}))},onShow:function(){}};e.default=p}).call(this,a("0de9")["default"],a("6e42")["default"])},"765d":function(t,e,a){},"7af9":function(t,e,a){"use strict";a.r(e);var i=a("8ab3"),n=a("7ecd");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a("a80e");var o,u=a("f0c5"),r=Object(u["a"])(n["default"],i["b"],i["c"],!1,null,"8e2eef66",null,!1,i["a"],o);e["default"]=r.exports},"7ecd":function(t,e,a){"use strict";a.r(e);var i=a("b1f0"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e["default"]=n.a},8317:function(t,e,a){"use strict";a.r(e);var i=a("e6df"),n=a("9b78");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a("56d5");var o,u=a("f0c5"),r=Object(u["a"])(n["default"],i["b"],i["c"],!1,null,"db4579c4",null,!1,i["a"],o);e["default"]=r.exports},"8ab3":function(t,e,a){"use strict";var i,n=function(){var t=this,e=t.$createElement;t._self._c},s=[];a.d(e,"b",function(){return n}),a.d(e,"c",function(){return s}),a.d(e,"a",function(){return i})},9656:function(t,e,a){"use strict";(function(t){a("69e0"),a("921b");i(a("66fd"));var e=i(a("8317"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},"9b78":function(t,e,a){"use strict";a.r(e);var i=a("6f78"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e["default"]=n.a},a2ec:function(t,e,a){},a80e:function(t,e,a){"use strict";var i=a("a2ec"),n=a.n(i);n.a},b1f0:function(t,e,a){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{title:{type:String,default:"网赚登录"}},data:function(){return{maskValue:!0,inviteCode:""}},onLoad:function(){var e=this;t.getStorage({key:"openinstallInfo",success:function(t){a("log","ok"," at components\\h-form-alert\\h-form-alert.vue:37"),e.inviteCode=JSON.parse(JSON.parse(t.data).bindData).inviteCode}})},methods:{closeMask:function(){this.$emit("closeEvent")},weixinlogin:function(){var e=this;t.login({provider:"weixin",success:function(a){t.getUserInfo({provider:"weixin",success:function(t){e.toWeixinLogin(a,t)}})}})},toWeixinLogin:function(e,a){var i=this,n={openid:e.authResult.openid,nickname:a.userInfo.nickName,headimgurl:a.userInfo.avatarUrl,accessToken:e.authResult.access_token,refreshToken:e.authResult.refresh_token,inviteCode:i.inviteCode};t.request({url:this.websiteUrl+"/api/user/weixin",method:"POST",data:n,success:function(e){200==e.data.code?(i.$store.commit("login",e.data.user),t.switchTab({url:"/pages/tarbar/mine/mine",animationType:"slide-in-right"})):plus.nativeUI.toast(e.data.msg)},fail:function(){},complete:function(){}})},iphonelogin:function(){t.navigateTo({url:"/pages/mine/login",animationType:"slide-in-right"})}}};e.default=i}).call(this,a("6e42")["default"],a("0de9")["default"])},e6df:function(t,e,a){"use strict";var i={"uni-popup":()=>a.e("components/uni-popup/uni-popup").then(a.bind(null,"f33d"))},n=function(){var t=this,e=t.$createElement;t._self._c},s=[];a.d(e,"b",function(){return n}),a.d(e,"c",function(){return s}),a.d(e,"a",function(){return i})}},[["9656","common/runtime","common/vendor"]]]);