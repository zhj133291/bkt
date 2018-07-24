<template>
	<div class="analysisContainer">
		<div class="dh">
			<span class='cancel'>统计分析</span>
		</div>
		<div class="title">
			<div></div>
			<span>统计分析</span>
		</div>

		<div class="search">
			<div class="search-content">
				<div>
					<label>申请时间</label>
					<el-date-picker v-model="startDate" :picker-options="pickerOptions0" type="date" placeholder="请选择开始时间" format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker> —
					<el-date-picker v-model="endDate" :picker-options="pickerOptions1" type="date" placeholder="请选择结束时间" format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker>
				</div>

				<div>
					<el-button type="primary" @click="getApplyReport()" style="margin-left: 50px; background: #3185ff; border-color: #3185ff;">查询</el-button>
					<el-button type="primary" @click="exportApplyReport()" style="background: #3185ff; border-color: #3185ff; margin-left: 10px;">导出</el-button>
				</div>
			</div>

		</div>

		<div class="acpTab">
			<el-table :data="tableData" node-key="id" style="width: 100%;" id="reportTable">
				<el-table-column prop="enterpriseName" label="企业名称" width="150"></el-table-column>
				<el-table-column prop="nsrsbh" label="纳税人识别号" width="150"></el-table-column>
				<el-table-column prop="serialNum" label="业务序列号" width="150"></el-table-column>
				<el-table-column prop="productName" label="申办产品" width="150"></el-table-column>
				<el-table-column prop="currentOperationPersonName" label="经办人员" width="150"></el-table-column>
				<el-table-column prop="currentOrganName" label="经办机构" width="150"></el-table-column>
				<el-table-column prop="loanLimit" label="申请额度（万元）" width="150"></el-table-column>

				<el-table-column prop="loanTerm" label="申请贷款期限（月）" width="150"></el-table-column>
				<el-table-column prop="applyTime" label="申请时间" width="150"></el-table-column>
				<el-table-column prop="send2BankTime" label="初审通过时间" width="150"></el-table-column>
				<el-table-column prop="lastIssueTime" label="最后分发时间" width="150"></el-table-column>
				<el-table-column prop="acceptTime" label="受理时间" width="150"></el-table-column>
				<el-table-column prop="overTime" label="是否超时" width="150"></el-table-column>
				<el-table-column prop="creditReportTime" label="授信上报时间" width="150"></el-table-column>
				<el-table-column prop="creditQuota" label="授信金额" width="150"></el-table-column>

				<el-table-column prop="creditTime" label="授信时间" width="150"></el-table-column>
				<el-table-column prop="loanedQuota" label="下款金额" width="150"></el-table-column>
				<el-table-column prop="firstLoanedTime" label="首次下款时间" width="150"></el-table-column>
				<el-table-column prop="balance" label="余额" width="150"></el-table-column>
				<el-table-column prop="statusName" label="当前状态" width="150"></el-table-column>
				<el-table-column prop="proposerName" label="申请人" width="150"></el-table-column>
				<el-table-column prop="proposerTelphone" label="申请人电话" width="150"></el-table-column>

			</el-table>

			<div class="page">
				<el-pagination background layout="prev, pager, next, total, jumper" :page-size="pageSize" :current-page.sync="currentPage" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="total"></el-pagination>
			</div>
		</div>

	</div>
</template>

<script>
	let axios = require('axios')
	var tableToExcel = (function() {

		var uri = 'data:application/vnd.ms-excel;base64,',

			template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',

			base64 = function(s) {

				return window.btoa(unescape(encodeURIComponent(s)))

			},

			format = function(s, c) {

				return s.replace(/{(\w+)}/g, function(m, p) {

					return c[p];

				})

			}

		return function(table, name) {

			if(!table.nodeType) table = document.getElementById(table);

			var ctx = {

				worksheet: name || 'Worksheet',

				table: table.innerHTML

			};

			window.location.href = uri + base64(format(template, ctx));

		}

	})();
	export default {
		data() {
			let currentPage = 1,
				total = 0;
			let params = this.$route.params;
			if(params && params.back) {
				currentPage = parseInt(sessionStorage.getItem("pageIndex"));
				total = parseInt(sessionStorage.getItem("total"));
			}
			let INFO = JSON.parse(sessionStorage.getItem('INFO'));
			return {
				startDate: "", //申请开始时间
				endDate: "", //申请结束时间
				headers: {
					client: '1',
					userId: INFO.userId,
					token: INFO.token
				},
				pickerOptions0: {
					disabledDate: (time) => {
						if(this.endDate != "") {
							return time.getTime() > Date.now() || time.getTime() > this.endDate;
						} else {
							return time.getTime() > Date.now();
						}
					}
				},
				pickerOptions1: {
					disabledDate: (time) => {
						return time.getTime() < this.startDate || time.getTime() > Date.now();
					}
				},
				pageIndex: 1,
				pageSize: 30,
				currentPage: currentPage,
				total: total,
				tableData: [],
				exportUrl: this.$api.getInterRootUrl() + "/gateway/export", //导出接口
			}
		},
		created() {
			this.getApplyReport();
		},
		methods: {
			getApplyReport() {
				var that = this;
				let data = {
					"service": "applyService",
					"method": "getApplyReport",
					"data": {
						"startDate": that.startDate,
						"endDate": that.endDate,
						"pageIndex": that.pageIndex,
						"pageSize": that.pageSize
					}
				};
				that.$api.post('', data, that.getApplyReportSuc, that.getApplyReportErr, that.headers);
			},
			getApplyReportSuc(data) {
				var that = this;
				data.reportList.map((item, k) => {
					item.applyTime = item.applyTime ? that.$utils.formatDate(item.applyTime,"yyyy-MM-dd") : "-";
					item.send2BankTime = item.send2BankTime ? that.$utils.formatDate(item.send2BankTime,"yyyy-MM-dd") : "-";
					item.lastIssueTime = item.lastIssueTime ? that.$utils.formatDate(item.lastIssueTime,"yyyy-MM-dd") : "-";
					item.acceptTime = item.acceptTime ? that.$utils.formatDate(item.acceptTime,"yyyy-MM-dd") : "-";
					item.creditReportTime = item.creditReportTime ? that.$utils.formatDate(item.creditReportTime,"yyyy-MM-dd") : "-";
					item.creditTime = item.creditTime ? that.$utils.formatDate(item.creditTime,"yyyy-MM-dd") : "-";
					item.firstLoanedTime = item.firstLoanedTime ? that.$utils.formatDate(item.firstLoanedTime,"yyyy-MM-dd") : "-";
					
					/*item.applyTime = item.applyTime ? that.$utils.timeFormat(item.applyTime) : "-";
					item.send2BankTime = item.send2BankTime ? that.$utils.timeFormat(item.send2BankTime) : "-";
					item.lastIssueTime = item.lastIssueTime ? that.$utils.timeFormat(item.lastIssueTime) : "-";
					item.acceptTime = item.acceptTime ? that.$utils.timeFormat(item.acceptTime) : "-";
					item.creditReportTime = item.creditReportTime ? that.$utils.timeFormat(item.creditReportTime) : "-";
					item.creditTime = item.creditTime ? that.$utils.timeFormat(item.creditTime) : "-";
					item.firstLoanedTime = item.firstLoanedTime ? that.$utils.timeFormat(item.firstLoanedTime) : "-";*/

				});
				that.tableData = data.reportList;
				that.total = data.totalNum;
			},
			getApplyReportErr(data) {
				/**
				 * 获取统计分析列表失败回调
				 */
				this.$message({
					message: data.returnMessage,
					type: 'warning'
				});
			},

			handleSizeChange: function(size) {
				/**
				 * 分页
				 */
				this.pagesize = size;
			},
			handleCurrentChange: function(currentPage) {
				/**
				 * 点击分页页数切换
				 */
				var that = this;
				that.currentPage = currentPage;
				let data = {
					"service": "applyService",
					"method": "getApplyReport",
					"data": {
						"startDate": "",
						"endDate": "",
						"pageIndex": that.currentPage,
						"pageSize": that.pageSize
					}
				};
				that.$api.post('', data, that.getApplyReportSuc, that.getApplyReportErr, that.headers);

			},
			exportApplyReport() {
				var that = this;
				axios.post(that.exportUrl, {
					"service": "applyService",
					"method": "exportApplyReport",
					"data": {
						"startDate": that.startDate,
						"endDate": that.endDate
					}
				}, {
					responseType: 'blob',
					headers: that.headers
				}).then(res => {
					let blob = new Blob([res.data], {
						type: "application/vnd.ms-excel;charset=utf-8"
					});

					that.saveAs(blob, "统计分析报表.xls");
				})
			},

			saveAs(blob, filename) {
				if(window.navigator.msSaveOrOpenBlob) {
					navigator.msSaveBlob(blob, filename);
				} else {
					const link = document.createElement('a');
					const body = document.querySelector('body');

					link.href = window.URL.createObjectURL(blob);
					link.download = filename;

					// fix Firefox
					link.style.display = 'none';
					body.appendChild(link);

					link.click();
					body.removeChild(link);

					window.URL.revokeObjectURL(link.href);
				}
			},
			exportApplyReportSuc(data) {
				var that = this;
				console.log(data);

			},
			exportApplyReportErr(data) {
				var that = this;
				console.log(data);
			}
		}

	};
</script>

<style lang="stylus" scoped>
	.analysisContainer {
		.dh {
			padding-left: 24px;
			width: 100%;
			height: 47px;
			background-color: rgba(240, 241, 248, 1);
			.cancel {
				cursor: pointer;
			}
			span {
				height: 47px;
				line-height: 47px;
				font-size: 14px;
				color: @gy;
			}
		}
		.title {
			height: 55px;
			line-heihgt: 55px;
			padding-left: 24px;
			div {
				margin-top: 20px;
				width: 3px;
				height: 13px;
				background-color: rgba(49, 133, 255, 1);
				float: left;
			}
			span {
				display: inline-block;
				margin-top: 20px;
				margin-left: 7px;
				font-size: 13px;
				color: @gy;
			}
		}
		.search {
			margin: 0 24px;
			padding: 15px 28px;
			background: #ffffff;
			.search-content {
				padding: 10px 0;
				&>div {
					display: inline-block;
					margin-right: 10px;
					margin-bottom: 10px;
					&>label {
						font-size: 14px;
						color: #363f45;
						margin-right: 10px;
					}
					&>input {
						width: 180px;
						height: 28px;
						padding 0 15px;
						font-size: 14px;
						color: #363f45;
						margin-right: 10px;
						border: 1px solid #eaeaea;
					}
				}
				&>div:last-child {
					margin-right: 0px;
				}
			}
		}
		.acpTab {
			margin: 15px 24px;
			background: #ffffff;
			.acpTitle {
				font-size: 14px;
				color: #363f45;
				border-bottom 2px solid #e8e8e8;
				padding 20px 28px;
				.detail {
					display: inline-block;
					width: 70%;
				}
				.status {
					display: inline-block;
					width: 20%;
				}
				.operate {
					display: inline-block;
				}
			}
			.acpContent {
				padding: 12px 0 20px 28px;
				border-bottom 1px solid #eaeaea;
				&:last-child {
					border-bottom none;
				}
				.apply {
					font-size: 14px;
					line-height: 0;
					letter-spacing: 0;
					color: #363f45;
					padding-bottom: 12px;
					border-bottom 1px solid #eaeaea;
					&>i {
						width: 2px;
						height: 12px;
						background: #3185ff;
						display: inline-block;
					}
					.serial {
						display: inline-block;
						padding-left: 10px;
					}
					.appTime {
						display: inline-block;
						padding-left: 60px;
					}
					.pushTime {
						display: inline-block;
						padding-left: 60px;
					}
				}
				.company {
					font-size: 14px;
					color: #363f45;
					padding-top: 20px;
					&>img {
						width: 20px;
						height: 20px;
						vertical-align: middle;
					}
					.pod {
						display: inline-block;
						padding-left: 4px;
					}
					.comp {
						display: inline-block;
						padding-left: 30px;
					}
					.num {
						display: inline-block;
						padding-left: 45px;
					}
				}
				.loan {
					font-size: 14px;
					letter-spacing: 0;
					color: #363f45;
					padding: 38px 0 20px 0;
					.quota {
						display: inline-block;
						width: 34%;
					}
					.term {
						display: inline-block;
						width: 34%;
					}
					.now {
						display: inline-block;
						width: 19%;
					}
					.edit {
						display: inline-block;
						&:hover {
							color: #3185ff;
							text-decoration: underline;
							cursor: pointer;
						}
					}
				}
			}
			.page {
				text-align: center;
				padding: 15px;
			}
		}
	}
</style>