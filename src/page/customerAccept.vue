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
          <div><label>企业名称/税号</label><input type="text"></div>
          <div><label>业务序列号</label><input type="text"></div>
          <div><label>产品名称</label><input type="text"></div>
        </div>
        <div class="search-content">
          <div><label>最后处理人</label><input type="text"></div>
          <div><label>申请状态</label><input type="text"></div>
          <div>
            <label>职位</label>
            <el-select v-model="accept.duty" placeholder="请选择">
              <el-option v-for="item in duty" :key="item.value" :label="item.duty_label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="search-content">
          <div><label>申请时间</label><input type="text">&nbsp;&nbsp;-&nbsp;&nbsp;<input type="text"></div>
          <el-button type="primary" @click="getUserList('search')" style="margin-left: 50px; background: #3185ff; border-color: #3185ff;">查询</el-button>
          <el-button type="primary" @click="addUser()" style="background: #3185ff; border-color: #3185ff; margin-left: 10px;">清空</el-button>
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
            <div class="num">{{item.serialNum}}</div>
          </div>
          <div class="loan">
            <p class="quota">申请额度：{{item.loanLimit}}万元</p>
            <p class="term">申请期限：{{item.loanTerm}}个月</p>
            <p class="now">{{item.statusName}}</p>
            <p class="edit">编辑</p>
          </div>
        </div>
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
      let INFO = JSON.parse(sessionStorage.getItem('INFO'));
      return {
        pageIndex: 1,
        pageSize: 30,
        currentPage: 1,
        total: '',
        applyData: [],
        duty:[
          {
            value: '',
            duty_label: '请选择'
          },{
            value: '1',
            duty_label: '主管'
          }, {
            value: '2',
            duty_label: '客户经理'
          }
        ],
        accept: {
          duty: ''
        },
        headers:{
          client:'1',
          userId:INFO.userId,
          token:INFO.token
        }
      }
    },
    created() {
      // this.getBankList();

      this.getAcceptList();

    },
    methods: {
      // 受理列表
      getAcceptList() {
        let data = {
          "service": "applyService",
          "method": "getApplyList",
          "data": {

          }
        };
        this.$api.post('',data,this.getAcceptSuc,this.getAcceptErr,this.headers);
      },
      handleCurrentChange() {

      },
      handleSizeChange() {

      },
      getAcceptSuc(data) {
        console.log(data);
        this.total = parseInt(data.totalNum) != 0 ? parseInt(data.totalNum) : 1;
        data.applyList.map((item,k)=>{
          item.applyTime = item.applyTime == null ? this.$utils.timeFormat(item.applyTime) : '-';
          item.sxTime = this.$utils.timeFormat(item.sxTime);
          item.sendToBankTime = this.$utils.timeFormat(item.sendToBankTime);
          item.logoPath = this.$utils.imgURL.img + item.logoPath;
        });

        this.applyData = data.applyList;
      },
      getAcceptErr(data) {
        console.log(data);
      }
    }
  }
</script>

<style lang="stylus" scoped>
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
      .acpTitle{
        font-size: 14px;
        color: #363f45;
        border-bottom 2px solid #e8e8e8;
        padding 20px 28px;
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
