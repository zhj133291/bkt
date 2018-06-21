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
				  <el-col :span="4"><div class="grid-content bg-purple-title">申请产品</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">爱税贷</div></el-col>
				  <el-col :span="4"><div class="grid-content bg-purple-title">申请时间</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">2018-01-30</div></el-col>
				</el-row>
			    <el-row>
				  <el-col :span="4"><div class="grid-content bg-purple-title">最高额度</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">100万元</div></el-col>
				  <el-col :span="4"><div class="grid-content bg-purple-title">银行信息</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">资金银行</div></el-col>
				</el-row>
				<el-row>
				  <el-col :span="4"><div class="grid-content bg-purple-title">担保方式</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">信用</div></el-col>
				  <el-col :span="4"><div class="grid-content bg-purple-title">利率</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">9.9%</div></el-col>
				</el-row>
				<el-row>
				  <el-col :span="4"><div class="grid-content bg-purple-title">贷款期限</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">12个月</div></el-col>
				  <el-col :span="4"><div class="grid-content bg-purple-title">还款方式</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">信息后本</div></el-col>
				</el-row>
    			</div>
    			<div class="part_product">
    				<div class="dot-right"></div>
    				<div class="product">申请人信息（已授权）</div>
				<el-row class="first-row">
				  <el-col :span="4"><div class="grid-content bg-purple-title">姓名</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">辰阔</div></el-col>
				  <el-col :span="4"><div class="grid-content bg-purple-title">申请人类型</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">法定代表人</div></el-col>
				</el-row>
			    <el-row>
				  <el-col :span="4"><div class="grid-content bg-purple-title">身份证号码</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">370384792873489237</div></el-col>
				  <el-col :span="4"><div class="grid-content bg-purple-title">联系电话</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">025-52857599</div></el-col>
				</el-row>
				<el-row>
				  <el-col :span="4"><div class="grid-content bg-purple-title">发卡银行</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">紫金银行</div></el-col>
				  <el-col :span="4"><div class="grid-content bg-purple-title">一类银行卡号</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">6637475345</div></el-col>
				</el-row>
    			</div>
    			<div class="part_product">
    				<div class="dot-right"></div>
    				<div class="product">所属企业信息</div>
				<el-row class="first-row">
				  <el-col :span="4"><div class="grid-content bg-purple-title">企业名称</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">辰阔科技</div></el-col>
				  <el-col :span="4"><div class="grid-content bg-purple-title">法定代表人</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">虞丽</div></el-col>
				</el-row>
			    <el-row>
				  <el-col :span="4"><div class="grid-content bg-purple-title">纳税人识别号</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">9183742398478327R</div></el-col>
				  <el-col :span="4"><div class="grid-content bg-purple-title">注册登记日期</div></el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-value">2015-05-10</div></el-col>
				</el-row>
				<el-row>
				  <el-col :span="4"><div class="grid-content bg-purple-title">经营地址</div></el-col>
				  <el-col :span="20"><div class="grid-content bg-purple-value">南京市雨花台区软件大道168号</div></el-col>
				</el-row>
				<el-row>
				  <el-col :span="4"><div class="grid-content bg-purple-title">经营范围</div></el-col>
				  <el-col :span="20"><div class="grid-content bg-purple-value">是电话费开奖号闪电借款粉红色的哭喊付款人速回复收</div></el-col>
				</el-row>
    			</div>
    		</div>
    	<div class="report_part2">
    		<div class="enter_evaluate">2.准入评估</div>
    		<div class="enter_table">
    			<el-table :data="tableData6" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
		      <el-table-column prop="target" label="准入指标" width="180"></el-table-column>
		      <el-table-column prop="condition" label="准入判别规则"></el-table-column>
		      <el-table-column prop="amount1" label="指标值"></el-table-column>
		      <el-table-column prop="amount2" label="是否符合"></el-table-column>
		    </el-table>
    		</div>
    	</div>
    	<div class="report_part3">
    		<div class="company_apply">3.企业信用评分</div>
    		<div class="report_part3_result">该企业信用评分为559.0分。评价等级B，该企业信用略差。</div>
    		<el-row>
			<el-col :span="4"><div class="grid-content bg-purple-title">成长指数</div></el-col>
			<el-col :span="8"><div class="grid-content bg-purple-value">600.88</div></el-col>
			<el-col :span="4"><div class="grid-content bg-purple-title">履约指数</div></el-col>
			<el-col :span="8"><div class="grid-content bg-purple-value">888.66</div></el-col>
		</el-row>
		<el-row>
			<el-col :span="4"><div class="grid-content bg-purple-title">信用评分</div></el-col>
			<el-col :span="20"><div class="grid-content bg-purple-value">600.88</div></el-col>
		</el-row>
    		
    		<p class="note">备注：</p>
    		<p class="note_content"><strong>成长指数</strong>&nbsp;&nbsp;通过预测未来企业一段时间的销售增长情况，评估企业未来一
    			段时间的经营状态，放映企业持续成长性，进而评估其偿债能力。（成长指数越高企业成长性越好，其偿债能力越强）交电话费开始就得混分巨兽开发商</p>
    		<p class="note_content"><strong>履约指数</strong>&nbsp;&nbsp;通过分析企业历史履约情况，评估企业履约意愿强弱以及未来潜在信用
    			风险的可能性，从而反映企业未来偿债意愿。（履约指数越高企业偿债意愿也越高）哈宽度和U盾花和尚的精神科肤色的哈回答就是点击啊的杀机大环境开始的科技啊稍等哈</p>
    		<p class="note_content"><strong>信用评分</strong>&nbsp;&nbsp;信用评分是由成长指数与履约指数综合而成，用来评估企业未来信用状况，
    			其评分越高，信用越好；反之，则越差</p>
    	</div>
    	<div class="report_part4">
    		<div class="company_apply">4.额度测算</div>
    		<div class="number_credit">
    			<p>最早开票日期：2013年4月5号 最晚开票日期：2018年1月30日</p>
    			<p>参与测算额度的销项发票：总金额：1168万元，总份数：1698份</p>
    			<p>其中有效发票共11177万元/1847份；作废发票共1843万元/273份；红冲发票-87564万元/3份</p>
    		</div>
    		<div class="suggest_credit">建议该企业授信额度为：408.99万元。</div>
    		<table border="1px solid #fff" cellspacing="0" cellpadding="0">
    			<tr>
    				<th>购方类型</th>
    				<th>客户数量</th>
    				<th>有效金额(万元)</th>
    				<th>可授信评估额(万元)</th>
  			</tr>
    			<tr>
    				<td>企业</td>
    				<td>207户</td>
    				<td>11166.00</td>
    				<td>503</td>
    			</tr>
    			<tr>
    				<td>个人</td>
    				<td>3人次</td>
    				<td>1.80</td>
    				<td>0.01</td>
    			</tr>
    			<tr>
    				<td colspan="2">合计</td>
    				<td>11688.9</td>
    				<td>610.28</td>
    			</tr>
    			<tr>
    				<td rowspan="2">建议授信额</td>
    				<td>信用评分</td>
    				<td>信用评分系数</td>
    			</tr>
    			<tr>
    				<td>559.30</td>
    				<td>0.67</td>
    				<td rowspan="2">610*1.1 = 408</td>
    			</tr>
    		</table>
    	</div>
    	
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
    		data() {
	      return {
	        tableData6: [{
	          target: '12987122',
	          condition: '王小虎',
	          amount1: '234',
	          amount2: '3.2'
	        }, {
	          target: '12987123',
	          condition: '王小虎',
	          amount1: '165',
	          amount2: '4.43'
	        }, {
	          target: '12987124',
	          condition: '王小虎',
	          amount1: '324',
	          amount2: '1.9'
	        }, {
	          target: '12987125',
	          condition: '王小虎',
	          amount1: '621',
	          amount2: '2.2'
	        }, {
	          target: '12987126',
	          condition: '王小虎',
	          amount1: '539',
	          amount2: '4.1'
	        }, {
	          target: '12987123',
	          condition: '王小虎',
	          amount1: '165',
	          amount2: '4.43'
	        }, {
	          target: '12987124',
	          condition: '王小虎',
	          amount1: '324',
	          amount2: '1.9'
	        }]
	      };
	    },
	    methods: {
	    		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
	        if (columnIndex === 0) {
	          if (rowIndex % 3 === 0) {
	            return {
	              rowspan: 3,
	              colspan: 1
	            };
	          } else {
	            return {
	              rowspan: 0,
	              colspan: 0
	            };
	          }
	        }
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
				margin-bottom: 20px;
				padding-bottom: 10px;
				background-color: lightgoldenrodyellow;
				border: 1px solid yellow;
				p {
					width: 100%;
					font-size: 14px;
					margin-top: 10px;
				}
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
  }
  .bg-purple-value {
    background: #FFFFFF;
  }
  .grid-content {
    min-height: 40px;
    line-height: 40px;
    padding-left: 10px;
    border-right: 0.5px solid #BBBBBB;
    border-bottom: 0.5px solid #BBBBBB;
  }
</style>
