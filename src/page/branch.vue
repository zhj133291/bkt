<template>
  <div class="custom-tree-container">
    <div class="dh">
      <span class='cancel'>分支管理</span>
    </div>
    <div class="title">
      <div></div>
      <span>分支管理</span>
    </div>
    <div class="block">
      <div class='header'>
        <span class='first'>
          银行名称
        </span>
        <span class='th'>
          操作
        </span>
        <span class='sec'>
          银行级别
        </span>
      </div>
      <el-tree
        :data="treeData"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class='first'>{{ data.label }}</span>
          <span class='th'>
            <span @click="() => append(node,data)">
              {{data.operation}}
            </span>
            <span @click="() => edit(node, data)" v-if='data.level!="1"'>
              编辑
            </span>
          </span>
          <span class='sec'>{{ data.levelContent }}</span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
  let id = 1000;

  export default {
    data() {
      let INFO = JSON.parse(sessionStorage.getItem('INFO'));
      return {
        level:{'1':'总行','2':'分行','3':'支行'},
        operation:{'1':'新增分行','2':'新增支行','3':''},
        headers :{
          userId: INFO.userId,
          client: '1',
          token: INFO.token
        },
        treeData: []
      }
    },

    methods: {
      getBank () {
        let data = {
          "service": "organizeService",
          "method": "getBankTree",
          "data": {
          }
        };
        this.$api.post('',data,this.getBankSuc,this.getBankErr,this.headers);
      },
      renderTreeData (data) {
        let res={};
        let me=this;
        res.id = data.bankId;
        res.label = data.bankName;
        res.level = data.bankLevel;
        res.levelContent = this.level[data.bankLevel];
        res.operation = this.operation[data.bankLevel];
        res.parentId = data.parentId;
        res.parentName = data.parentName;
        res.children=[];
        if (data.branchList && data.branchList.length>0){
          data.branchList.map((item,k)=>{
            res.children.push(me.renderTreeData(item));
          });
        }
        return res;
      },
      getBankSuc (data) {
        let bank = [];
        bank.push(this.renderTreeData (data));
        this.treeData = bank;
      },
      getBankErr (res) {
        if( this.$utils.goLogin(res.returnCode)){
          this.goLogin(res.returnCode);
          return;
        }
        this.$message({
          message: res.returnMessage,
          type: 'error',
          center: true,
          duration: 2000
        });
      },
      append(node,data) {
        let params = {};
        params.bankId = '';
        params.bankName = '';
        params.bankLevel = parseInt(data.level)+1;
        params.bankLevelContent = this.level[params.bankLevel];
        params.parent = data.label;
        params.parentId = data.id;
        this.$router.push({name:'branchDetail',query:params});
      },

      edit(node, data) {
        let params = {};
        params.bankId = data.id;
        params.bankLevelContent = data.levelContent;
        this.$router.push({name:'branchDetail',query:params});
      }
    },
    created () {
      this.getBank();
    }
  };
</script>

<style lang='less'>
  @la:#777777;
  @gy: #363f45;
  .el-tree-node__content{
    cursor:default !important;
  }
  .el-tree-node__expand-icon.expanded{
    transform:rotate(45deg) !important;
  }
  .custom-tree-container{
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
      line-height:55px;
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
        margin-left:7px;
        font-size:13px;
        color: @gy;
      }
    }
    .block{
      margin-left:24px;
      min-width:1091px;
      width:calc(100% - 48px);
      background-color: #fff;
      box-shadow: inset 0px -1px 0px 0px rgba(230, 231, 237, 1);
      .header{
        background-color:#fff;
        width:100%;
        border-bottom:1px solid #eee;
        span{
          height:55px;
          line-height:55px;
          display:inline-block;
          text-align:center;
          color: #363f45;
          font-size:14px;
          font-weight:600;
        }
        .first{
          padding-left:16px;
          text-align:left;
        }
        .sec{
          width:300px;
          float:right;
        }
        .th{
          width:350px;
          float:right;
        }
      }
      .el-tree{
        .el-tree-node__content{
          padding-left:30px;
          border-bottom:1px solid #eee;
          height:55px;
          .custom-tree-node{
            span{
              display:inline-block;
              text-align:center;
              color: #363f45;
              font-size:14px;
            }
            .first{
              text-align:left;
              float:left;
            }
            .sec{
              float:right;
              width:300px;
            }
            .th{
              width:350px;
              float:right;
              box-sizing:border-box;
              text-align:center;
              span{
                cursor:pointer;
                margin-right:5px;
                &:hover{
                  color: #3185ff;
                  text-decoration:underline;
                }
              }
            }
          }
        }
      }
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    display:block;
  }
  .el-tree-node__expand-icon{
    font-size:20px;
    color:rgb(145, 149, 153);
  }
</style>