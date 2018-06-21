<template>
    <div>
      <div class="userMain">
        <div class="dh">
          <span class='cancel'>人员管理</span>
        </div>
        <div class="title">
          <div></div>
          <span>人员列表</span>
        </div>

        <!--查询-->
        <div class="search">
          <div class="name">
            <label>姓名</label>
            <input type="text" v-model="user.name" placeholder="请输入姓名">
          </div>
          <div class="branches">
            <label>所属机构</label>
            <div class="tree">
              <div class="tree-tr">
                <input type="hidden" v-model='user.bankId'>
                <input type="text" class='pointer' readonly="readonly" v-model='user.bankName' @click='showSelTree' placeholder="请选择所属银行">
                <el-tree v-show='showTree' class="el-tree" :data="treeData" node-key="id" default-expand-all ref='tree' :highlight-current='true' :expand-on-click-node="false" @current-change='selBank'>
                  <span>请选择</span>
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ data.label }}</span>
                </span>
                </el-tree>
              </div>
            </div>
          </div>
          <div class="character">
            <label>角色</label>
            <el-select v-model="user.duty" placeholder="请选择">
              <el-option v-for="item in duty" :key="item.value" :label="item.duty_label" :value="item.value"></el-option>
            </el-select>
          </div>
          <el-button type="primary" @click="getUserList('search')" style="margin-left: 15px; background: #3185ff; border-color: #3185ff;">查询</el-button>
          <el-button type="primary" @click="addUser()" style="background: #3185ff; border-color: #3185ff;">新增人员</el-button>
        </div>

        <!--列表-->
        <div class="tab">
          <el-table :data="tableData" node-key="id" style="width: 100%;">
            <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
            <el-table-column prop="loginName" label="手机号" width="180"></el-table-column>
            <el-table-column prop="bankName" label="所属分支" width="180"></el-table-column>
            <el-table-column prop="dutyName" label="角色" width="180"></el-table-column>
            <el-table-column prop="status" label="状态" width="180">
              <template slot-scope="props">
                <el-switch v-model="tableData[props.$index].status" @change='changeStatus($event, props.row)' :active-value="1" active-color="#3d78bd" :inactive-value="2" inactive-color="#d3d3d4"></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作" width="180">
              <template slot-scope="scope">
                <el-button class="editBtn" type="text" @click="edit(scope.$index, scope.row)" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination background layout="total, prev, pager, next, jumper" :page-size="pageSize" :current-page="currentPage" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="total"></el-pagination>
          </div>
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
          pageIndex: 1,
          pageSize: 30,
          currentPage: 1,
          total: 0,
          duty:[{
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
          user:{
            name: '',
            userId: '',
            bankId: '',
            bankName: '',
            duty: ''
          },
          showTree:false,
          tableData: [],
          treeData:[],
          headers:{
            client:'1',
            userId:INFO.userId,
            token:INFO.token
          }
        };
      },
      created () {
        this.getBankTree();
        this.getUserList('init');
      },
      methods: {
        //列表
        getUserList(obj) {
          console.log(obj)
          if (obj == 'init') {
            let data = {
              "service": "officerService",
              "method": "getOfficerList",
              "data": {
                userName: this.user.name,
                bankId: this.user.bankId,
                duty: this.user.duty,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
              }
            };
            this.$api.post('',data,this.getUserSuc,this.getUserErr,this.headers);
          } else if (obj == 'search') {
            sessionStorage.setItem('name', this.user.name);
            sessionStorage.setItem('bankId', this.user.bankId);
            sessionStorage.setItem('bankName', this.user.bankName);
            sessionStorage.setItem('duty', this.user.duty);
            let data = {
              "service": "officerService",
              "method": "getOfficerList",
              "data": {
                userName: this.user.name,
                bankId: this.user.bankId,
                duty: this.user.duty,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
              }
            };
            this.$api.post('',data,this.getUserSuc,this.getUserErr,this.headers);
          }

        },

        //分页
        handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize);
        },
        handleCurrentChange: function(currentPage){
          this.user.name = sessionStorage.getItem("name");
          this.user.bankId = sessionStorage.getItem("bankId");
          this.user.bankName = sessionStorage.getItem("bankName") == '' ? sessionStorage.getItem("bankName") : '请选择所属银行';
          this.user.duty = sessionStorage.getItem("duty") == '' ? sessionStorage.getItem("duty") : '请选择';
          this.currentPage = currentPage;
          let current_data = {
            "service": "officerService",
            "method": "getOfficerList",
            "data": {
              userName: this.user.name,
              bankId: this.user.bankId,
              duty: this.user.duty,
              pageIndex: this.currentPage,
              pageSize: this.pageSize
            }
          };
          this.$api.post('',current_data,this.getUserSuc,this.getUserErr,this.headers);
        },

        getUserSuc(data) {
          console.log(data);
          data.officerList.map((item,k)=>{
            item.dutyName = item.duty == 1 ? "主管" : "客户经理";
          });
          this.total = parseInt(data.totalNum) != 0 ? parseInt(data.totalNum) : 1;
          this.tableData = data.officerList;
        },

        getUserErr(res) {
          console.log(res);
          if( this.$utils.goLogin(res.returnCode)){
            this.goLogin(res.returnCode);
            return;
          }
        },
        addUser() {
          let params = {};
          this.$router.push({name:'userDetail',query:params});
        },
        edit(index, row) {
          let params = {
            "userId": row.userId,
            "userName": row.userName,
            "loginName": row.loginName,
            "status": row.status,
            "bankId": row.bankId,
            "bankName": row.bankName,
            "duty": row.duty,
          };
          this.$router.push({name:'userDetail',query:params});
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
            this.goLogin();
            return;
          }
          this.$message({
            message: '获取银行机构失败,请刷新重试',
            type: 'error',
            center: true,
            duration: 2000
          });
        },
        closeTree () {
          this.showTree = false;
        },
        showSelTree () {
          this.showTree = !this.showTree;
        },
        selBank (data,node){
          this.user.bankId = data.id;
          this.user.bankName = data.label;
          this.closeTree();
        },
        changeStatus(obj, row) {
          console.log(obj);
          console.log(row.userId);
          let chage_data = {
            "service": "officerService",
            "method": "editOfficerStatus",
            "data": {
              "userId": row.userId,
              "status": obj
            }
          };
          this.$api.post('',chage_data,this.getStatusSuc,this.getStatusErr,this.headers);
        },
        getStatusSuc(data) {
          this.getUserList();
        },
        getStatusErr(res) {
          console.log(res);
          if( this.$utils.goLogin(res.returnCode)){
            this.goLogin();
            return;
          }
        },
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .custom-tree-node{
    width:100%;
    height:24px;
    line-height:24px;
  }
  .editBtn{
    font-size: 14px;
    color: #363f45;
  }
  .editBtn:hover{
    font-size: 14px;
    color: #3185ff;
    text-decoration: underline;
  }

  .userMain{
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
      padding: 15px 10px;
      min-width:1000px;
      .name{
        float: left;
        & > label{
          margin: 0 10px;
          font-size: 14px;
        }
        & > input{
          background: #fff;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
          color: #606266;
          display: inline-block;
          font-size: inherit;
          height: 40px;
          line-height: 40px;
          outline: 0;
          padding:0 15px;
        }
      }
      .branches{
        float: left;
        & > label{
          margin: 0 10px;
          font-size: 14px;
        }
        .tree{
          display: inline-block;
          position: relative;
          .tree-tr{
            display: block;
            position: relative;
            width: 100%;
            input{
              box-sizing:border-box;
              height:40px;
              line-height:40px;
              width:240px;
              padding:12px 16px;
              border: solid 1px rgba(234, 234, 234, 1);
            }
            .el-tree{
              position: absolute;
              background: #fff;
              color: #606266;
              z-index: 100;
              width: 238px;
              border: 1px solid #e4e4e4;
            }
          }
        }
      }
      .character{
        float: left;
        & > label{
          margin: 0 10px;
          font-size: 14px;
        }
      }
    }
    .tab{
      min-width: 1000px;
      width: calc(100% - 48px);
      padding: 10px;
      .page{
        text-align: center;
        padding: 15px;
      }
    }
  }
</style>

