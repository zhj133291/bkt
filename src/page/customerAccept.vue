<template>
  <div>
    <div class="acceptMain">
      <div class="dh">
        <span class='cancel'>客户管理</span>
      </div>
      <div class="title">
        <div></div>
        <span>客户管理</span>
      </div>
      <div class="search">
        <div class="search-content">
          <div><label>企业名称/税号</label><input type="text" v-model="accept.enterprise" placeholder="请输入企业名/税号"></div>
          <div><label>业务序列号</label><input type="text" v-model="accept.applySerial" placeholder="请输入业务序列号"></div>
          <div>
            <label>产品名称</label>
            <el-select v-model="accept.product" @change="changeProduct" placeholder="请选择产品">
              <el-option v-for="item in productList" :key="item.value" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </div>
        <div class="search-content">
          <div v-if='userDuty==1'><label>最后处理人</label><input type="text" v-model="accept.userName" placeholder="请输入最后处理人"></div>
          <div>
            <label>申请状态</label>
            <el-select v-model="accept.status" @change="changeStatus" placeholder="请选择申请状态">
              <el-option v-for="item in statusList" :key="item.value" :label="item.statusDesc" :value="item.applyStatus"></el-option>
            </el-select>
          </div>
          <div>
            <label class='duty'>职位</label>
            <el-select v-model="accept.duty" placeholder="请选择职位">
              <el-option v-for="item in duty" :key="item.value" :label="item.duty_label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="search-content">
          <div>
            <label>申请时间</label>
            <el-date-picker v-model="accept.startDate" :picker-options="pickerOptions0" type="date" placeholder="请选择开始时间" format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker> —
            <el-date-picker v-model="accept.endDate" :picker-options="pickerOptions1" type="date" placeholder="请选择结束时间" format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker>
          </div>
          <div style='float:right'>
            <el-button type="primary" @click="getAcceptList('search')" style="margin-left: 50px; background: #3185ff; border-color: #3185ff;">查询</el-button>
            <el-button type="primary" @click="clear()" style="background: #3185ff; border-color: #3185ff; margin-left: 10px;">清空</el-button>
          </div>
        </div>
      </div>
      <div class="acpTab">
        <div class="acpTitle">
          <div class="detail">申请详情</div>
          <div class="status">当前状态</div>
          <div class="operate">操作</div>
        </div>
        <div class="acpContent" v-for="(item, key) in applyData" :key="key">
          <div class="apply">
            <i></i>
            <div class="serial">业务序列号：{{item.serialNum}}</div>
            <div class="appTime">申请时间：{{item.applyTime}}</div>
            <div class="pushTime">推送时间：{{item.sendToBankTime}}</div>
          </div>
          <div class="company">
            <img :src="item.logoPath" alt="">
            <div class="pod">{{item.productName}}</div>
            <div class="comp">{{item.enterpriseName}}</div>
            <div class="num">{{item.nsrsbh}}</div>
          </div>
          <div class="loan">
            <p class="quota">申请额度：{{item.loanLimit}}万元</p>
            <p class="term">申请期限：{{item.loanTerm}}个月</p>
            <p class="now">{{item.statusName}}</p>
            <p class="edit" @click="() => edit(item)">{{item.operating}}</p>
          </div>
        </div>
        <div class="el-table__empty-block" v-if='!total'><span class="el-table__empty-text">暂无数据</span></div>
        <div class="page">
          <el-pagination background layout="prev, pager, next, total, jumper" :page-size="pageSize" :current-page.sync="currentPage" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="total"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      let currentPage = 1, total = 0;
      let params = this.$route.params;
      if (params && params.back) {
        currentPage = parseInt(sessionStorage.getItem("pageIndex"));
        total = parseInt(sessionStorage.getItem("total"));
      }
      let INFO = JSON.parse(sessionStorage.getItem('INFO'));
      return {
        userDuty:INFO.duty,
        pageIndex: 1,
        pageSize: 10,
        currentPage: currentPage,
        total: total,
        applyData: [],
        duty:[
          {
            value: '',
            duty_label: '请选择职位'
          },{
            value: '1',
            duty_label: '主管'
          }, {
            value: '2',
            duty_label: '客户经理'
          }
        ],
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.accept.endDate != "") {
              return time.getTime() > Date.now() || time.getTime() > this.accept.endDate;
            } else {
              return time.getTime() > Date.now();
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() < this.accept.startDate || time.getTime() > Date.now();
          }
        },
        productList: [],
        statusList: [],
        accept: {
          enterprise: '',
          applySerial: '',
          product: '',
          userName: '',
          status: '',
          duty:'',
          startDate: '',
          endDate: ''
        },
        saveInfo:{
          enterprise: '',
          applySerial: '',
          product: '',
          userName: '',
          status: '',
          duty:'',
          startDate: '',
          endDate: ''
        },
        headers:{
          client:'1',
          userId:INFO.userId,
          token:INFO.token
        }
      }
    },
    created() {
      this.getStatusList();
      this.getProductList();
      let params = this.$route.params;
        if (params && params.back) {
          this.getAcceptList('back');
          return;
        } else {
          this.getAcceptList('init');
        }
    },
    methods: {
      // 清空
      clear() {
        this.accept.enterprise = '';
        this.accept.applySerial = '';
        this.accept.product = '';
        this.accept.userName = '';
        this.accept.status = '';
        this.accept.duty = '';
        this.accept.startDate = '';
        this.accept.endDate = '';
      },
      // 受理列表
      getAcceptList(obj) {
        console.log(obj);
        if (obj == 'init') {
          let data = {
            "service": "applyService",
            "method": "getApplyList",
            "data": {
              enterprise: this.accept.enterprise,
              applySerial: this.accept.applySerial,
              productId: this.accept.product,
              userName: this.accept.userName,
              applyStatus: this.accept.status,
              duty: this.accept.duty,
              startDate: this.accept.startDate,
              endDate: this.accept.endDate,
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
            }
          };
          this.$api.post('',data,this.getAcceptSuc,this.getAcceptErr,this.headers);
        } else if (obj == 'search') {
          if (this.accept.startDate > this.accept.endDate) {
            this.$message({
              message: '开始时间不能晚于结束时间',
              type: 'error',
              center: true,
              duration: 2000
            });
            return false;
          }
          this.saveInfo.enterprise = this.accept.enterprise;
          this.saveInfo.applySerial = this.accept.applySerial;
          this.saveInfo.product = this.accept.product;
          this.saveInfo.userName = this.accept.userName;
          this.saveInfo.status = this.accept.status;
          this.saveInfo.duty = this.accept.duty;
          this.saveInfo.startDate = this.accept.startDate;
          this.saveInfo.endDate = this.accept.endDate;
          let data = {
            "service": "applyService",
            "method": "getApplyList",
            "data": {
              enterprise: this.accept.enterprise,
              applySerial: this.accept.applySerial,
              productId: this.accept.product,
              userName: this.accept.userName,
              applyStatus: this.accept.status,
              duty: this.accept.duty,
              startDate: this.accept.startDate,
              endDate: this.accept.endDate,
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
            }
          };
          this.$api.post('',data,this.getAcceptSuc,this.getAcceptErr,this.headers);
        } else if (obj == 'back') {
          this.saveInfo.enterprise = sessionStorage.getItem("enterprise");
          this.saveInfo.applySerial = sessionStorage.getItem("applySerial");
          this.saveInfo.product = sessionStorage.getItem("product");
          this.saveInfo.userName = sessionStorage.getItem("userName");
          this.saveInfo.status = sessionStorage.getItem("status");
          this.saveInfo.duty = sessionStorage.getItem("duty") !== '' ? sessionStorage.getItem("duty") : '';
          this.saveInfo.startDate = sessionStorage.getItem("startDate");
          this.saveInfo.endDate = sessionStorage.getItem("endDate");

          this.accept.enterprise = this.saveInfo.enterprise;
          this.accept.applySerial = this.saveInfo.applySerial;
          this.accept.product = this.saveInfo.product;
          this.accept.userName = this.saveInfo.userName;
          this.accept.status = this.saveInfo.status;
          this.accept.duty = this.saveInfo.duty;
          this.accept.startDate = this.saveInfo.startDate;
          this.accept.endDate = this.saveInfo.endDate;

          this.handleCurrentChange(this.currentPage);
        }
      },
      changeProduct(val) {
        let obj = {};
        obj = this.productList.find((item)=>{
          return item.id === val;
        });
        console.log(obj);
      },
      changeStatus(val) {
        let obj = {};
        obj = this.statusList.find((item)=>{
          return item.applyStatus === val;
        });

        console.log(obj);
      },

      //分页
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        let current_data = {
          "service": "applyService",
          "method": "getApplyList",
          "data": {
            enterprise: this.accept.enterprise,
            applySerial: this.accept.applySerial,
            productId: this.accept.product,
            userName: this.accept.userName,
            applyStatus: this.accept.status,
            duty: this.accept.duty,
            startDate: this.accept.startDate,
            endDate: this.accept.endDate,
            pageIndex: this.currentPage,
            pageSize: this.pageSize
          }
        };
        this.$api.post('',current_data,this.getAcceptSuc,this.getAcceptErr,this.headers);
      },

      save() {
        sessionStorage.setItem('enterprise', this.saveInfo.enterprise);
        sessionStorage.setItem('applySerial', this.saveInfo.applySerial);
        sessionStorage.setItem('product', this.saveInfo.product);
        sessionStorage.setItem('userName', this.saveInfo.userName);
        sessionStorage.setItem('status', this.saveInfo.status);
        sessionStorage.setItem('duty', this.saveInfo.duty);
        sessionStorage.setItem('startDate', this.saveInfo.startDate);
        sessionStorage.setItem('endDate', this.saveInfo.endDate);
        sessionStorage.setItem('pageIndex', this.currentPage);
        sessionStorage.setItem('total', this.total);
      },

      // 产品名称
      getProductList() {
        let data = {
          "service": "applyService",
          "method": "getProductsByBank",
          "data": {}
        };
        this.$api.post('',data,this.getProductSuc,this.getProductErr,this.headers);
      },
      // 状态
      getStatusList() {
        let data = {
          "service": "applyService",
          "method": "getApplyStatus",
          "data": {
            "client": "B"
          }
        };
        this.$api.post('',data,this.getStatusSuc,this.getStatusErr,this.headers);
      },
      // 编辑
      edit(item) {
        this.save();
        let params = {};
        params.affiliatedEnterpriseLoan = item.affiliatedEnterpriseLoan;
        params.applyTime = item.applyTime;
        params.currentOperationPersonId = item.currentOperationPersonId;
        params.enterpriseName = item.enterpriseName;
        params.externalGuarantee = item.externalGuarantee;
        params.loanLimit = item.loanLimit;
        params.loanTerm = item.loanTerm;
        params.logoPath = item.logoPath;
        params.marketingCode = item.marketingCode;
        params.nsrsbh = item.nsrsbh;
        params.otherBankLoan = item.otherBankLoan;
        params.ourBankLoan = item.ourBankLoan;
        params.personalManagementLoan = item.personalManagementLoan;
        params.processInstanceId = item.processInstanceId;
        params.productId = item.productId;
        params.productName = item.productName;
        params.proposerId = item.proposerId;
        params.proposerName = item.proposerName;
        params.proposerTelphone = item.proposerTelphone;
        params.proposerType = item.proposerType;
        params.sendToBankTime = item.sendToBankTime;
        params.serialNum = item.serialNum;
        params.statusCode = item.statusCode;
        params.statusName = item.statusName;
        params.sxTime = item.sxTime;
        params.userId = item.userId;
        this.$router.push({name:'customerDetail',query:params});
      },
      getAcceptSuc(data) {
        console.log(data);
        this.total = parseInt(data.totalNum);
        data.applyList.map((item,k)=>{
          switch(item.statusCode){
          case 1:
            item.operating = '审批'
            break;
          case 2:
            item.operating = '审批'
            break;
          case 3:
            item.operating = '审批'
            break;
          case 4:
            item.operating = '审批'
            break;
          case 5:
            item.operating = '审批'
            break;
          case 6:
            item.operating = '审批'
            break;
          case 7:
            item.operating = '查看'
            break;
          case 8:
            item.operating = '审批'
            break;
          case 9:
            item.operating = '查看'
            break;
          case 10:
            item.operating = '查看'
            break;
          }
          item.applyTime = this.$utils.timeFormat(item.applyTime);
          item.sxTime = this.$utils.timeFormat(item.sxTime);
          item.sendToBankTime = this.$utils.timeFormat(item.sendToBankTime);
          item.logoPath = this.$utils.imgURL.img + item.logoPath;
        });

        this.applyData = data.applyList;
      },
      getAcceptErr(data) {
        console.log(data);
      },
      getProductSuc(data) {
        this.productList = data;
      },
      getProductErr(data) {
        console.log(data);
      },
      getStatusSuc(data) {
        this.statusList = data;
      },
      getStatusErr(data){
        console.log(data);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .duty{
    margin-left:10px;
  }
  .acceptMain{
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
    .search{
      margin: 0 24px;
      padding: 15px 28px;
      background: #ffffff;
      .search-content{
        padding: 10px 0;
        & > div {
          display: inline-block;
          & > label{
            font-size: 14px;
            color: #363f45;
            margin-right: 10px;
          }
          & > input{
            width: 180px;
            height: 28px;
            padding 0 15px;
            font-size: 14px;
            color: #363f45;
            margin-right: 10px;
            border: 1px solid #eaeaea;
          }
        }
      }
    }
    .acpTab{
      margin: 15px 24px;
      background: #ffffff;
      .el-table__empty-block{width:100%;}
      .acpTitle{
        font-size: 14px;
        color: #363f45;
        border-bottom 2px solid #e8e8e8;
        padding 20px 28px;
        div{
          font-weight:600;
        }
        .detail{
          display: inline-block;
          width: 70%;
        }
        .status{
          display: inline-block;
          width: 20%;
        }
        .operate{
          display: inline-block;
        }
      }
      .acpContent{
        padding: 12px 0 20px 28px;
        border-bottom 1px solid #eaeaea;
        &:last-child{
          border-bottom none;
        }
        .apply{
          font-size: 14px;
          line-height: 0;
          letter-spacing: 0;
          color: #363f45;
          padding-bottom: 12px;
          border-bottom 1px solid #eaeaea;
          & > i{
            width: 2px
            height: 12px;
            background: #3185ff;
            display: inline-block;
          }
          .serial{
            display: inline-block;
            padding-left: 10px;
          }
          .appTime{
            display: inline-block;
            padding-left: 60px;
          }
          .pushTime{
            display: inline-block;
            padding-left: 60px;
          }
        }
        .company{
          font-size: 14px;
          color: #363f45;
          padding-top: 20px;
          & > img{
            width: 20px;
            height: 20px;
            vertical-align: middle;
          }
          .pod{
            display: inline-block;
            padding-left: 4px;
          }
          .comp{
            display: inline-block;
            padding-left: 30px;
          }
          .num{
            display: inline-block;
            padding-left: 45px;
          }
        }
        .loan{
          font-size: 14px;
          letter-spacing: 0;
          color: #363f45;
          padding: 38px 0 20px 0;
          .quota{
            display: inline-block;
            width: 34%;
          }
          .term{
            display: inline-block;
            width: 34%;
          }
          .now{
            display: inline-block;
            width: 19%;
          }
          .edit{
            display: inline-block;
            &:hover{
              color: #3185ff;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
      .page{
        text-align: center;
        padding: 15px;
      }
    }

  }
</style>
