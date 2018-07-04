<template>
    <div class='detailContainer1'>
        <div class="dh">
          <span @click='cancel' class='cancel'>分支管理</span><span>&gt;分支详情</span>
        </div>
        <div class="title">
          <div></div>
          <span>分支详情</span>
        </div>
        <div class='form'>
            <div class='form-group'>
                <div class='label'>
                    <span>银行级别:</span>
                </div>
                <div class='contentRight'>
                    <span>{{bankInfo.bankLevelContent}}</span>
                </div>
            </div>
            <div class='form-group'>
                <div class='label'>
                    <span>上级分支:</span>
                </div>
                <div class='contentRight'>
                    <span>{{bankInfo.parent}}</span>
                </div>
            </div>
            <div class='form-group'>
                <div class='label'>
                    <span>分支名称:</span>
                </div>
                <div class='contentRight'>
                    <input id='bankName' placeholder="不超过50个字符" type="text" @focus='showNameTip' @keyup='nameReplace($event)' maxlength="25" @compositionstart="start" @compositionend="end">
                    <span v-if='tip.name'>{{tip.nameTip}}</span>
                    <span v-if='tip.nameErr' class='red'>{{tip.nameErrTip}}</span>
                </div>
            </div>
            <div class='form-group'>
                <div class='label'>
                    <span>联系电话:</span>
                </div>
                <div class='contentRight'>
                    <input id='areaCode' placeholder="区号" type="text" class="area" @focus='showNumTip' @keyup='areaReplace($event)' maxlength="4">--<input placeholder="请输入8位电话号码" type="text" class='phone' @keyup='phoneReplace($event)' @focus='showNumTip' maxlength="8" id='eight'>
                    <span v-if='tip.areaErr' class='red'>{{tip.areaErrTip}}</span>
                    <span v-if='tip.phoneErr' class='red'>{{tip.phoneErrTip}}</span>
                </div>
            </div>
            <div class='form-group add'>
                <div class='label'>
                    <span>联系地址:</span>
                </div>
                <div class='contentRight'>
                    <textarea name="" id="" cols="30" rows="5" v-model='bankInfo.address' placeholder="不超过100个字符" @keyup='addReplace($event)' @focus='showAddressTip'  maxlength="100"></textarea>
                    <span v-if='tip.addressErr' class='red text'>{{tip.addressErrTip}}</span>
                </div>
            </div>
            <div class="button">
                <button @click='submit' class="sure" :disabled='reg'>保  存</button>
                <button @click='cancel' class='can'>取  消</button>
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
            bankInfo:{
                bankId:'',
                bankName:'',
                bankLevel:'',
                bankLevelContent:'',
                parentId:'',
                parent:'',
                areaCode:'',
                phoneNumber:'',
                address:'',
                operateType:''
            },
            headers:{
              client:'1',
              userId:INFO.userId,
              token:INFO.token
            },
            tip:{
              nameTip:'请填写分支名，无需全名，如紫金农商银行南京分行填写南京分行',
              nameErrTip:'请输入不超过50个字符分支名',
              name:false,
              nameErr:false,
              areaTip:'区号不能为空',
              areaErrTip:'区号不能为空',
              area:false,
              areaErr:false,
              phoneTip:'请输入8位电话号码',
              phoneErrTip:'请输入8位电话号码',
              phone:false,
              phoneErr:false,
              addressTip:'联系地址不能为空',
              addressErrTip:'联系地址不能为空',
              address:false,
              addressErr:false
            }
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
        getBankInfoSuc (data) {
          this.bankInfo.bankName=data.bankName;
          this.bankInfo.bankLevel=data.bankLevel;
          this.bankInfo.parentId=data.parentId;
          this.bankInfo.parent=data.parentName;
          this.bankInfo.areaCode=data.areaCode;
          this.bankInfo.phoneNumber=data.phoneNumber;
          this.bankInfo.address=data.address;
          let me = this;
          let timer = setInterval(()=>{
            let bankName = document.getElementById('bankName');
            let areaCode = document.getElementById('areaCode');
            let eight = document.getElementById('eight');
              if(bankName){
                bankName.value = me.bankInfo.bankName;
                areaCode.value = me.bankInfo.areaCode;
                eight.value = me.bankInfo.phoneNumber;
                clearInterval(timer);
              }
          },1);
        },
        getBankInfoErr (res) {
          if( this.$utils.goLogin(res.returnCode)){
            this.goLogin(res.returnCode);
            return;
          }
        },
        areaReplace ($event) {
          let dom = $event.target;
          this.replaceAndSetPos(dom,/[^\d]/g,'');
          this.bankInfo.areaCode = dom.value;
        },
        phoneReplace ($event) {
          let dom = $event.target;
          this.replaceAndSetPos(dom,/[^\d]/g,'');
          this.bankInfo.phoneNumber = dom.value;
        },
        nameReplace ($event) {
          if(this.pos === 'a'){
            return;
          }
          let dom = $event.target;
          this.replaceAndSetPos(dom,/[^\u4E00-\u9FA5]/g,'');
          this.bankInfo.bankName = dom.value;
        },
        addReplace ($event) {
          let me=this;
          let len = me.$utils.getLen(me.bankInfo.address);
          if(len<=100){
            return;
          }
          let l=me.bankInfo.address.length;
          me.bankInfo.address=me.bankInfo.address.substring(0,l-1);
          me.addReplace();
        },
        viliName () {
          this.tip.name=false;
          if(!this.bankInfo.bankName){
            this.tip.nameErr = true;
          }
          return this.tip.nameErr;
        },
        viliArea () {
          let len = this.bankInfo.areaCode.length;
          if( len==0 || len >4 ){
            this.tip.areaErr=true;
          }
          return this.tip.areaErr;
        },
        viliPhone () {
          if(this.tip.areaErr){
            return false;
          }
          let len = this.bankInfo.phoneNumber.length;
          if(len!=8){
            this.tip.phoneErr=true;
          }
          return this.tip.phoneErr;
        },
        viliAdd () {
          if(!this.bankInfo.address || /^\s+$/.test(this.bankInfo.address)){
            this.tip.addressErr=true;
          }
          return this.tip.addressErr;
        },
        showNameTip () {
          this.tip.nameErr=false;
          this.tip.name=true;
        },
        showNumTip () {
          this.tip.area = false;
          this.tip.areaErr = false;
          this.tip.phone = false;
          this.tip.phoneErr = false;
        },
        showAddressTip (){
          this.tip.address = false;
          this.tip.addressErr = false;
        },
        submit () {
          let err=this.viliName()+this.viliArea()+this.viliPhone()+this.viliAdd();
          if(err){
            return;
          }
          let info=this.bankInfo;
          let data = {
            "service": "organizeService",
            "method": "editBank",
            "data": {
              "bankId": info.bankId ,
              "bankName": info.bankName,
              "bankLevel": info.bankLevel,
              "parentId": info.parentId,
              "areaCode": info.areaCode,
              "phoneNumber": info.phoneNumber,
              "address": info.address,
              "operateType": info.operateType
            }
          };
          this.reg = true;
          this.$api.post('',data,this.saveOrgSuc,this.saveOrgErr,this.headers);
        },
        saveOrgSuc (data) {
          this.reg = false;
          this.$message({
            message: '保存成功',
            type: 'success',
            center: true,
            duration: 2000
          });
          let me = this;
          setTimeout(()=>{
            me.reg = false;
            me.$router.push("/branch");
          },2000)
        },
        saveOrgErr (res) {
          if( this.$utils.goLogin(res.returnCode)){
            this.goLogin();
            return;
          }
          this.reg=false;
          let str='';
          str=res.returnMessage;
          this.$message({
            message: str,
            type: 'error',
            center: true,
            duration: 2000
          });
        },
        cancel () {
          this.$router.push('/branch');
        }
      },
      created () {
        let params = this.$route.query;
        this.bankInfo.bankLevelContent=params.bankLevelContent;
        if(params.bankId){
          this.bankInfo.operateType = '2';
          this.bankInfo.bankId=params.bankId;
          let data={
            "service": "organizeService",
            "method": "getBankInfo",
            "data": {
                "bankId": this.bankInfo.bankId
            }
          }
          this.$api.post('',data,this.getBankInfoSuc,this.getBankErr,this.headers)
        }else{
          this.bankInfo.operateType = '1';
          this.bankInfo.parentId=params.parentId;
          this.bankInfo.parent=params.parent;
          this.bankInfo.bankLevel=params.bankLevel;
        }
      }
    };
</script>

<style lang='less'>
    @la:#777777;
    @gy: #363f45;
    .red{
      color:red !important;
    }
    .detailContainer1{
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
        min-width: 1000px;
        width:calc(100% - 48px);
        min-height:587px;
        margin-left:24px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: inset 0px -1px 0px 0px rgba(230, 231, 237, 1);
        padding:60px 0 0 127px;
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
              line-height:40px;
              display:inline-block;
              &.text{
                display:inline-block;
                line-height:40px;
              }
            }
            input{
              box-sizing:border-box;
              height:40px;
              line-height:40px;
              width:240px;
              padding:0 16px;
              border: solid 1px rgba(234, 234, 234, 1);
            }
          }
          &.add{
            min-height:150px;
            div{
              min-height:100px;
            }
            .contentRight{
              textarea{
                font-size:14px;
                padding:13px 16px;
                margin-top:10px;
                box-sizing:border-box;
                width:240px;
                border: solid 1px rgba(234, 234, 234, 1);
              }
              span{
                vertical-align:text-bottom;
              }
            }
          }
        }
        .button{
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

