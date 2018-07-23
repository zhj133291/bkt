<template>
    <div class='detailContainer'>
        <div class="dh">
          <span @click='cancel' class='cancel'>人员管理</span><span>&gt;人员详情</span>
        </div>
        <div class="title">
          <div></div>
          <span>人员详情</span>
        </div>
        <div class='form'>
            <div class="tree" v-show='showTree' @mouseleave='closeTree'>
              <el-tree
                :data="treeData"
                node-key="id"
                default-expand-all
                ref='tree'
                :highlight-current='true'
                :expand-on-click-node="false"
                @current-change='selBank'>
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ data.label }}</span>
                </span>
              </el-tree>
            </div>
            <div class='form-group'>
                <div class='label'>
                    <span>员工姓名</span>
                </div>
                <div class='contentRight'>
                    <input id='userName' placeholder="不超过10个汉字" :disabled='user.operateType=="2"' type="text" @focus='removeNameTip' @keyup='nameReplace($event)' @blur='hideNameTip' maxlength="10" @compositionstart="start" @compositionend="end">
                    <span v-if='tip.name'>{{tip.nameTip}}</span>
                    <span v-if='tip.nameErr' class='red'>{{tip.nameErrTip}}</span>
                </div>
            </div>
            <div class='form-group'>
                <div class='label'>
                    <span>手机号</span>
                </div>
                <div class='contentRight'>
                    <input id='userPhone' placeholder="请输入有效的手机号码" type="text" @focus='removePhoneTip' @keyup='phoneReplace($event)' @blur='hidePhoneTip' maxlength="11">
                    <span v-if='tip.phone'>{{tip.phoneTip}}</span>
                    <span v-if='tip.phoneErr' class='red'>{{tip.phoneErrTip}}</span>
                </div>
            </div>
            <div class='form-group'>
                <div class='label'>
                    <span>所属分支</span>
                </div>
                <div class='contentRight downC'>
                  <input type="hidden" v-model='user.bankId'>
                  <input type="text" class='pointer' readonly="readonly" v-model='user.bankName' @click='showSelTree' placeholder="请选择所属分支">
                  <i class="el-select__caret el-input__icon el-icon-arrow-down down" @click='showSelTree'></i>
                  <span  v-if='tip.bankErr' class='red'>{{tip.bankErrTip}}</span>
                </div>
            </div>
            <div class='form-group'>
                <div class='label'>
                    <span>职位</span>
                </div>
                <div class='contentRight'>
                  <el-select v-model="user.duty" placeholder="请选择">
                    <el-option
                      v-for="item in duty"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
            </div>
            <div class='form-group'>
                <div class='label'>
                    <span>状态</span>
                </div>
                <div class='contentRight'>
                  <el-switch v-model="user.status" :active-value=1 :inactive-value=2></el-switch>
                </div>
            </div>
            <div class='form-group'>
                <div class='label'>
                    <span>角色</span>
                </div>
                <div class="contentRight">
                		<el-radio-group v-model="user.roleId">
      					<el-radio-button :key="item.id" :label="item.id" v-for="item in roleList">{{item.title}}</el-radio-button>
    					</el-radio-group>
                </div>
                
            </div>
            <div class="button">
              <button @click='submit' :disabled='reg' class='sure'>保 存</button>
              <button @click='cancel' class='can'>取 消</button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      let INFO = JSON.parse(sessionStorage.getItem('INFO'));
      return {
        pos:'b',
        reg:false,
        showTree:false,
        treeData:[],
        roleList:[],
        duty:[{
            value: 1,
            label: '主管'
          }, {
            value: 2,
            label: '客户经理'
          }
        ],
        user:{
          userId:'',
          userName:'',
          loginName:'',
          status:1,
          bankId:'',
          bankName:'',
          duty:1,
          operateType:'1',
          roleId:1
        },
        tip:{
          name:false,
          nameTip:'请输入不超过10个汉字的员工姓名',
          nameErr:false,
          nameErrTip:'请输入不超过10个汉字的员工姓名',
          phone:false,
          phoneTip:'请输入11位有效的手机号码',
          phoneErr:false,
          phoneErrTip:'请输入11位有效的手机号码',
          bankErr:false,
          bankErrTip:'请选择所属分支'
        },
        headers:{
          client:'1',
          userId:INFO.userId,
          token:INFO.token
        },
        info:INFO
      };
    },
    methods:{
      start () {
        this.pos = 'a';
      },
      end ($event) {
        this.pos = 'b';
        this.nameReplace($event);
      },
      hideNameTip () {
        this.tip.name = false;
      },
      hidePhoneTip () {
        this.tip.phone = false;
      },
      removeNameTip () {
        this.tip.name = true;
        this.tip.nameErr = false;
      },
      removePhoneTip () {
        this.tip.phone = true;
        this.tip.phoneErr = false;
      },
      checkName () {
        let len = this.$utils.getLen(this.user.userName);
        if(len==0 || len>20){
          this.tip.nameErr = true;
        }
        return this.tip.nameErr;
      },
      checkPhone () {
        if(!this.user.loginName){
          this.tip.phoneErrTip = '请输入11位有效的手机号码';
          this.tip.phoneErr = true;
          return this.tip.phoneErr;
        }
        this.tip.phoneErr = !this.$utils.vili.loginName(this.user.loginName);
        this.tip.phoneErrTip = '请输入11位有效手机号码';
        return this.tip.phoneErr;
      },
      checkBank () {
        if(!this.user.bankId){
          this.tip.bankErr=true;
        }
        return this.tip.bankErr;
      },
      nameReplace ($event) {
        if(this.pos === 'a'){
          return;
        }
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[^\u4E00-\u9FA5]/g,'');
        this.user.userName = dom.value;
      },
      phoneReplace ($event) {
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[^\d]/g,'');
        this.user.loginName = dom.value;
      },
      getBankTree () {
        let data= {
          "service": "organizeService",
          "method": "getBankTree",
          "data": {
          }
        };
        this.$api.post('',data,this.getBankTreeSuc,this.getBankTreeErr,this.headers);
      },
      renderTreeData (data) {
        let res={};
        let me=this;
        res.id = data.bankId;
        res.label = data.bankName;
        res.level = data.bankLevel;
        res.children=[];
        if (data.branchList && data.branchList.length>0){
          data.branchList.map((item,k)=>{
            res.children.push(me.renderTreeData(item));
          });
        }
        return res;
      },
      getBankTreeSuc (data) {
        let bank = [];
        bank.push(this.renderTreeData (data));
        this.treeData=bank;
      },
      getBankTreeErr (res) {
        if( this.$utils.goLogin(res.returnCode)){
          this.goLogin(res.returnCode);
          return;
        }
        this.$message({
          message: '获取银行机构失败,请刷新重试',
          type: 'error',
          center: true,
          duration: 2000
        });
      },
      showSelTree () {
        /*if(this.info.bankLevel == '3'){
          return;
        }*/
        this.showTree = !this.showTree;
        this.tip.bankErr = false;
      },
      closeTree () {
        this.showTree = false;
      },
      selBank (data,node){
        if(data.level == 1){
          this.$message({
            message: '不可添加总行人员',
            type: 'error',
            center: true,
            duration: 2000
          });
          return;
        }
        this.user.bankId = data.id;
        this.user.bankName = data.label;
        this.closeTree();
      },
      submit () {
        let tip = this.tip;
        let err = this.checkName() + this.checkPhone() + this.checkBank() + tip.nameErr + tip.phoneErr + tip.bankErr;
        if(err){
          return;
        }
        let user = this.user;
        let data = {
          "service": "officerService",
          "method": "editOfficer",
          "data": {
            "userId": user.userId,
            "userName": user.userName,
            "loginName": user.loginName,
            "status":user.status,
            "bankId":user.bankId,
            "duty": user.duty,
            "operateType":user.operateType,
            "roleId":user.roleId
          }
        };
        this.reg = true;
        this.$api.post('',data,this.saveSuc,this.saveErr,this.headers);
      },
      saveSuc (data) {
        this.reg = false;
        let me = this;
        let str = '';
        str = this.user.operateType == '1'? '账号添加成功,默认密码为a123456,请登录后及时修改':'保存成功';
        if( this.user.operateType == '1'){
           this.$alert(str, {
            confirmButtonText: '确定',
            center:true,
            callback: action => {
              setTimeout(()=>{
                me.$router.push("/user");
              },500)
            }
          });
        }else{
          this.$message({
            message: str,
            type: 'success',
            center: true,
            duration: 2000
          });
          setTimeout(()=>{
            me.$router.push("/user");
          },500)
        }
      },
      saveErr (res) {
        if( this.$utils.goLogin(res.returnCode)){
          this.goLogin(res.returnCode);
          return;
        }
        this.reg = false;
        let str='';
        str=res.returnMessage;
        this.$message({
          message: str,
          type: 'error',
          center: true,
          duration: 2000
        });
      },
      //获取用户信息
      getUserInfo () {
	    	  let data = {
	          "service": "officerService",
	          "method": "getUserInfo",
	          "data": {
	            "userId": this.user.userId
	          }
	       };
          this.$api.post('',data,this.getUserInfoSuc,this.getUserInfoErr,this.headers);
	    },
	    getUserInfoSuc (data) {
	    	  console.log(data);
	    	  this.user.userId = data.userId;
	    	  this.user.userName = data.userName;
	    	  this.user.loginName = data.loginName;
	    	  this.user.duty = data.duty;
	    	  this.user.status = data.status;
	    	  this.user.roleId = data.roleId;
	    	  
	    	  let me = this;
	    	  let timer = setInterval(()=>{
          let userName = document.getElementById('userName');
          let userPhone = document.getElementById('userPhone');
          if(userName){
            userName.value = me.user.userName;
            userPhone.value = me.user.loginName;
            clearInterval(timer);
          }
        },1);
	    },
	    getUserInfoErr (err) {
	    	  console.log(err);
	    },
	    //查询角色信息
	    getRoleInfo () {
	      let data = {
	        "service": "configService",
	        "method": "getRoleListByClient",
	        "data": {
	        	  "role": {
	          	"client": "B"
	        	   }
	        }
          };
          this.$api.post('',data,this.getRoleInfoSuc,this.getRoleInfoErr,this.headers);
	    },
	    getRoleInfoSuc (data) {
	    	  this.roleList = data;
	    	  console.log(this.roleList);
	    },
	    getRoleInfoErr (err) {
	    	  console.log(err);
	    },
      cancel () {
        this.$router.push({name:'user',params:{back:'back'}});
      }
    },
    watch:{
    		'user.roleId':{
    			handler(newValue,oldValue) {
	          console.log(newValue);
	        }
    		}
    },
    created () {
      let me=this;
      let params = this.$route.query;
      if(!params || !params.userId){
        this.user.operateType='1';
      }else{
        this.user.operateType='2';
        this.user.userId=params.userId;
        this.user.userName=params.userName;
        this.user.loginName=params.loginName;
        this.user.status=parseInt(params.status);
        this.user.bankId=params.bankId;
        this.user.bankName=params.bankName;
        this.user.duty=parseInt(params.duty);
        let me = this;
        let timer = setInterval(()=>{
          let userName = document.getElementById('userName');
          let userPhone = document.getElementById('userPhone');
          if(userName){
            userName.value = me.user.userName;
            userPhone.value = me.user.loginName;
            clearInterval(timer);
          }
        },1);
        this.$nextTick(function(){
          me.$refs.tree.setCurrentKey(params.bankId);
        });
        this.getBankTree();
        this.getUserInfo();
        this.getRoleInfo();
      }
    }
  };
</script>

<style lang='less'>
    @la:#777777;
    @gy: #363f45;
    @height:400px;
    @width:400px;
    /*角色部分的css*/
    .el-radio-button, .el-radio-button__inner {
    	  margin-right: 5px;
    	  border-radius: 5px !important;
    }
    .el-radio-button__inner {
    		border: 1px solid #dcdfe6 !important;
    		height: 40px !important;
    		line-height: 40px !important;
    		padding: 0px 10px !important;
    }
    .el-radio-button__orig-radio {
    	  width: 10px !important;
    }
    .el-radio-button .el-radio-button__inner {
    		box-shadow: none !important;
    }
    .detailContainer .form .form-group .contentRight span {
    		margin-left: 0 !important;
    }
    .is-active {
    	  background-color: white;
    	  .el-radio-button__inner {
    	  	 color: #FFF !important;
    	  }
    }
    
    
    
    
    
    .el-tree-node{
      color:#363f45 !important;
    }
    .downC{
      position:relative;
      .down{
        color:#c0c4cc;
        position:absolute;
        cursor:pointer;
        top:-5px;
        left:210px;
      }
    }
    .el-input__suffix{
      height:40px !important;
    }
    .pointer{
      cursor:pointer;
    }
    .el-switch__core{height:20px !important}
    .el-switch__label{height:20px !important}
    .custom-tree-node{
      width:100%;
      height:24px;
      line-height:24px;
    }
    .red{
        color:red !important;
    }
    .detailContainer{
      min-width:1048px;
      .dh{
        padding-left:24px;
        width:100%;
        height: 47px;
        background-color: rgba(240, 241, 248, 1);
        .cancel{
          cursor:pointer;
        }
        span{
          height:47px;
          line-height:47px;
          font-size:14px;
          color:@gy;
        }
      }
      .title{
        height:55px;
        line-heihgt:55px;
        padding-left:24px;
        div{
          margin-top:20px;
          width: 3px;
          height: 13px;
          background-color: rgba(49, 133, 255, 1);
          float:left;
        }
        span{
          display:inline-block;
          margin-top:20px;
          margin-left:7px;
          font-size:13px;
          color: @gy;
        }
      }
      .form{
        box-sizing:border-box;
        background-color:#fff;
        min-width:1000px;
        width:calc(100% - 48px);
        min-height:587px;
        margin-left:24px;
        box-shadow: inset 0px -1px 0px 0px rgba(230, 231, 237, 1);
        padding:60px 0 0 127px;
        position:relative;
        .tree{
          min-width:240px;
          box-sizing:border-box;
          border:1px solid #ddd;
          box-shadow: 0px 3px 10px 0px rgba(26, 24, 25, 0.3);
          position:absolute;
          z-index:1;
          top:200px;
          left:237px;
          max-height:500px;
          overflow-y:auto;
        }
        .form-group{
          width:100%;
          min-width:1000px;
          height:50px;
          div{
            height:50px;
            span{
              height:50px;
            }
          }
          .label{
            width: 110px;
            float:left;
            span{
              font-size:14px;
              color:@la;
              line-height:40px;
            }
          }
          .contentRight{
            float:left;
            span{
              color:@la;
              margin-left:10px;
              &.text{
                display:inline-block;
                line-height:40px;
              }
            }
            &.treeContainer{
              position:relative;
              .tree{
                background:#fff;
                width:240px;
                position:absolute;
                z-index:1;
                .el-tree{
                  margin:10px;
                }
              }
            }
            input{
              box-sizing:border-box;
              height:40px;
              line-height:40px;
              width:240px;
              padding:0 16px;
              border: solid 1px rgba(234, 234, 234, 1);
              &.pointer{
                color:#606266;
              }
              &:disabled{
                background:#fff;
              }
            }
          }
        }
        .button{
          margin-top:20px;
          button{
            width: 121px;
            height: 37px;
            line-height:37px;
            border:none;
            outline:none;
            cursor:pointer;
            box-sizing:border-box;
          }
          .sure{
            background-color: rgba(49, 133, 255, 1);
            border: solid 1px rgba(49, 133, 255, 1);
            color:#fff;
          }
          .can{
            background-color: #fff;
            border: solid 1px rgba(234, 234, 234, 1);
            color:@la;
            margin-left:14px;
          }
        }
      }
    }
</style>
