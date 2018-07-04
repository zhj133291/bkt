<template>
  <div>
    <div class="customerContent">
      <div class="dh">
        <span class='cancel'>客户管理 &gt;客户管理详情</span>
      </div>
      <div class="title">
        <div></div>
        <span>客户管理</span>
      </div>
      <div class="customerInfo">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="跟踪信息" name="first">
            <div class="track">
              <el-table :data="trackData" style="width: 100%">
                <el-table-column prop="date" label="时间" width="180"></el-table-column>
                <el-table-column prop="status" label="当前状态" width="180"></el-table-column>
                <el-table-column prop="mech" label="处理机构"></el-table-column>
                <el-table-column prop="deal" label="处理人"></el-table-column>
                <el-table-column prop="process" label="处理详情"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="基础信息" name="second">
            <div class="basis">
              <div class="report">
                <div class="trial">审贷报告</div>
                <div class="cret">信贷报告</div>
              </div>
              <div class="product">
                <div class="productInfo">产品信息</div>
                <div class="info">
                  <div>
                    <div><label>产品名称：</label>税信贷</div>
                    <div><label>所属银行股：</label>紫金农商银行</div>
                  </div>
                  <div>
                    <div><label>最高额度：</label>100万元</div>
                    <div><label>还款期限：</label>12个月</div>
                    <div><label>年利率：</label>9.0%</div>
                    <div><label>担保方式：</label>信用</div>
                  </div>
                </div>
              </div>
              <div class="apply">
                <div class="applyInfo">申请信息</div>
                <div class="info">
                  <div>
                    <div><label>业务序列号：</label>20180601P000001</div>
                    <div><label>提交时间：</label>2018-06-22 18:00</div>
                    <div><label>贷款金额：</label>100万元</div>
                    <div><label>贷款期限：</label>12个月</div>
                  </div>
                  <div>
                    <div><label>企业名称：</label>南京辰阔网络科技有限公司</div>
                    <div><label>税号：</label>9121010232728515Q</div>
                    <div><label>申请人姓名：</label>绿箩</div>
                    <div><label>申请人手机号：</label>18715872587</div>
                  </div>
                  <div>
                    <div><label>申请人身份证号：</label>32032119880112062X</div>
                    <div><label>申请人类型：</label>法定代表人</div>
                    <div><label>他行贷款金额：</label>100万元</div>
                    <div><label>我行贷款金额：</label>100万元</div>
                  </div>
                  <div>
                    <div><label>对外担保金额：</label>100万元</div>
                    <div><label>关联企业现有贷款金额：</label>100万元</div>
                    <div><label>个人经营性贷款金额：</label>100万元</div>
                    <div><label>营销推荐代码：</label>3203210001</div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="授信下款信息" name="third">
            <div class="credit">345345</div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="opt">
        <el-button type="primary" @click="getUserList('search')" style="margin-left: 50px; background: #3185ff; border-color: #3185ff;">查询</el-button>
        <el-button type="primary" @click="addUser()" style="background: #3185ff; border-color: #3185ff; margin-left: 10px;">清空</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        trackData: [{
          date: '2016-05-02',
          status: '王小虎',
          mech: '上海市普陀区金沙江路 1518 弄',
          deal: '上海市普陀区金沙江路 1518 弄',
          process: '上海市普陀区金沙江路 1518 弄'
        }]
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .el-tabs__nav-scroll {
    background: #ffffff;
    padding-left: 48px;
  }

  .customerContent{
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
    .customerInfo{
      margin: 0 24px;
    }
    .opt{
      position: fixed;
      width: 100%;
      height: 60px;
      line-height: 60px;
      background: #f0f1f8;
      bottom: 0;
    }
    .basis{
      background: #fff;
      .report{
        padding: 10px 30px;
        border-bottom 1px solid #eaeaea;
        text-align: right;
        .trial{
          display inline-block;
          text-align: center;
          width: 100px;
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          color #fff;
          background: #3185ff;
        }
        .cret{
          display inline-block;
          text-align: center;
          width: 100px;
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          color: #fff;
          background: #3185ff;
          margin-left: 20px;
        }
      }
      .product{
        width: 100%;
        .productInfo{
          padding: 12px 30px 19px;
          font-size: 14px;
          color: #363f45;
          border-bottom 1px solid #eaeaea;
        }
        .info{
          font-size 14px;
          color #363f45;
          border-bottom 1px solid #eaeaea;
          & > div{
            padding: 12px 30px;
            & > div{
              display: inline-block;
              width: 23%;
            }
          }
        }
      }
      .apply{
        width: 100%;
        .applyInfo{
          padding: 12px 30px 19px;
          font-size: 14px;
          color: #363f45;
          border-bottom 1px solid #eaeaea;
        }
        .info{
          font-size 14px;
          color #363f45;
          border-bottom 1px solid #eaeaea;
          & > div{
            padding: 12px 0 14px 30px;
            & > div{
              display: inline-block;
              width: 24%;
            }
          }
        }
      }
    }
  }

</style>

