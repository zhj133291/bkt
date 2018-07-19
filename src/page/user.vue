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

        <!--列表-->
        <div class="tab">
          <div class="search">
            <div class="name">
              <label>姓&nbsp;名</label>
              <input type="text" v-model="user.name" placeholder="请输入姓名">
            </div>
            <div class="branches" v-if="bankLevel != 3">
              <label>所属分支</label>
              <div class="tree">
                <div class="tree-tr downC">
                  <input type="hidden" v-model='user.bankId'>
                  <input type="text" class='pointer' readonly="readonly" v-model='user.bankName' @click='showSelTree' placeholder="请选择所属银行">
                  <i class="el-select__caret el-input__icon el-icon-arrow-down down" @click='showSelTree'></i>
                  <div  v-show='showTree' @mouseleave='closeTree'>
                    <el-tree v-show='showTree' class="el-tree" :data="treeData" node-key="id" default-expand-all ref='tree' :highlight-current='true' :expand-on-click-node="false" @current-change='selBank'>
                      <span>请选择分支</span>
                      <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ data.label }}</span>
                      </span>
                    </el-tree>
                  </div>
                </div>
              </div>
            </div>
            <div class="character">
              <label>职位</label>
              <el-select v-model="user.duty" placeholder="请选择">
                <el-option v-for="item in duty" :key="item.value" :label="item.duty_label" :value="item.value"></el-option>
              </el-select>
            </div>
            <el-button type="primary" @click="getUserList('search')" style="margin-left: 50px; background: #3185ff; border-color: #3185ff;">筛选</el-button>
            <el-button type="primary" @click="addUser()" style="background: #3185ff; border-color: #3185ff; margin-left: 10px;">新增人员</el-button>
          </div>

          <el-table :data="tableData" node-key="id" style="width: 100%;">
            <el-table-column prop="userName" label="姓名"></el-table-column>
            <el-table-column prop="loginName" label="手机号"></el-table-column>
            <el-table-column prop="bankName" label="所属分支"></el-table-column>
            <el-table-column prop="dutyName" label="职位"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="props">
                <el-switch v-model="tableData[props.$index].status" @change='changeStatus($event, props.row)' :inactive-value="2" inactive-color="#d3d3d4" :active-value="1" active-color="#3d78bd"></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作">
              <template slot-scope="scope">
                <el-button class="editBtn" type="text" @click="edit(scope.$index, scope.row)" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination background layout="prev, pager, next, total, jumper" :page-size="pageSize" :current-page.sync="currentPage" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="total"></el-pagination>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data () {
        let currentPage=1,total=0;
        let params = this.$route.params;
        if (params && params.back) {
          currentPage=parseInt(sessionStorage.getItem("pageIndex"));
          total=parseInt(sessionStorage.getItem("total"));
        }
        let INFO = JSON.parse(sessionStorage.getItem('INFO'));
        console.log(INFO);
        return {
          bankLevel: INFO.bankLevel,
          reg:false,
          pageIndex: 1,
          pageSize: 30,
          currentPage: currentPage,
          total: total,
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
          saveInfo:{
            name:'',
            bankId:'',
            bankName:'',
            duty:''
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
        let params = this.$route.params;
        if (params && params.back) {
          this.getUserList('back');
          return;
        } else {
          this.getUserList('init');
        }
      },
      methods: {
        //列表
        getUserList(obj) {
          if (obj == 'init') {
            let data = {
              "service": "officerService",
              "method": "getOfficerList",
              "data": {
                userName: this.user.name,
                bankId: this.user.bankId,
                duty: this.user.duty,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                client:'B'
              }
            };
            this.$api.post('',data,this.getUserSuc,this.getUserErr,this.headers);
          } else if (obj == 'search') {
            this.saveInfo.name = this.user.name;
            this.saveInfo.bankId = this.user.bankId;
            this.saveInfo.bankName = this.user.bankName;
            this.saveInfo.duty = this.user.duty;
            this.currentPage = this.pageIndex;
            let data = {
              "service": "officerService",
              "method": "getOfficerList",
              "data": {
                userName: this.user.name,
                bankId: this.user.bankId,
                duty: this.user.duty,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                client:'B'
              }
            };
            this.$api.post('',data,this.getUserSuc,this.getUserErr,this.headers);
          } else if (obj == 'back') {
            this.saveInfo.name = sessionStorage.getItem("name");
            this.saveInfo.bankId = sessionStorage.getItem("bankId");
            this.saveInfo.bankName = sessionStorage.getItem("bankName") !== '' ? sessionStorage.getItem("bankName") : '';
            this.saveInfo.duty = sessionStorage.getItem("duty") !== '' ? sessionStorage.getItem("duty") : '';
            this.user.name = this.saveInfo.name;
            this.user.bankId = this.saveInfo.bankId;
            this.user.bankName = this.saveInfo.bankName;
            this.user.duty = this.saveInfo.duty;
            this.handleCurrentChange(this.currentPage);
          }
        },

        //分页
        handleSizeChange: function (size) {
          this.pagesize = size;
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          let current_data = {
            "service": "officerService",
            "method": "getOfficerList",
            "data": {
              userName: this.saveInfo.name,
              bankId: this.saveInfo.bankId,
              duty: this.saveInfo.duty,
              pageIndex: this.currentPage,
              pageSize: this.pageSize,
              client:'B'
            }
          };
          this.$api.post('',current_data,this.getUserSuc,this.getUserErr,this.headers);
        },

        getUserSuc(data) {
          data.officerList.map((item,k)=>{
            item.dutyName = item.duty == 1 ? "主管" : "客户经理";
          });
          this.total = parseInt(data.totalNum);
          this.tableData = data.officerList;
        },

        getUserErr(res) {
          console.log(res);
          if( this.$utils.goLogin(res.returnCode)){
            this.goLogin(res.returnCode);
            return;
          }
        },
        save () {
          sessionStorage.setItem('name', this.saveInfo.name);
          sessionStorage.setItem('bankId', this.saveInfo.bankId);
          sessionStorage.setItem('bankName', this.saveInfo.bankName);
          sessionStorage.setItem('duty', this.saveInfo.duty);
          sessionStorage.setItem('pageIndex', this.currentPage);
          sessionStorage.setItem('total', this.total);
        },
        addUser() {
          let params = {};
          this.save();
          this.$router.push({name:'userDetail',query:params});
        },
        edit(index, row) {
          this.save();
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
          this.getUserList('init');
        },
        getStatusErr(res) {
          console.log(res);
          if( this.$utils.goLogin(res.returnCode)){
            this.goLogin();
            return;
          }
          if (res.returnCode == '10000014') {
            this.getUserList('init');
          }
          this.$message({
            message: res.returnMessage,
            type: 'error',
            center: true,
            duration: 2000
          });
        },
      },
      mounted() {
        // 点击其他不在的区域触发事件
        let _this = this;
        document.addEventListener('click', (e) => {
          let tree = document.getElementsByClassName('tree')[0];
          if (tree && !tree.contains(e.target)){
            _this.showTree = false;
          }
        })
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-button{
    border-radius:0;
  }
  .el-input__inner{
    border-radius:0;
    color:#606266;
  }
  .downC{
    position:relative;
    .down{
      color:#c0c4cc;
      position:absolute;
      cursor:pointer;
      top:0;
      right:5px;
    }
  }
  .custom-tree-node{
    width:100%;
    height:24px;
    line-height:24px;
  }
  .editBtn{
    font-size: 14px;
    color: #363f45;
  }
  .el-table th>.cell{
    text-align: center;
    color: #363f45;
    font-size: 14px;
  }
  .el-table .cell{
    text-align: center;
  }
  thead{
    .cell{
      font-weight:600;
    }
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
      background: #fff;
      border-bottom: 4px solid #ebecf2;
      min-width:1000px;
      .name{
        float: left;
        & > label{
          margin: 0 10px;
          font-size: 14px;
          font-weight:550;
        }
        & > input{
          background: #fff;
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
          font-weight:550;
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
              color:#606266;
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
          font-weight:550;
        }
      }
    }
    .tab{
      min-width: 1000px;
      width: calc(100% - 48px);
      padding: 10px 24px;
      .page{
        text-align: center;
        padding: 15px;
      }
    }
  }
</style>

