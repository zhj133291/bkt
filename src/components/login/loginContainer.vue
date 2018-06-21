<template>
	<div class="bkt_loginContainer">
		<div class="bkt_logoImg"><img src="./bkt_logo.png"/></div>
		<div class="bkt_title">诚税融银行管理系统</div>

		<div class="bkt_content">
			<div class="bkt_head">
				<img class="bkt_head_img" src="./bkt_head.png"/>
				<div class="bkt_userlogin">登录</div>
			</div>
			<div class="bkt_phone">
				<input type="text" placeholder="请输入手机号码" name="loginName" @keyup="nameReplace" v-model="form.loginName" autocomplete="off" @focus="removeTip" @blur="checkName"/>
			</div>
			<div class="bkt_pwd">
				<input :type="type" placeholder="请输入密码" name="password" v-model="form.passWord" @keyup="pwdReplace" autocomplete="off" @focus="removeTip"/>
				<i class='iconfont' @click='changeType' :class='{"icon-eye":type!=="text","icon-see":type=="text"}'></i>
			</div>

			<div class="bkt_errorMsg" v-if="form.tipShow">{{form.tip}}</div>
			<div class="bkt_loginBtn">
      			<button @click="loginClick" :disabled='reg'>登 录</button>
      		</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data () {
			let form={
		        loginName:'',
		        passWord:'',
		        tip:'',
		        tipShow:false
		      };
			let reg=false;//禁止重复点击，发送请求
			let btnDisabled=true;
		  return {
		  	type:'password',
			 	reg: false,
				btnDisabled: btnDisabled,
				form: form,
				headers:{
			    client:"1",
			    userId:"",
			    token:""
			  }
			};
	  },
	  methods: {
	  	checkName () {
//	  		输入框失去焦点时调用
//	  		this.form.tipShow = false;
//	     	this.form.tip = "手机号格式有误";
	  	},
	  	changeType () {
	  		this.type = this.type == 'password'?'text':'password';
	  	},
	   	nameReplace () {
	      this.form.loginName=this.form.loginName.replace(/[^\d]/g,'');
	      let len = this.form.loginName.length;
	      if(len>11){
          this.form.loginName=this.form.loginName.substring(0,11);
        }
      },
      pwdReplace () {
        this.form.passWord=this.form.passWord.replace(/[\W]/g,'');
        let len = this.form.passWord.length;
        if(len>20){
          this.form.passWord=this.form.passWord.substring(0,20);
        }
      },
      removeTip () {
        this.form.tip='';
        this.form.tipShow=false;
      },
      loginSuc (data) {
        this.reg=false;
        sessionStorage.setItem("INFO",JSON.stringify(data));
        this.$router.push('index');
      },
      loginErr (res) {
        this.reg=false;
        this.form.tipShow=true;
        let ajaxCode=this.$utils.ajaxCode;
        let returnCode=res.returnCode;
        if(returnCode==ajaxCode.userStatusErr){
          this.form.tip="用户状态异常,请与管理员确认";
        }else if(returnCode==ajaxCode.nameOrPwdErr){
          this.form.tip="手机号/密码错误";
        }else{
          this.form.tip=res.returnMessage;
        }
      },
	   	loginClick() {
	   		if (!this.form.loginName){
					this.form.tip = "手机号不能为空";
	   			this.form.tipShow = true;
	   			return;
	   		}
	   		let name = !this.$utils.vili.loginName(this.form.loginName);
	   		if (name) {
	   			this.form.tip = "手机号/密码错误";
	   			this.form.tipShow = true;
	   			return;
	   		}
	   		if (!this.form.passWord){
					this.form.tip = "密码不能为空";
	   			this.form.tipShow = true;
	   			return;
	   		}
	   		let pwd = !this.$utils.vili.password(this.form.passWord);
	   		let str = this.form.passWord;
	   		let d = /\d/.test(str);
	   		let A = /[A-Z]/.test(str);
	   		let a = /[a-z]/.test(str);
	   		if (pwd || !(d && (A || a))) {
	   			this.form.tip = "手机号/密码错误";
	   			this.form.tipShow = true;
	   			return;
	   		}
	   		if( this.form.tipShow ){
					return;
	   		}
	   		this.reg = true;
	   		let data = {
	   			"service": "officerService",
	   			"method": "login",
	   			"data": {
	   				"loginName": this.form.loginName,
	   				"password": this.form.passWord
	   			}
	   		};
	   		this.$api.post('',data,this.loginSuc,this.loginErr,this.headers);
	   	},
	   	tmpClick() {
	   		this.$router.push('creditReport');
	   	}
	   }
    }
</script>

<style lang="less">
	@width:298px;
	@height:361px;
	.blue{
		color:#3185ff;
	}
	.bkt_loginContainer {
		.bkt_logoImg {
			width: 168px;
			height: 79px;
			margin-top: 48px;
			margin-left: 79px;
		}
		.bkt_title {
			text-align: center;
			font-family: MyriadPro-Regular;
			font-size: 51px;
			font-weight: normal;
			font-stretch: normal;
			color: #ffffff;
		}
		.bkt_content {
			width: @width;
			height: @height;
			margin: 55px auto 0 auto;
			left: calc(~"50vw - "@width/2);
			background-color: #ffffff;
			box-shadow: 0px 4px 6px 0px rgba(144, 144, 144, 0);
			padding-top:25px;
			.bkt_head {
				width: 63px;
				height: 97px;
				margin: 0 auto;
				.bkt_head_img {
					width: 63px;
					height: 63px;
				}
				.bkt_userlogin {
					text-align: center;
					font-family: AdobeHeitiStd-Regular;
					font-size: 14px;
					font-weight: normal;
					font-stretch: normal;
					color: #555555;
					margin: 13px auto 0 auto;
				}
			}
			.bkt_phone, .bkt_pwd {
				position:relative;
				width: 262px;
				height: 40px;
				background-color: #ffffff;
				border: solid 1px #eaeaea;
				margin: 15px 18px 0 18px;
				input {
					color: #a1a1a1;
					box-sizing: border-box;
					width: 262px;
					height: 40px;
					padding: 6px 21px;
				}
				i{
					cursor:pointer;
					position:absolute;
					top:12px;
					right:10px;
				}
			}
			.bkt_errorMsg {
				margin: 10px 18px;
				height:15px;
				font-family: AdobeHeitiStd-Regular;
				font-size: 11px;
				font-weight: normal;
				font-stretch: normal;
				color: #e4001b;
			}
			.bkt_loginBtn {
				width: 262px;
				height: 44px;
				margin: 32px 18px 52px 18px;
				button {
					width: 262px;
					height: 40px;
					background-color: #3185ff;
					font-size: 11px;
					color: #FFFFFF;
					outline:none;
					border:none;
					cursor:pointer;
					&:hover{
					  background-color: rgba(39, 106, 204, 1)
					}
					&:disabled{
					  cursor:not-allowed;
					}
				}
			}
		}
	}

</style>
