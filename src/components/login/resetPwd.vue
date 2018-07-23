<template>
<div>
  <div class="dh">
    <span class='cancel'>修改密码</span>
  </div>
  <div class="registerContainer">
    <div class="register">
      <div class="form">
        <div class="item">
        	  <input type="password" id='aaa' placeholder="请输入原密码" v-model="form.oldPassword" @focus='showNameTip' maxlength="20" :class='{errorinput:tip.oldErr}'>
          <!--点击确认以后校验原密码输入对错    v-if="tip.oldErr"-->
          <!--<span class="tip itemError">{{tip.oldPwdErr}}</span>-->
        </div>
        <div class="item">
          <input type="password" placeholder="请输入新密码" @focus="showPwdTip" @input="pwdReplace($event)"  @blur='checkPwd' @keyup='changeLevel($event)' maxlength="20" :class='{errorinput:tip.newPwdErr}'>
          <span class="tip" v-if="tip.pwd">{{tip.password}}</span>
          <span class="tip itemError" v-if="tip.newPwdErr">{{tip.passwordErr}}</span>
          <ul>
            <li :class="{low:pwdLevel=='low'}">低</li>
            <li :class="{mid:pwdLevel=='mid'}">中</li>
            <li :class="{high:pwdLevel=='high'}">高</li>
          </ul>
        </div>
        <div class="item">
          <input type="password" placeholder="再次确认密码" v-model='form.confirm_password' @focus='removeCpwdTip' maxlength="20" :class='{errorinput:tip.cpwd}'>
          <span class="tip itemError" v-if='tip.cpwd'>{{tip.cpassword}}</span>
        </div>
        <div class="submit">
        	<!-- :disabled='reg'-->
          <button @click="confirm">{{submit}}</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['submit'],
    data () {
    	  let INFO = JSON.parse(sessionStorage.getItem('INFO'));
      return {
        reg:true,
        headers:{client:'1',token:INFO.token,userId:INFO.userId},
        pwdLevel:'',
        form:{
        	  oldPassword:'',
          password:'',
          confirm_password:'',
          checked:false
        },
        tip:{
          oldErr:false,
          newPwdErr:false,
          cpwdErr:false,
          name:false,
          pwd:false,
          cpwd:false,
          vili:false,
          oldPwdErr:"原密码输入错误，请重新输入",
          password:"密码需由6-20位数字及字母组成",
          passwordErr:"密码不能为空",
          cpassword:'两次密码不一致,请重新输入'
        }
      }
    },
    watch:{
      'form.checked':{
          handler:function(val,oldval){
            if(val == true){
              this.reg = false;
            }else{
              this.reg = true;
            }
          },
          deep:true//对象内部的属性监听，也叫深度监听
      }
    },
    methods : {
      messageErr (str) {
        this.$message({message:str,duration:3000,type:'error'});
      },
      checkPwd () {
        this.tip.pwd = false;
        if(!this.form.password){
          this.tip.newPwdErr=true;
          this.tip.passwordErr = '密码不能为空';
          return this.tip.newPwdErr;
        }
        this.tip.passwordErr = '密码不符合要求，请重新设置';
        this.tip.newPwdErr = !this.$util.vili.password(this.form.password);
        return this.tip.newPwdErr;
      },
      checkCpwd () {
        if(!this.form.confirm_password){
          this.tip.cpwd=true;
          this.tip.cpassword = '密码不能为空';
          return this.tip.cpwd;
        }
        this.tip.cpassword = '两次密码不一致,请重新输入';
        this.tip.cpwd = !(this.form.password===this.form.confirm_password);
        return this.tip.cpwd;
      },
      showNameTip () {
        this.tip.name = true;
        this.tip.oldErr = false;
        this.tip.oldPwdErr="原密码输入错误，请重新输入";
        this.tip.password="密码需由6-20位数字及字母组成";
      },
      showPwdTip () {
        this.tip.password = '密码需由6-20位数字及字母组成';
        this.tip.pwd = true;
        this.tip.newPwdErr= false;
      },
      pwdReplace ($event) {
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[\W]/g,'');
        this.form.password = dom.value;
      },
      changeLevel ($event) {
        this.pwdReplace($event);
        let len = this.form.password.length;
        if(len>20){
          this.form.password=this.form.password.substring(0,20);
        }
        let str = this.form.password;
        if(str.length<6){
          this.pwdLevel='';
          return;
        }
        let d=/\d/.test(str);
        let A=/[A-Z]/.test(str);
        let a=/[a-z]/.test(str);
        if(str.length>11){
          if(a && A && d){
            this.pwdLevel='high';
          }else if(d && (a || A)){
            this.pwdLevel='mid';
          }else{
            this.pwdLevel='';
          }
          return;
        }
        if( a && A && d){
          this.pwdLevel='mid';
        }else if (d && (a || A)){
          this.pwdLevel = 'low';
        }else{
          this.pwdLevel='';
        }
      },
      removeNameTip () {
        this.tip.name = false;
      },
      removePwdTip () {
        this.tip.newPwdErr = false;
      },
      removeCpwdTip () {
        this.tip.cpwd = false;
      },
      confirm () {
        if(this.tip.oldErr+this.tip.newPwdErr+this.tip.cpwdErr){//+this.tip.viliErr
          return;
        }
        let err = this.checkPwd()+this.checkCpwd();//this.checkName()+
        if(err){
          return;
        }
        if(this.checkPwdLevel ()){
          return;
        }
        let data = {
          "data": {
            "oldPwd": this.form.oldPassword,
            "newPwd":this.form.confirm_password
          }
        };
        data.service = "generalService";
        data.method = "modifyPassword";
        this.reg=true;
        this.$api.post('',data,this.registerSuc,this.registerErr,this.headers);
      },
      registerSuc (data) {
        this.reg=false;
        this.$alert('请重新登录', '密码修改成功', {
          confirmButtonText: '确定',
          callback: action => {
			this.$router.push({name:'login'});	
          }
        });        
      },
      registerErr (res) {
        this.reg=false;
        this.messageErr(res.returnMessage);
      },
      checkPwdLevel () {
        if(!this.pwdLevel){
          this.tip.password="密码不符合安全规则";
          this.tip.newPwdErr = true;
          return true;
        }
      }
    },
    created () {
      this.$util.goTop();
    }
  };
</script>
<style lang="less" src="@/components/login/resetPwd.less"></style>
<style lang='less'>
  .el-message-box__headerbtn .el-message-box__close:hover{
    color:#f0871e !important;
  }
  .el-message-box__title{
    text-align:center;
  }
  .el-message-box__btns{
    text-align:center;
  }
  .el-message-box__message{
    max-height:500px;
    overflow-y:auto;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color:#f0871e !important;
    border-color:#f0871e !important;
  }
  .el-checkbox__inner{
    border-color:#f0871e !important;
  }
  .el-checkbox__inner:hover{
    border-color:#f0871e !important;
  }
  .el-checkbox__inner:focus{
    border-color:#f0871e !important;
  }
</style>