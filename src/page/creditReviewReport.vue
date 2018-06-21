<template>
    <div class="creditReview">
      <div class="company">
        <div class="co">南京辰阔网络科技有限公司</div>
      </div>
      <!--企业信息-->
      <div class="enterprise">
        <!--基本信息-->
        <div class="basicInfo">
          <div class="headline">1、企业信息</div>
          <div class="subtitle">1.1基本信息</div>
          <div class="info">
            <p>
              <label>工商注册号：</label><span>3203211999200139788</span>
            </p>
            <p>
              <label>组织机构代码：</label><span>32032118834092132</span>
            </p>
          </div>
          <div class="info">
            <p>
              <label>纳税人识别号：</label><span>320321199920013978X</span>
            </p>
            <p>
              <label>统一社会信用代码：</label><span>32032118834092132</span>
            </p>
          </div>
          <div class="info">
            <p>
              <label>企业类型：</label><span>有限责任公司</span>
            </p>
            <p>
              <label>工商登记机关：</label><span>江苏省南京市工商行政管理局</span>
            </p>
          </div>
          <div class="info">
            <p>
              <label>法定代表人：</label><span>魏晨</span>
            </p>
            <p>
              <label>经营状态：</label><span>开业</span>
            </p>
          </div>
          <div class="info">
            <p>
              <label>注册资本：</label><span>200.00万元</span>
            </p>
          </div>
          <div class="info">
            <p style="width: 100%;">
              <label style="width: 15%;">注册地址：</label><span>南京市南京南京南京市玄武区玄武区南京玄武湖隧道公司</span>
            </p>
          </div>
          <div class="info">
            <p style="width: 100%;">
              <label style="width: 15%;">注册地址：</label><span>南京市南京南京南京市玄武区玄武区南京玄武湖隧道公司</span>
            </p>
          </div>
          <div class="info">
            <p>
              <label>成立日期：</label><span>1999-10-01</span>
            </p>
            <p>
              <label>核准日期：</label><span>2000-01-01</span>
            </p>
          </div>
          <div class="info">
            <p>
              <label>营业期限起：</label><span>1999-10-01</span>
            </p>
            <p>
              <label>营业期限至：</label><span>至无固定期限</span>
            </p>
          </div>
          <div class="info">
            <p style="width: 100%;">
              <label style="width: 15%; float: left">经营范围：</label><p style="width: 85%; float: right;">计算机软硬件是什么性质呢，不是我说，这些都是扯淡，客户要的是什么，你知道吗？你不知道，现在说什么都是扯淡，电脑好吗？不好，我这吊电脑，卡死了，卡死了，卡死了</p>
            </p>
          </div>
          <div class="info">
            <p>
              <label>一般纳税人资质：</label><span>是</span>
            </p>
          </div>
        </div>
        <!--股东信息-->
        <div class="shareholderInfo">
          <div class="subtitle">1.2股东信息</div>
          <div class="shareholderTable">
            <el-table :data="shareholderInfoTable" style="width: 100%">
              <el-table-column prop="number" label="序号" width="80"></el-table-column>
              <el-table-column prop="name" label="股东名称" width="180"></el-table-column>
              <el-table-column prop="shareholderType" label="股东类型" width="120"></el-table-column>
              <el-table-column prop="credentialsType" label="证照/证件类型" width="180"></el-table-column>
              <el-table-column prop="credentialsNo" label="证照/证件号码" width="180"></el-table-column>
              <el-table-column prop="shareholderRatio" label="持股比例" width="120"></el-table-column>
              <el-table-column prop="cumulativeAmount" label="累计认缴额"></el-table-column>
            </el-table>
          </div>
        </div>
        <!--高管信息-->
        <div class="executivesInfo">
          <div class="subtitle">1.3高管信息</div>
          <div class="executivesTable">
            <el-table :data="executivesInfoTable" style="width: 100%">
              <el-table-column prop="number" label="序号" width="180"></el-table-column>
              <el-table-column prop="name" label="名称" width="180"></el-table-column>
              <el-table-column prop="job" label="职位"></el-table-column>
            </el-table>
          </div>
        </div>
        <!--票面银行信息-->
        <div class="ticketBankInfo">
          <div class="subtitle">1.4票面银行信息</div>
          <div class="ticketBankTable">
            <el-table :data="ticketBankInfoTable" style="width: 100%">
              <el-table-column prop="number" label="序号" width="180"></el-table-column>
              <el-table-column prop="bankName" label="开户银行" width="240"></el-table-column>
              <el-table-column prop="bankNo" label="银行账号" width="200"></el-table-column>
              <el-table-column prop="totalAmount" label="总金额" width="120"></el-table-column>
              <el-table-column prop="total" label="总分数" width="100"></el-table-column>
              <el-table-column prop="amountRatio" label="金额占比"></el-table-column>
            </el-table>
          </div>
        </div>
        <!--签到信息-->
        <div class="signInfo">
          <div class="subtitle">1.5签到信息</div>
          <div class="tipInfo">
            设备类型：<span>金税盘</span>， 设备代码：<span>6654332166543321</span>， 设备开票限额为：<span>100000.00</span>元, 设备：<span>主</span>开票级,<br>
            发行时间：<span>2013-11-30</span>， 认证时间：<span>2017-09-12</span>， 总共签到次数：<span>96</span>次， 变更：<span>95</span>次。
          </div>
          <div class="signTable">
            <el-table :data="signInfoTable" style="width: 100%">
              <el-table-column prop="earliestDate" label="最早签到日期" width="240"></el-table-column>
              <el-table-column prop="lastDate" label="最后签到日期" width="240"></el-table-column>
              <el-table-column prop="ip" label="IP地址" width="200"></el-table-column>
              <el-table-column prop="mac" label="MAC地址" width="200"></el-table-column>
              <el-table-column prop="frequency" label="次数"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!--经营信息-->
      <div class="businessInfo">
        <div class="headline">2、经营信息</div>
        <div class="subtitle">2.1所属区域及行业</div>
        <div class="industry">
          <div>
            <p>所属省份:</p><p>江苏省</p><p>所属市区:</p><p>南京市</p>
          </div>
          <div>
            <p>行业门类:</p><p>批发业</p><p>行业明细:</p><p>文具用品批发</p>
          </div>
        </div>
        <div class="subtitle">2.2区域及行业排名</div>
        <div class="rankTable">
          <el-table :data="rankInfoTable" style="width: 100%">
            <el-table-column prop="lastYearSales" label="上年销售额" width="180"></el-table-column>
            <el-table-column prop="nationalRanking" label="上年全国销售额排名区间" width="340"></el-table-column>
            <el-table-column prop="industryRanking" label="上年所属行业销售额排名区间"></el-table-column>
          </el-table>
        </div>
      </div>
      <!--经营风险-->
      <div class="businessRisk">
        <div class="headline">3、经营风险</div>
        <div class="subtitle">3.1采集发票数据统计</div>
        <div class="tipInfo">
          企业使用的设备：<span>金税盘</span>， 共有：<span>1</span>台开票机， 已采集：<span>1</span>台开票机。
        </div>
        <div class="invoiceStatistics">
          <el-table :data="invoiceStatisticsTable" style="width: 100%">
            <el-table-column prop="taxpayerName" label="纳税人名称" width="240"></el-table-column>
            <el-table-column prop="taxpayerNumber" label="纳税人识别号" width="240"></el-table-column>
            <el-table-column prop="earliestInvoicing" label="报告期内最早开票区间" width="200"></el-table-column>
            <el-table-column prop="lastInvoicing" label="报告期内最晚开票区间" width="200"></el-table-column>
            <el-table-column prop="invoiceNumber" label="发票份数"></el-table-column>
          </el-table>
        </div>
        <div class="subtitle">3.2主营收入分析</div>
        <div class="title">3.2.1主营商品分子</div>
        <div class="tipInfo">
          采集时间区间：<span>2017年01月-2018年06月</span><br>
          发票份数（含商品明细）：<span>939</span>份， 总金额：<span>62,220，243.01</span>元，占全部金额比例：<span>100%</span>。<br>
          发票份数（无商品明细）：<span>0</span>份， 总金额：<span>0.00</span>元，占全部金额比例：<span>0%</span>。
        </div>
        <div class="tipInfo">
          该公司累计销售商品数为：<span>997</span>， 主营商品基尼系数为：<span>0.31</span>，集中度：<span>低</span>。
        </div>
        <div class="mainProductAnalysis">
          <el-table :data="mainProductAnalysisTable" style="width: 100%">
            <el-table-column prop="number" label="序号" width="240"></el-table-column>
            <el-table-column prop="productName" label="商品名称" width="240"></el-table-column>
            <el-table-column prop="specification" label="规格型号" width="200"></el-table-column>
            <el-table-column prop="unit" label="单位" width="200"></el-table-column>
            <el-table-column prop="salesAmount" label="销售金额"></el-table-column>
            <el-table-column prop="frequency" label="次数"></el-table-column>
            <el-table-column prop="amountAccounting" label="金额占比"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data() {
        return {
          shareholderInfoTable: [{
            number: '1',
            name: '王小虎',
            shareholderType: '法人股东',
            credentialsType: '身份证',
            credentialsNo: '320381199199999999',
            shareholderRatio: '51%',
            cumulativeAmount: '101万'
          }, {
            number: '2',
            name: '王小虎',
            shareholderType: '法人股东',
            credentialsType: '身份证',
            credentialsNo: '320381199199999999',
            shareholderRatio: '51%',
            cumulativeAmount: '101万'
          }, {
            number: '3',
            name: '王小虎',
            shareholderType: '法人股东',
            credentialsType: '身份证',
            credentialsNo: '320381199199999999',
            shareholderRatio: '51%',
            cumulativeAmount: '101万'
          }],
          executivesInfoTable: [{
            number: '1',
            name: '王小虎',
            job: '执行董事',
          }, {
            number: '2',
            name: '王小虎',
            job: '监事',
          }, {
            number: '3',
            name: '王小虎',
            job: '董事长、总经理',
          }],
          ticketBankInfoTable: [{
            "number": '1',
            "bankName": '中国工商银行南京新街口支行',
            "bankNo": '6222024301029758784',
            "totalAmount": '7654321.98元',
            "total": '939份',
            "amountRatio": '100%'
          }],
          signInfoTable: [{
            "earliestDate": '2018-01-01 07:09:13',
            "lastDate": '2018-07-01 07:09:13',
            "ip": '121.225.86.200',
            "mac": '66-88-d1-83-03-d8',
            "frequency": '5'
          },{
            "earliestDate": '2018-01-01 07:09:13',
            "lastDate": '2018-07-01 07:09:13',
            "ip": '121.225.86.200',
            "mac": '66-88-d1-83-03-d8',
            "frequency": '5'
          },{
            "earliestDate": '2018-01-01 07:09:13',
            "lastDate": '2018-07-01 07:09:13',
            "ip": '121.225.86.200',
            "mac": '66-88-d1-83-03-d8',
            "frequency": '5'
          },{
            "earliestDate": '2018-01-01 07:09:13',
            "lastDate": '2018-07-01 07:09:13',
            "ip": '121.225.86.200',
            "mac": '66-88-d1-83-03-d8',
            "frequency": '5'
          },{
            "earliestDate": '2018-01-01 07:09:13',
            "lastDate": '2018-07-01 07:09:13',
            "ip": '121.225.86.200',
            "mac": '66-88-d1-83-03-d8',
            "frequency": '5'
          },{
            "earliestDate": '2018-01-01 07:09:13',
            "lastDate": '2018-07-01 07:09:13',
            "ip": '121.225.86.200',
            "mac": '66-88-d1-83-03-d8',
            "frequency": '5'
          }],
          rankInfoTable: [{
            "lastYearSales": '600.31万元',
            "nationalRanking": '该企业的销售额在区域排名介于前20%-40%',
            "industryRanking": '该企业的销售额在行业排名为前20%'
          }],
          invoiceStatisticsTable: [{
            "taxpayerName": '南京辰阔网络科技有限公司',
            "taxpayerNumber": '320321199109090909',
            "earliestInvoicing": '201701',
            "lastInvoicing": '201709',
            "invoiceNumber": '939份'
          }],

        }
      }
    };
</script>

<style lang="stylus" scope rel="stylesheet/stylus">
  .headline{
    background: #C7CEDB;
    font-weight: 700;
    color: #2D2D2D;
    font-size: 20px;
    padding: 10px;
  }
  .subtitle{
    color: #2D2D2D;
    font-size: 16px;
    padding: 15px 10px 5px 10px;
    margin-bottom: 15px;
    border-bottom: 3px solid #C7CEDB;
    position: relative;
    &:after{
       content: '';
       width: 180px;
       height: 3px;
       background: #FF0001;
       position: absolute;
       left: 0;
       bottom: -3px;
    }
  }
  .title{
    color: #2d2d2d;
    font-size: 15px;
    padding: 15px 10px;
  }
  .creditReview{
    font-size: 14px;
    margin: 20px;
    .company{
      font-size: 24px;
      font-weight: 400;
      padding: 15px 10px;
    }
    .enterprise{
      .basicInfo{
        .info{
          display: inline-block;
          width: 100%;
          font-size: 15px;
          padding: 20px 0;
          p{
            width: 50%;
            float: left;
            label{
              width: 30%;
              display: inline-block;
              color: #8E8E8E;
            }
          }
        }
      }
    }
    .tipInfo{
      border:2px solid #D2A158;
      background: #FDF7E0;
      padding: 15px;
      margin-bottom: 15px;
      line-height: 24px;
      color: #C55B01;
      span {
        color: #FF0001;
        font-size: 18px;
      }
    }
    .businessInfo{
      margin: 15px 0;
    }
    .industry{
      background: #fff;
      margin: 15px;
      div{
        width: 100%;
        border-bottom: 1px solid #e8e8e8;
        display: inline-block;
        &:last-child{
           border-bottom: none;
        }
        p{
          display: inline-block;
          width: 23%;
          padding: 10px 5px;
          border-left: 1px solid #e8e8e8;
          float: left;
        }
      }
    }
  }
</style>
