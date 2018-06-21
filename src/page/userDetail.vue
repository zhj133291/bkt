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
            <div class="tree"  v-show='showTree'>
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
                    <input placeholder="不超过10个汉字" :disabled='user.operateType=="2"' type="text" @focus='removeNameTip' @keyup='nameReplace' v-model='user.userName' @blur='hideNameTip'>
                    <span v-if='tip.name'>{{tip.nameTip}}</span>
                    <span v-if='tip.nameErr' class='red'>{{tip.nameErrTip}}</span>
                </div>
            </div>
            <div class='form-group'>
                <div class='label'>
                    <span>手机号</span>
                </div>
                <div class='contentRight'>
                    <input placeholder="请输入有效的手机号码" type="text" @focus='removePhoneTip' @keyup='phoneReplace' v-model='user.loginName' @blur='hidePhoneTip'>
                    <span v-if='tip.phone'>{{tip.phoneTip}}</span>
                    <span v-if='tip.phoneErr' class='red'>{{tip.phoneErrTip}}</span>
                </div>
            </div>
            <div class='form-group'>
                <div class='label'>
                    <span>所属分支</span>
                </div>
                <div class='contentRight'>
                  <input type="hidden" v-model='user.bankId'>
                  <input type="text" class='pointer' readonly="readonly" v-model='user.bankName' @click='showSelTree' placeholder="请选择所属分支">
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
            <div class="button">
              <button @click='submit' :disabled='reg' class='sure'>确 认</button>
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
        reg:false,
        showTree:false,
        treeData:[],
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
          duty:2,
          operateType:'1'
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
      nameReplace () {
        this.user.userName=this.user.userName.replace(/[^\u4E00-\u9FA5]/g,'');
        let me=this;
        let len = me.$utils.getLen(me.user.userName);
        if(len<=20){
          return;
        }
        let l=me.user.userName.length;
        me.user.userName=me.user.userName.substring(0,l-1);
        me.nameReplace();
      },
      phoneReplace () {
        this.user.loginName=this.user.loginName.replace(/[^\d]/g,'');
        let len = this.user.loginName.length;
        if(len>11){
          this.user.loginName=this.user.loginName.substring(0,11);
        }
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
        if(this.info.bankLevel == '3'){
          return;
        }
        this.showTree = !this.showTree;
        this.tip.bankErr = false;
      },
      closeTree () {
        this.showTree = false;
      },
      selBank (data,node){
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
            "operateType":user.operateType
          }
        };
        this.reg = true;
        this.$api.post('',data,this.saveSuc,this.saveErr,this.headers);
      },
      saveSuc (data) {
        this.reg = false;
        let me = this;
        let str = '';
        str = this.user.operateType == '1'? '账号添加成功,默认密码为a123456,请登陆后及时修改':'保存成功';
        this.$alert(str, {
          confirmButtonText: '确定',
          center:true,
          callback: action => {
            setTimeout(()=>{
              me.$router.push("/user");
            },500)
          }
        });
      },
      saveErr (res) {
        if( this.$utils.goLogin(res.returnCode)){
          this.goLogin(res.returnCode);
          return;
        }
        this.reg = false;
        let str='';
        if(res.returnCode=="30000001"){
          str='新增异常';
        }else if(res.returnCode=="30000002"){
          str='修改异常';
        }else if(res.returnCode=="10000012"){
          str='请联系上级主管修改';
        }else{
          str=res.returnMessage;
        }
        this.$message({
          message: str,
          type: 'error',
          center: true,
          duration: 2000
        });
      },
      cancel () {
        this.$router.push('/user');
      }
    },
    created () {
      this.getBankTree();
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
        this.$nextTick(function(){
          me.$refs.tree.setCurrentKey(params.bankId);
        });
      }
    }
  };
</script>

<style lang='less'>
    @la:#777777;
    @gy: #363f45;
    @height:400px;
    @width:400px;
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
          width:240px;
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
              padding:12px 16px;
              border: solid 1px rgba(234, 234, 234, 1);
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
