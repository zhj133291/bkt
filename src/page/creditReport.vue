<template>
  <div class="report">
    <div class="report_title">
      <span class="first_span">南京辰阔科技有限公司</span>
      <span class="second_span">爱信诺编码:</span><span class="third_span">348758934758934759</span>
      <div class="report_span">爱信诺信用融资授信报告</div>
    </div>
    <div class="report_part1">
      <div class="company_apply">1.企业申请信息</div>
      <div class="part_product">
        <div class="dot-right"></div>
        <div class="product">产品信息</div>
        <el-row class="first-row">
          <el-col :span="4">
            <div class="grid-content bg-purple-title">申请产品</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.product.productName}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">申请时间</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.product.gmtCreate}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">最高额度</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.product.maxLoanAmount}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">银行信息</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.product.bankName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">担保方式</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.product.guaranteeTypeName}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">利率</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.product.rate}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">贷款期限</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.product.repaymentTerm}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">还款方式</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.product.repaymentName}}</div>
          </el-col>
        </el-row>
      </div>
      <div class="part_product">
        <div class="dot-right"></div>
        <div class="product">申请人信息（已授权）</div>
        <el-row class="first-row">
          <el-col :span="4">
            <div class="grid-content bg-purple-title">姓名</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.apply.contactPerson}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">申请人类型</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.apply.loanType}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">身份证号码</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.apply.idtfno}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">联系电话</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.apply.contactMobile}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">发卡银行</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.apply.openBankName}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">一类银行卡号</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.apply.openBankNo}}</div>
          </el-col>
        </el-row>
      </div>
      <div class="part_product">
        <div class="dot-right"></div>
        <div class="product">所属企业信息</div>
        <el-row class="first-row">
          <el-col :span="4">
            <div class="grid-content bg-purple-title">企业名称</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.enterprise.name}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">法定代表人</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.enterprise.fddbr}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">纳税人识别号</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.enterprise.nsrsbh}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">注册登记日期</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-value">{{content.enterprise.zcdjrq}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">经营地址</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple-value">{{content.enterprise.jydz}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple-title">经营范围</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple-value">{{content.enterprise.jyfw}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="report_part2">
      <div class="enter_evaluate">2.准入评估</div>
      <div class="enter_table">
        <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
          <el-table-column prop="target" label="准入指标" width="180"></el-table-column>
          <el-table-column prop="condition" label="准入判别规则"></el-table-column>
          <el-table-column prop="value1" label="指标值" style="text-align: center;"></el-table-column>
          <el-table-column prop="value2" label="是否符合" style="text-align: center;"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="report_part3">
      <div class="company_apply">3.企业信用评分</div>
      <div class="report_part3_result">该企业信用评分为{{content.evaluation.xypf}}分。评价等级{{content.evaluation.xydj}}，{{content.evaluation.xysm}}。</div>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple-title">成长指数</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-value credit-score">{{content.evaluation.czzs}}</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-title">履约指数</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-value credit-score">{{content.evaluation.lyzs}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple-title">信用评分</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-value credit-score">{{content.evaluation.xypf}}</div>
        </el-col>
      </el-row>

      <p class="note">备注：</p>
      <p class="note_content"><strong>成长指数</strong>&nbsp;&nbsp;通过预测未来企业一段时间的销售增长情况，评估企业未来一 段时间的经营状态，放映企业持续成长性，进而评估其偿债能力。（成长指数越高企业成长性越好，其偿债能力越强）交电话费开始就得混分巨兽开发商
      </p>
      <p class="note_content"><strong>履约指数</strong>&nbsp;&nbsp;通过分析企业历史履约情况，评估企业履约意愿强弱以及未来潜在信用 风险的可能性，从而反映企业未来偿债意愿。（履约指数越高企业偿债意愿也越高）哈宽度和U盾花和尚的精神科肤色的哈回答就是点击啊的杀机大环境开始的科技啊稍等哈
      </p>
      <p class="note_content"><strong>信用评分</strong>&nbsp;&nbsp;信用评分是由成长指数与履约指数综合而成，用来评估企业未来信用状况， 其评分越高，信用越好；反之，则越差
      </p>
    </div>
    <div class="report_part4">
      <div class="company_apply">4.额度测算</div>
      <div class="number_credit">
        <p>最早开票日期：<span>{{content.evaluation.zzkprq}}</span> 最晚开票日期：<span>{{content.evaluation.zwkprq}}</span></p>
        <p>参与测算额度的销项发票：总金额：<span>{{content.evaluation.zje}}</span>万元，总份数：<span>{{content.evaluation.zfs}}</span>份</p>
        <p>其中有效发票共 <span>{{content.evaluation.yxfpzje}}</span>万元/<span>{{content.evaluation.yxfpzfs}}</span>份； 作废发票共
          <span>{{content.evaluation.zffpzje}}</span>万元/<span>{{content.evaluation.zffpzfs}}</span>份； 红冲发票
          <span>{{content.evaluation.hcfpzje}}</span>万元/<span>{{content.evaluation.hcfpzfs}}</span>份</p>
      </div>
      <div class="suggest_credit">建议该企业授信额度为：<span>{{content.evaluation.sxed}}</span>万元。</div>
      <table class="credit_table" border="1px solid #fff" cellspacing="0" cellpadding="0">
        <tr>
          <th>购方类型</th>
          <th>客户数量</th>
          <th>有效金额(万元)</th>
          <th>可授信评估额(万元)</th>
        </tr>
        <tr>
          <td>企业</td>
          <td>{{content.evaluation.qykhsl}}</td>
          <td>{{content.evaluation.qyyxje}}</td>
          <td>{{content.evaluation.qyksxpge}}</td>
        </tr>
        <tr>
          <td>个人</td>
          <td>{{content.evaluation.grkhsl}}</td>
          <td>{{content.evaluation.gryxje}}</td>
          <td>{{content.evaluation.grksxpge}}</td>
        </tr>
        <tr>
          <td colspan="2">合计</td>
          <td>{{content.evaluation.yxjehj}}</td>
          <td>{{content.evaluation.ksxpgehj}}</td>
        </tr>
        <tr>
          <td rowspan="2">建议授信额</td>
          <td>信用评分</td>
          <td>信用评分系数</td>
          <td rowspan="2">{{content.evaluation.jysxed}}</td>
        </tr>
        <tr>
          <td>{{content.evaluation.xypf}}</td>
          <td>{{content.evaluation.sqpfxs}}</td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        content: {},
        tableData: [],
        headers: {
          client: '1',
          ip: '',
          userId: '',
          token: ''
        }
      };
    },
    created() {
      this.getCreditResult();
    },

    methods: {
      objectSpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (columnIndex === 0) {
          if (rowIndex === 0) {
            return {
              rowspan: 1,
              colspan: 1
            };
          } else if (rowIndex === 1) {
            return {
              rowspan: 9,
              colspan: 1
            };
          } else if (rowIndex === 10 || rowIndex === 12 || rowIndex === 14) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      getReportSuc(data) {
        console.log("请求成功");
        let tableData = [{
          target: '申请人维度',
          condition: '申请人年龄',
          resultKey: "resultValue1",
          passKey: "pass1"
        }, {
          target: '经营维度',
          condition: '经营状态',
          resultKey: "resultValue2",
          passKey: 'pass2'
        }, {
          target: '经营维度',
          condition: '营业执照经营年限',
          resultKey: "resultValue3",
          passKey: 'pass3'
        }, {
          target: '经营维度',
          condition: '企业所属行业',
          resultKey: "resultValue4",
          passKey: 'pass4'
        }, {
          target: '经营维度',
          condition: '最早开票月份距今期限',
          resultKey: "resultValue5",
          passKey: 'pass5'
        }, {
          target: '经营维度',
          condition: '近12个月开票张数离散度',
          resultKey: "resultValue6",
          passKey: 'pass6',
        }, {
          target: '经营维度',
          condition: '最晚开票月份距今期限',
          resultKey: "resultValue7",
          passKey: 'pass7'
        }, {
          target: '经营维度',
          condition: '近12个月销售总额',
          resultKey: "resultValue8",
          passKey: 'pass8'
        }, {
          target: '经营维度',
          condition: '过去12个月红字冲正发票的金额比例',
          resultKey: "resultValue9",
          passKey: 'pass9'
        }, {
          target: '经营维度',
          condition: '近6或12个月的销项发票总额同比增长率',
          resultKey: "resultValue10",
          passKey: 'pass10'
        }, {
          target: '工商负面记录',
          condition: '经营异常情况',
          resultKey: "resultValue11",
          passKey: 'pass11'
        }, {
          target: '工商负面记录',
          condition: '严重违法情况',
          resultKey: "resultValue12",
          passKey: 'pass12'
        }, {
          target: '司法负面记录',
          condition: '申请人司法失信情况',
          resultKey: "resultValue13",
          passKey: 'pass13'
        }, {
          target: '司法负面记录',
          condition: '企业司法失信情况',
          resultKey: "resultValue14",
          passKey: 'pass14'
        }, {
          target: '税务负面记录',
          condition: '近12个月内企业违法违章情况',
          resultKey: "resultValue15",
          passKey: 'pass15'
        }, {
          target: '税务负面记录',
          condition: '近12个月内企业重大税收违法情况',
          resultKey: "resultValue16",
          passKey: 'pass16'
        }];
        tableData.map((item, key) => {
          item.value1 = data.content.acesData[item.resultKey];
          item.value2 = data.content.acesData[item.passKey];
        })
        this.tableData = tableData;
        this.content = data.content;
        console.log(this.content);
      },

      getReportErr(res) {
        console.log("请求失败");
        console.log(res);
      },
      getCreditResult() {
        let data = {
          "service": "reportService",
          "method": "getSxReport",
          "data": {
            "enterpriseName": "宁海县轩敏印刷厂",
            "type": 2
          },
        };
        this.$api.post('', data, this.getReportSuc, this.getrepoetErr, this.headers);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.report {
		padding: 20px;
		.report_title {
			width: 100%;
			height: 100px;
			.first_span {
				display: inline-block;
				width: 75%;
				height: 40px;
				font-size: 30px;
				line-height: 40px;
				font-weight: bold;
				color: #000000;
			}
			.second_span {
				display: inline-block;
				width: 100px;
				height: 40px;
				text-align: center;
				font-size: 16px;
				line-height: 40px;
				font-weight: bold;
				color: #1D8CE0;
			}
			.third_span {
				display: inline-block;
				width: 150px;
				height: 40px;
				line-height: 40px;
				font-size: 13px;
				font-weight: bold;
				color: #E4001B;
			}
			.report_span {
				width: 100%;
				height: 40px;
				background-color: #BBBEC4;
				font-size: 22px;
				font-weight: bold;
				line-height: 40px;
			}
		}

		.report_part1 {
			.company_apply {
				width: 100%;
				height: 20px;
				border-bottom: solid 3px #BBBBBB;
				font-size: 16px;
				font-weight: bold;
				line-height: 20px;
				position: relative;
				&:after {
					content: '';
					position: absolute;
					width: 120px;
					height: 3px;
					background: red;
					left: 0px;
					bottom: -3px;
				}
			}
			.part_product {
				margin-top: 20px;
			}
			.dot-right {
				display: inline-block;
				font-size: 0;
			    line-height: 0;
			    border-width: 7px;
			    border-color: black;
    			    border-right-width: 0;
				border-style: dashed;
			    border-left-style: solid;
			    border-top-color: transparent;
			    border-bottom-color: transparent;
				}
				.product {
					display: inline-block;
					width: 200px;
					height: 20px;
					line-height: 20px;
					font-size: 14px;
					font-weight: bold;
				}
			.first-row {
			  	margin-top: 10px;
			  }
		}
		.report_part2 {
			margin-top: 20px;
			.enter_evaluate {
				width: 100%;
				height: 20px;
				border-bottom: solid 3px #BBBBBB;
				font-size: 16px;
				font-weight: bold;
				line-height: 20px;
				position: relative;
				&:after {
					content: '';
					position: absolute;
					width: 120px;
					height: 3px;
					background: red;
					left: 0px;
					bottom: -3px;
				}
			}
		}
		.report_part3 {
			margin-top: 20px;
			.company_apply {
				width: 100%;
				height: 20px;
				border-bottom: solid 3px #BBBBBB;
				font-size: 16px;
				font-weight: bold;
				line-height: 20px;
				position: relative;
				&:after {
					content: '';
					position: absolute;
					width: 120px;
					height: 3px;
					background: red;
					left: 0px;
					bottom: -3px;
				}
			}
			.report_part3_result {
				width: 100%;
				height: 40px;
				margin: 20px 0;
				background-color: lightgoldenrodyellow;
				font-size: 18px;
				color: red;
				line-height: 40px;
			}
			.note {
				width: 100px;
				height: 30px;
				line-height: 30px;
				margin-top: 20px;
				font-size: 16px;
				font-weight: bold;
			}
			.note_content {
				width: 100%;
				margin-top: 20px;
				font-size: 14px;
				line-height: 20px;
				strong {
				  font-weight: bold;
				}
			}
		}
		.report_part4 {
			margin-top: 20px;
			.company_apply {
				width: 100%;
				height: 20px;
				border-bottom: solid 3px #BBBBBB;
				font-size: 16px;
				font-weight: bold;
				line-height: 20px;
				position: relative;
				&:after {
					content: '';
					position: absolute;
					width: 120px;
					height: 3px;
					background: red;
					left: 0px;
					bottom: -3px;
				}
			}
			.number_credit {
				width: 100%;
				margin-top: 20px;
				margin-bottom: 10px;
				padding-bottom: 10px;
				background-color: lightgoldenrodyellow;
				border: 1px solid yellow;
				p {
					width: 100%;
					font-size: 14px;
					margin-top: 10px;
				}
				span {
					color: red;
					font-weight: bold;
				}
			}
			.suggest_credit {
				width: 100%;
				height: 20px;
				padding: 5px 0;
				line-height: 20px;
				background-color: lightgoldenrodyellow;
				margin-bottom: 20px;
				span {
					color: red;
					font-weight: bold;
				}
			}
			.credit_table {
				width: 100%;
				th {
					background-color: #CCCCCC;
					width: 25%;
					height: 39px;
					font-weight: bold;
				}
				td {
					height: 39px;
					text-align: center;
				}
			}

			table tr td ,th {
				border: 1px solid #BBBBBB;
				vertical-align: middle;
			}
		}
	}
  .el-row {
    /*margin-bottom: 20px;*/
    &:last-child {
      /*margin-bottom: 0;*/
    }
  }
  .el-col {
    /*border-radius: 4px;*/
  }

  .bg-purple-title {
    background: #CCCCCC;
    font-weight: bold;
  }
  .bg-purple-value {
    background: #FFFFFF;
  }
  .credit-score {
  	color: red;
  	text-align: center;
  }
  .grid-content {
    min-height: 40px;
    line-height: 40px;
    padding-left: 10px;
    border-right: 0.5px solid #BBBBBB;
    border-bottom: 0.5px solid #BBBBBB;
  }
</style>
