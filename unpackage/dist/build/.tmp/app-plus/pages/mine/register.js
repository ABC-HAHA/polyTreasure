(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/register"],{2756:function(t,e,n){},"277c":function(t,e,n){"use strict";var i=n("2756"),o=n.n(i);o.a},4369:function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{phoneNum:"",smsCode:"",password:"",phoneFalg:!1,codeFalg:!1,pwdFalg:!1,beginFalg:!1,sendCodeText:"发送验证码",timeText:"",num:60,checkFalg:!1,system:""}},onShow:function(){this.system=plus.os.name.toUpperCase()},methods:{sendCode:function(){var e=/^1[3-9]\d{9}$/;if(""==this.phoneNum||!e.test(this.phoneNum))return t.showToast({title:"请检查手机号",icon:"none",mask:!0}),setTimeout(function(){t.hideToast()},2e3),!1;this.codeTime=setInterval(this.countDown,1e3);var i=this.phoneNum;t.request({url:this.websiteUrl+"/api/user/code/sms",method:"POST",data:{mobile:i},success:function(t){n("log",t," at pages\\mine\\register.vue:82")},fail:function(){},complete:function(){}})},countDown:function(){this.num--,this.beginFalg=!0,this.timeText=this.num+"s",this.num<0&&(this.num=60,this.timeText="",this.beginFalg=!1,clearInterval(this.codeTime))},checkPhone:function(){var e=/^1[3-9]\d{9}$/;return""!=this.phoneNum&&e.test(this.phoneNum)?(this.phoneFalg=!0,!0):(this.phoneFalg=!1,t.showToast({title:"请检查手机号",icon:"none",mask:!0}),setTimeout(function(){t.hideToast()},2e3),!1)},checkCode:function(){return""!=this.smsCode?(this.codeFalg=!0,!0):(this.codeFalg=!1,t.showToast({title:"验证码不能为空",icon:"none",mask:!0}),setTimeout(function(){t.hideToast()},2e3),!1)},checkPwd:function(){var e=/^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9]{6,15}$/;return""!=this.password&&e.test(this.password)?(this.pwdFalg=!0,!0):(this.pwdFalg=!1,t.showToast({title:"请输入6-15位的字母数字组合",icon:"none",mask:!0}),setTimeout(function(){t.hideToast()},2e3),!1)},isAgree:function(){return this.checkFalg?(this.checkFalg=!1,t.showToast({title:"请阅读相关协议并同意",icon:"none",mask:!0}),setTimeout(function(){t.hideToast()},2e3),!1):(this.checkFalg=!0,!0)},toRule:function(){t.navigateTo({url:"/pages/mine/rule",animationType:"zoom-fade-out",animationDuration:500})},hasAgree:function(){return!!this.checkFalg},register:function(){if(!(this.checkPhone()&&this.checkCode()&&this.checkPwd()&&this.hasAgree()))return!1;var e=this.password,n=this.phoneNum;t.request({url:this.websiteUrl+"/api/user/regist",method:"POST",data:{mobile:n,pw:e,smsCode:this.smsCode},success:function(e){e&&200===e.data.code?(t.showToast({title:"注册成功",mask:!0}),setTimeout(function(){t.hideToast(),t.navigateBack({delta:1,animationType:"slide-in-left"})},1600)):(t.showToast({title:e.data.message,icon:"none",mask:!0}),setTimeout(function(){t.hideToast()},2e3))},fail:function(){},complete:function(){}})}}};e.default=i}).call(this,n("6e42")["default"],n("0de9")["default"])},7589:function(t,e,n){"use strict";n.r(e);var i=n("4369"),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);e["default"]=o.a},"793e":function(t,e,n){"use strict";(function(t){n("69e0"),n("921b");i(n("66fd"));var e=i(n("fd6c"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},c081:function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return s}),n.d(e,"a",function(){return i})},fd6c:function(t,e,n){"use strict";n.r(e);var i=n("c081"),o=n("7589");for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);n("277c");var a,u=n("f0c5"),c=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);e["default"]=c.exports}},[["793e","common/runtime","common/vendor"]]]);