<template>
	<div>
		<div class="bkt_customerDetailContent">
			<div class="dh">
				<span class='cancel'>客户管理 &gt;客户管理详情</span>
			</div>
			<div class="title">
				<div></div>
				<span>客户管理</span>
				<span class="list_h" @click='back' style="float: right; margin-right: 30px; cursor:pointer">返回客户管理列表&gt;&gt;</span>
			</div>
			<div class="customerInfo">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="跟踪信息" name="first">
						<div class="track">
							<el-table :data="track" style="width: 100%">
								<el-table-column prop="handleTime" label="时间" width="180"></el-table-column>
								<el-table-column prop="handleDesc" label="当前状态" width="180"></el-table-column>
								<el-table-column prop="organName" label="处理机构"></el-table-column>
								<el-table-column prop="handlerName" label="处理人"></el-table-column>
								<el-table-column prop="handleText" label="处理详情"></el-table-column>
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
										<div><label>产品名称：</label>{{productProfile.name}}</div>
										<div><label>所属银行股：</label>{{productProfile.provider}}</div>
									</div>
									<div>
										<div><label>最高额度：</label>{{productProfile.maximum}}万元</div>
										<div><label>还款期限：</label>{{productProfile.repaymentTerm}}个月</div>
										<div><label>年利率：</label>{{productProfile.rate}}</div>
										<div><label>担保方式：</label>{{productProfile.guarantee}}</div>
									</div>
								</div>
							</div>
							<div class="apply">
								<div class="applyInfo">申请信息</div>
								<div class="info">
									<div>
										<div><label>业务序列号：</label>{{apply.serialNum}}</div>
										<div><label>提交时间：</label>{{apply.applyTime}}</div>
										<div><label>贷款金额：</label>{{apply.loanLimit}}万元</div>
										<div><label>贷款期限：</label>{{apply.loanTerm}}个月</div>
									</div>
									<div>
										<div><label>企业名称：</label>{{apply.enterpriseName}}</div>
										<div><label>税号：</label>{{apply.nsrsbh}}</div>
										<div><label>申请人姓名：</label>{{apply.proposerName}}</div>
										<div><label>申请人手机号：</label>{{apply.proposerTelphone}}</div>
									</div>
									<div>
										<div><label>申请人身份证号：</label>{{apply.proposerId}}</div>
										<div><label>申请人类型：</label>{{apply.proposerType}}</div>
										<div><label>他行贷款金额：</label>{{apply.otherBankLoan}}万元</div>
										<div><label>我行贷款金额：</label>{{apply.ourBankLoan}}万元</div>
									</div>
									<div>
										<div><label>对外担保金额：</label>{{apply.externalGuarantee}}万元</div>
										<div><label>关联企业现有贷款金额：</label>{{apply.affiliatedEnterpriseLoan}}万元</div>
										<div><label>个人经营性贷款金额：</label>{{apply.personalManagementLoan}}万元</div>
										<div><label>营销推荐代码：</label>{{apply.serialNum}}</div>
									</div>
								</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="授信下款信息" name="third" v-if="creditTab">
						<div class="credit" v-show="creditTab">
							<div class="credit-content">
								<div class="creditInfo">授信下款信息</div>
								<div class="info">
									<div>
										<div><label>授信额度：</label>{{credit.creditQuota}}万元</div>
										<div><label>授信期限：</label>{{credit.creditTerm}}个月</div>
										<div><label>授信时间：</label>{{credit.creditTime}}</div>
									</div>
									<div>
										<div><label>下款金额：</label>{{credit.loanedQuota}}万元</div>
										<div style="width: 50%;"><label>最近下款时间：</label>{{credit.loanedTime}}</div>
									</div>
								</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="企业资料" name="forth" v-if="companyInfo">
						<div class="applyInfo" v-show="companyInfo">
							<div class="applyContent">
								<div class="applyli"  v-if="handleApplyUploadList(1)">
									<div class="applytitle">1、企业三证合一的营业执照副本（带二维码页）</div>
									<div class="applyList">
										<div class="mblicence clearfix">
											<div class="mblicenceLeft" data-index="0" v-if="handleFileList(1).length>0">
												<img v-bind:src="handleFileList(1)[0].url" v-if="handleFileList(1).length>0" @click="openImage($event,handleFileList(1)[0].url)" />
											</div>

											<div class="mblicenceLeft" data-index="0" v-if="handleFileList(1).length<=0">
												<img src="./mblicenceIcon.png" v-if="handleFileList(1).length<=0" style="cursor: default;" />
												<div class="mblicenceTip">未上传</div>
											</div>

										</div>
									</div>
								</div>
								<div class="applyli"  v-if="handleApplyUploadList(2)">
									<div class="applytitle">2、法定代表人及配偶身份证</div>
									<div class="applyList">
										<div class="legalPerson clearfix">
											<div class="legalPersonli">
												<div class="img_div" v-if="handleFileList(2).length>0" data-index="0">
													<img v-bind:src="handleFileList(2)[0].url" v-if="handleFileList(2).length>0" @click="openImage($event,handleFileList(2)[0].url)" />
												</div>
												<div class="img_div" v-if="handleFileList(2).length<=0">
													<img src="./idCardFace.png" />
												</div>
												<div class="legalPersonTip">法人身份证（头像面）<span v-if="handleFileList(2).length<=0">--未上传</span></div>
											</div>
											<div class="legalPersonli">

												<div class="img_div" v-if="handleFileList(3).length>0" data-index="0">
													<img v-bind:src="handleFileList(3)[0].url" v-if="handleFileList(3).length>0" @click="openImage($event,handleFileList(3)[0].url)" />
												</div>
												<div class="img_div" v-if="handleFileList(3).length<=0">
													<img src="./idCardSide.png" />
												</div>

												<div class="legalPersonTip">法人身份证（国徽面）<span v-if="handleFileList(3).length<=0">--未上传</span></div>
											</div>
											<div class="legalPersonli">

												<div class="img_div" v-if="handleFileList(4).length>0" data-index="0">
													<img v-bind:src="handleFileList(4)[0].url" v-if="handleFileList(4).length>0" @click="openImage($event,handleFileList(4)[0].url)" />
												</div>

												<div class="img_div" v-if="handleFileList(4).length<=0">
													<img src="./idCardFace.png" />
												</div>

												<div class="legalPersonTip">法人配偶身份证（头像面）<span v-if="handleFileList(4).length<=0">--未上传</span></div>
											</div>
											<div class="legalPersonli">

												<div class="img_div" v-if="handleFileList(5).length>0" data-index="0">
													<img v-bind:src="handleFileList(5)[0].url" v-if="handleFileList(5).length>0" @click="openImage($event,handleFileList(5)[0].url)" />
												</div>

												<div class="img_div" v-if="handleFileList(5).length<=0">
													<img src="./idCardSide.png" />
												</div>

												<div class="legalPersonTip">法人配偶身份证（国徽面）<span v-if="handleFileList(5).length<=0">--未上传</span></div>
											</div>

										</div>
									</div>
								</div>
								<div class="applyli"  v-if="handleApplyUploadList(3)">
									<div class="applytitle">3、实际控制人及配偶身份证</div>
									<div class="applyList">
										<div class="legalPerson clearfix">
											<div class="legalPersonli">

												<div class="img_div" v-if="handleFileList(6).length>0" data-index="0">
													<img v-bind:src="handleFileList(6)[0].url" v-if="handleFileList(6).length>0" @click="openImage($event,handleFileList(6)[0].url)" />
												</div>

												<div class="img_div" v-if="handleFileList(6).length<=0">
													<img src="./idCardFace.png" />
												</div>

												<div class="legalPersonTip">实际控制人身份证（头像面）<span v-if="handleFileList(6).length<=0">--未上传</span></div>
											</div>
											<div class="legalPersonli">

												<div class="img_div" v-if="handleFileList(7).length>0" data-index="0">
													<img v-bind:src="handleFileList(7)[0].url" v-if="handleFileList(7).length>0" @click="openImage($event,handleFileList(7)[0].url)" />
												</div>
												<div class="img_div" v-if="handleFileList(7).length<=0">
													<img src="./idCardSide.png" />
												</div>

												<div class="legalPersonTip">实际控制人身份证（国徽面）<span v-if="handleFileList(7).length<=0">--未上传</span></div>
											</div>
											<div class="legalPersonli">

												<div class="img_div" v-if="handleFileList(8).length>0" data-index="0">
													<img v-bind:src="handleFileList(8)[0].url" v-if="handleFileList(8).length>0" @click="openImage($event,handleFileList(8)[0].url)" />
												</div>

												<div class="img_div" v-if="handleFileList(8).length<=0">
													<img src="./idCardFace.png" />
												</div>

												<div class="legalPersonTip">实际控制人配偶身份证（头像面）<span v-if="handleFileList(8).length<=0">--未上传</span></div>
											</div>
											<div class="legalPersonli">

												<div class="img_div" v-if="handleFileList(9).length>0" data-index="0">
													<img v-bind:src="handleFileList(9)[0].url" v-if="handleFileList(9).length>0" @click="openImage($event,handleFileList(9)[0].url)" />
												</div>
												<div class="img_div" v-if="handleFileList(9).length<=0">
													<img src="./idCardSide.png" />
												</div>

												<div class="legalPersonTip">实际控制人配偶身份证（国徽面）<span v-if="handleFileList(9).length<=0">--未上传</span></div>
											</div>

										</div>
									</div>
								</div>
								<div class="applyli"  v-if="handleApplyUploadList(4)">
									<div class="applytitle">4、企业2年内的报表（资产负债表、企业利润表）</div>
									<div class="applyList">
										<div class="applyUploadList">
											<div class="applyUploadLi clearfix">
												<div class="applyUploadTip">企业今年年度资产负债表</div>
												<!--<el-upload class="applyUploadContent" v-if="handleFileList(10).length>0" accept=".wps,.WPS,.xls,.XLS,.xlsx,.XLSX,.doc,.DOC,.docx,.DOCX.pdf,.PDF" :action="uploadUrl" :beforeUpload="beforeXMLUpload" :http-request="(file)=>uploadSectionFile(file,10)" :file-list="handleFileList(10)" :on-preview="previewFile">
												</el-upload>-->
												<div class="applyUploadShowTip" v-if="handleFileList(10).length>0" @click="previewFile(handleFileList(10)[0])">查看</div>
												<div class="applyUploadNoneTip" v-if="handleFileList(10).length<=0">未上传</div>
											</div>
											<div class="applyUploadLi clearfix">
												<div class="applyUploadTip">企业今年年度企业利润表</div>
												<!--<el-upload class="applyUploadContent" v-if="handleFileList(11).length>0" accept=".wps,.WPS,.xls,.XLS,.xlsx,.XLSX,.doc,.DOC,.docx,.DOCX.pdf,.PDF" :action="uploadUrl" :beforeUpload="beforeXMLUpload" :http-request="(file)=>uploadSectionFile(file,11)" :file-list="handleFileList(11)" :on-preview="previewFile">
												</el-upload>-->
												<div class="applyUploadShowTip" v-if="handleFileList(11).length>0" @click="previewFile(handleFileList(11)[0])">查看</div>
												<div class="applyUploadNoneTip" v-if="handleFileList(11).length<=0">未上传</div>
											</div>

											<div class="applyUploadLi clearfix">
												<div class="applyUploadTip">企业去年年度资产负债表</div>
												<!--<el-upload class="applyUploadContent"  v-if="handleFileList(12).length>0" accept=".wps,.WPS,.xls,.XLS,.xlsx,.XLSX,.doc,.DOC,.docx,.DOCX.pdf,.PDF" :action="uploadUrl" :beforeUpload="beforeXMLUpload" :http-request="(file)=>uploadSectionFile(file,12)" :file-list="handleFileList(12)" :on-preview="previewFile">
												</el-upload>-->
												<div class="applyUploadShowTip" v-if="handleFileList(12).length>0" @click="previewFile(handleFileList(12)[0])">查看</div>
												<div class="applyUploadNoneTip" v-if="handleFileList(12).length<=0">未上传</div>
											</div>
											<div class="applyUploadLi clearfix">
												<div class="applyUploadTip">企业去年年度企业利润表</div>
												<!--<el-upload class="applyUploadContent"  v-if="handleFileList(13).length>0" accept=".wps,.WPS,.xls,.XLS,.xlsx,.XLSX,.doc,.DOC,.docx,.DOCX.pdf,.PDF" :action="uploadUrl" :beforeUpload="beforeXMLUpload" :http-request="(file)=>uploadSectionFile(file,13)" :file-list="handleFileList(13)" :on-preview="previewFile">
												</el-upload>-->
												<div class="applyUploadShowTip" v-if="handleFileList(13).length>0" @click="previewFile(handleFileList(13)[0])">查看</div>
												<div class="applyUploadNoneTip" v-if="handleFileList(13).length<=0">未上传</div>
											</div>

										</div>
									</div>
								</div>
								<div class="applyli"  v-if="handleApplyUploadList(5)">
									<div class="applytitle">5、企业征信报告</div>
									<div class="applyList">
										<div class="applyUploadList">
											<div class="applyUploadLi clearfix">
												<div class="applyUploadTip">企业征信报告</div>
												<!--<el-upload class="applyUploadContent" v-if="handleFileList(14).length>0" accept=".wps,.WPS,.xls,.XLS,.xlsx,.XLSX,.doc,.DOC,.docx,.DOCX.pdf,.PDF" :action="uploadUrl" :beforeUpload="beforeXMLUpload" :http-request="(file)=>uploadSectionFile(file,14)" :file-list="handleFileList(14)" :on-preview="previewFile">
												</el-upload>-->
												<div class="applyUploadShowTip" v-if="handleFileList(14).length>0" @click="previewFile(handleFileList(14)[0])">查看</div>
												<div class="applyUploadNoneTip" v-if="handleFileList(14).length<=0">未上传</div>
											</div>

										</div>
									</div>
								</div>

							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>

			<div class="opt">
				<div class="lt">
					<div v-if="suspend != undefined && suspend != ''">
						<el-button @click="optBtn(suspend.code)" style="margin-left: 25px; border: 1px solid #b7b7b7; color: #777777; background: #f0f1f8;">{{suspend.detail}}</el-button>
					</div>
				</div>
				<div class="rt">
					<div v-if="proceed != ''" v-for="(item,index) in proceed" :key="index" style="float: left; margin-left: 10px;">
						<el-button type="primary" @click="optBtn(item.code)" style="background: #3185ff; border-color: #3185ff; margin-left: 10px;">{{item.detail}}</el-button>
					</div>
				</div>
			</div>
		</div>

		<div class="mask" v-show="distribute">
			<div class="pop-box">
				<div class="title">分发<i @click="cancel()"></i></div>
				<div class="issue_content">
					<div class="issue">
						<label><span class='red'>*</span>分发银行及人员</label>
						<div>
							<el-select v-model="bankName" placeholder="请选择">
								<el-option v-for="(item, key) in bankIssue" :key="key" :label="item.bankName" :value="item.bankId"></el-option>
							</el-select>
						</div>
						<label style="width: 110px;"></label>
						<div>
							<el-select v-model="nick" placeholder="请选择">
								<el-option v-for="(item, key) in bankNick" :key="key" :label="item.userName" :value="item.userId"></el-option>
							</el-select>
						</div>
					</div>
					<p v-if="issueTip" class="red">*{{issueErr}}</p>
				</div>
				<div class="btn">
					<div>
						<el-button type="text" @click="cancel()">取消</el-button>
						<el-button type="primary" @click="fixedBtn()" style="background: #3185ff; border-color: #3185ff; margin-left: 10px;">确定</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="mask" v-show="receive">
			<div class="pop-box">
				<div class="title">受理<i @click="cancel()"></i></div>
				<div class="receive_content">
					<label>备注</label>
					<div>
						<textarea v-model="receiveText" @focus='removeTip("receiveTip")' cols="36" rows="10" maxlength=100 style="border: 1px solid #eaeaea; padding: 2px;"></textarea>
						<p v-if="receiveTip" class="red">*{{receiveErr}}</p>
					</div>
				</div>
				<div class="btn">
					<div>
						<el-button type="text" @click="cancel()">取消</el-button>
						<el-button type="primary" @click="receiveBtn()" style="background: #3185ff; border-color: #3185ff; margin-left: 10px;">确定</el-button>
					</div>
				</div>
			</div>
		</div>

		<div class="mask" v-show="feedback">
			<div class="pop-box">
				<div class="title">企业反馈<i @click="cancel()"></i></div>
				<div class="receive_content">
					<label><span class="red">*</span>企业反馈</label>
					<div>
						<textarea v-model="feedbackText" @focus='removeTip("feedbackTip")' maxlength=100 cols="36" rows="10" style="border: 1px solid #eaeaea; padding: 2px;"></textarea>
						<p v-if="feedbackTip" class="red">*{{feedbackErr}}</p>
					</div>
				</div>
				<div class="btn">
					<div>
						<el-button type="text" @click="cancel()">取消</el-button>
						<el-button type="primary" @click="feedbackBtn()" style="background: #3185ff; border-color: #3185ff; margin-left: 10px;">确定</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="mask" v-show="creditReport">
			<div class="pop-box">
				<div class="title">授信上报<i @click="cancel()"></i></div>
				<div class="receive_content">
					<label><span class="red">*</span>授信上报</label>
					<div>
						<textarea v-model="creditReportText" @focus='removeTip("creditReportTip")' cols="36" rows="10" style="border: 1px solid #eaeaea; padding: 2px;"></textarea>
						<p v-if="creditReportTip" class="red">*{{creditReportErr}}</p>
					</div>
				</div>
				<div class="btn">
					<div>
						<el-button type="text" @click="cancel()">取消</el-button>
						<el-button type="primary" @click="creditReportBtn()" style="background: #3185ff; border-color: #3185ff; margin-left: 10px;">确定</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="mask" v-show="credited">
			<div class="pop-box">
				<div class="title">授信<i @click="cancel()"></i></div>
				<div class="credited_content">
					<div>
						<label><span class="red">*</span>授信额度</label>
						<input type="text" maxlength=5 @keyup='edReplace($event)' @focus='removeTip("sxedTip")' v-model="sxed"><span class="txt_t">万元</span>
					</div>
					<p v-if="sxedTip" class="red">*{{sxedErr}}</p>
					<div>
						<label><span class="red">*</span>授信期限</label>
						<input type="text" maxlength=3 @keyup='qxReplace($event)' @focus='removeTip("sxqxTip")' v-model="sxqx"><span class="txt_t">个月</span>
					</div>
					<p v-if="sxqxTip" class="red">*{{sxqxErr}}</p>
				</div>
				<div class="btn">
					<div>
						<el-button type="text" @click="cancel()">取消</el-button>
						<el-button type="primary" @click="creditedBtn()" style="background: #3185ff; border-color: #3185ff; margin-left: 10px;">确定</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="mask" v-show="stop">
			<div class="pop-box">
				<div class="title">终止<i @click="cancel()"></i></div>
				<div class="stop_content">
					<div>
						<div class="lab"><span class="red">*</span>终止原因</div>
						<div class="labs">
							<el-select v-model="stopReason" placeholder="请选择">
								<el-option v-for="(item, key) in stopReasonArr" :key="key" :label="item.suspendDesc" :value="item.suspendStatus"></el-option>
							</el-select>
						</div>
					</div>
					<div>
						<div class="lab" style="vertical-align: top;">备注</div>
						<textarea class="labs" v-model="reasonText" cols="36" maxlength="100" rows="10" style="border: 1px solid #eaeaea; padding: 2px;"></textarea>
					</div>
					<div>
						<p v-if="reasonTip" class="red">*{{reasonErr}}</p>
					</div>
				</div>
				<div class="btn">
					<div>
						<el-button type="text" @click="cancel()">取消</el-button>
						<el-button type="primary" @click="stopBtn()" style="background: #3185ff; border-color: #3185ff; margin-left: 10px;">确定</el-button>
					</div>
				</div>
			</div>
		</div>

		<div class="mask" v-show="sendMoney">
			<div class="pop-box">
				<div class="title">下款<i @click="cancel()"></i></div>
				<div class="sendMoney_content">
					<div>
						<label><span class="red">*</span>下款额度</label>
						<input type="text" maxlength=5 @keyup='edReplace($event)' @focus='removeTip("xkedTip")' v-model="xked"><span class="txt">万元</span>
					</div>
					<p v-if="xkedTip" class="red">*{{xkedErr}}</p>
					<div>
						<label><span class="red">*</span>下款时间</label>
						<el-date-picker v-model="xksj" @focus='removeTip("xksjTip")' style="margin-left: 10px;" :picker-options="pickerOptions0" type="date" placeholder="请选择开始时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
					</div>
					<p v-if="xksjTip" class="red">*{{xksjErr}}</p>
				</div>
				<div class="btn">
					<div>
						<el-button type="text" @click="cancel()">取消</el-button>
						<el-button type="primary" @click="sendMoneyBtn()" style="background: #3185ff; border-color: #3185ff; margin-left: 10px;">确定</el-button>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import fancyBox from 'vue-fancybox';
	let Base64 = require('js-base64').Base64
	let axios = require('axios')
	export default {
		inject: ['reload'],
		data() {
			let INFO = JSON.parse(sessionStorage.getItem('INFO'));
			return {
				loanLimit: 0,
				applyInfo: this.$route.query,
				apply: [],
				productProfile: [],
				track: [],
				credit: {},
				suspend: '',
				proceed: [],
				bankIssue: [],
				bankNick: [],
				activeName: 'first',
				guarantee: {
					1: '信用',
					2: '保证',
					3: '抵押',
					4: '质抵',
					5: '其他'
				},
				headers: {
					client: '1',
					userId: INFO.userId,
					token: INFO.token
				},
				creditQuota: '',
				creditTab: false,
				companyInfo: false,
				distribute: false,
				bankName: '',
				nick: '',
				issueErr: '',
				issueTip: false,
				receive: false,
				receiveTip: false,
				receiveErr: '',
				receiveText: '',
				feedback: false,
				feedbackText: '',
				feedbackTip: false,
				feedbackErr: '',
				creditReport: false,
				creditReportText: '',
				creditReportTip: false,
				creditReportErr: '',
				credited: false,
				sxed: '',
				sxedTip: false,
				sxedErr: '',
				sxqx: '',
				sxqxTip: false,
				sxqxErr: '',
				stop: false,
				stopReason: '',
				reasonText: '',
				reasonTip: false,
				reasonErr: '',
				sendMoney: false,
				xked: '',
				xkedTip: false,
				xkedErr: '',
				xksj: '',
				xksjTip: false,
				xksjErr: '',
				pickerOptions0: {
					disabledDate: (time) => {
						if(this.xksj != "") {
							return time.getTime() > Date.now() || time.getTime() > this.xksj;
						} else {
							return time.getTime() > Date.now();
						}
					}
				},
				stopReasonArr: [],
				uploadUrl: this.$api.getRootUrl() + "/fileController/upload",
				downloadUrl: this.$api.getRootUrl() + "/fileController/download",
				getApplyFilesUrl: this.$api.getRootUrl() + "/fileController/getApplyFiles",
				deleteUrl: this.$api.getRootUrl() + "/fileController/delete",
				allFileList: [],
				xmlUrl: "",
				enterpriseName: "",
				productId: "",
				showApplyUploadList: []
			};
		},
		created() {
			this.$utils.goTop();
			/*	ZLBC(1, "资料保存"),
					CX(2, "撤销"),
					YHSQ(3, "用户申请"),
					CSTG(4, "初审通过"),
					CSWTG(5, "初审未通过"),
					YSL(6, "已受理"),
					WSL(7, "未受理"),
					SXSB(8, "授信上报"),
					YSX(9, "已授信"),
					WSX(10, "未授信");*/
			this.getBaseInfo();
			this.getTrackInfo();
			let params = this.$route.query;
			this.productId = params.productId;
			this.getUserApplyUploadListByProductId(); //针对不同产品勾选所需不同的资料，在客户详情页中展示不同的项
		},
		watch: {
			bankName(curVal, oldVal) {
				this.issueErr = '';
				this.issueTip = false;
				this.nick = '';
				let data = {
					"service": "officerService",
					"method": "getOfficerByBank",
					"data": {
						bankId: curVal
					}
				};
				this.$api.post('', data, this.getNickInfoSuc, this.getNickInfoErr, this.headers);
			},
			nick(curVal, oldVal) {
				this.issueErr = '';
				this.issueTip = false;
			},
		},
		methods: {
			getBaseInfo() {
				let data = {
					"service": "applyService",
					"method": "getBaseData",
					"data": {
						applySerial: this.applyInfo.serialNum
					}
				};
				this.$api.post('', data, this.getBaseInfoSuc, this.getBaseInfoErr, this.headers);
			},
			getTrackInfo() {
				let data = {
					"service": "applyService",
					"method": "getHandleHistory",
					"data": {
						applySerial: this.applyInfo.serialNum
					}
				};
				this.$api.post('', data, this.getTrackInfoSuc, this.getTrackInfoErr, this.headers);
			},
			getButton() {
				let data = {
					"service": "applyService",
					"method": "getHandleButton",
					"data": {
						applySerial: this.applyInfo.serialNum
					}
				};
				this.$api.post('', data, this.getButtonInfoSuc, this.getButtonInfoErr, this.headers);
			},
			getCreditInfo() {
				let data = {
					"service": "applyService",
					"method": "getCreditInfo",
					"data": {
						applySerial: this.applyInfo.serialNum
					}
				};
				this.$api.post('', data, this.getCreditInfoSuc, this.getCreditInfoErr, this.headers);
			},
			getBaseInfoSuc(data) {
				let params = data.apply;
				if(params.statusCode == '9') {
					this.getCreditInfo();
					this.creditTab = true;
				}
				if(params.statusCode == '4' || params.statusCode == '6' || params.statusCode == '8') {
					console.log("123123");
					this.creditTab = false;
				}
				this.getButton();
				if(params.statusCode != '1' && params.statusCode != '2' && params.statusCode != '3' && params.statusCode != '5') {
					this.enterpriseName = params.enterpriseName;
					this.getApplyFiles();
				}
				this.loanLimit = params.loanLimit;
				/*data.apply.applyTime = data.apply.applyTime != null ? this.$utils.timeFormat(data.apply.applyTime) : '-';
				data.apply.sxTime = data.apply.sxTime != null ? this.$utils.timeFormat(data.apply.sxTime) : '-';
				data.apply.sendToBankTime = data.sendToBankTime != null ? this.$utils.timeFormat(data.apply.sendToBankTime) : '-';*/
				
				data.apply.applyTime = data.apply.applyTime != null ? this.$utils.formatDate(data.apply.applyTime,"yyyy-MM-dd hh:mm") : '-';
				data.apply.sxTime = data.apply.sxTime != null ? this.$utils.formatDate(data.apply.sxTime,"yyyy-MM-dd hh:mm") : '-';
				data.apply.sendToBankTime = data.sendToBankTime != null ? this.$utils.formatDate(data.apply.sendToBankTime,"yyyy-MM-dd hh:mm") : '-';
				
				data.apply.logoPath = this.$utils.imgURL.img + data.apply.logoPath;
				data.apply.proposerType = data.apply.proposerType == 1 ? '法定代表人' : '最大控股自然人',
					this.apply = data.apply;
				let guarantee = data.product.guarantee.split(',');
				let str = '';
				let me = this;
				let len = guarantee.length;
				guarantee.map((item, index) => {
					str += me.guarantee[guarantee[index]];
					if(index < len - 1) {
						str += '、';
					}
				});
				data.product.rate = (data.product.rateFrom || '9') + '%' + (data.product.rateTo ? '~' + data.product.rateTo + '%' : '');
				data.product.guarantee = str;
				this.productProfile = data.product;
			},
			getBaseInfoErr(data) {

			},
			getTrackInfoSuc(data) {
				data.map((item, k) => {
					//item.handleTime = this.$utils.timeFormat(item.handleTime);
					item.handleTime =item.handleTime?this.$utils.formatDate(item.handleTime,"yyyy-MM-dd hh:mm"):"-";
				});
				this.track = data;
			},
			getTrackInfoErr(data) {
				console.log(data);
			},
			getCreditInfoSuc(data) {
				console.log(data);
				this.creditQuota = data.creditQuota
				data.loanedQuota = data.loanedQuota != null ? data.loanedQuota : '-'
				/*data.creditTime = data.creditTime != null ? this.$utils.timeFormat(data.creditTime) : '-';
				data.loanedTime = data.loanedTime != null ? this.$utils.timeFormat(data.loanedTime) : '-';*/
				data.creditTime = data.creditTime != null ? this.$utils.formatDate(data.creditTime,"yyyy-MM-dd hh:mm") : '-';
				data.loanedTime = data.loanedTime != null ? this.$utils.formatDate(data.loanedTime,"yyyy-MM-dd") : '-';
				this.credit = data;
			},
			getCreditInfoErr(data) {
				console.log(data);
			},
			getButtonInfoSuc(data) {
				console.log(data);
				this.proceed = data.proceed;
				this.suspend = data.suspend;
			},
			getButtonInfoErr(data) {
				console.log(data);
			},
			getBranchInfoSuc(data) {
				let org = {};
				org.bankId = data.bankId;
				org.bankLevel = data.bankLevel;
				org.bankName = data.bankName;
				data.branchList.unshift(org);
				this.bankIssue = data.branchList;
			},
			getNickInfoErr(data) {
				console.log(data);
			},
			getIssueSuc(data) {
				console.log(data);
				this.reload();
				this.cancel();
			},
			getBranchInfoErr(data) {
				console.log(data);
			},
			getNickInfoSuc(data) {
				this.bankNick = data;
			},

			getIssueErr(data) {
				console.log(data);
			},
			getAcceptSuc(data) {
				console.log(data);
				this.reload();
				this.cancel();
			},
			getCreditedErr(data) {
				console.log(data);
			},
			getSuspendSuc(data) {
				console.log(data);
				this.stopReasonArr = data;
			},
			getAcceptErr(data) {
				console.log(data);
				this.$message({
					message: data.returnMessage,
					type: 'warning'
				});
			},
			getFeedbackSuc(data) {
				console.log(data);
				this.reload();
				this.cancel();
			},
			getSendMoneyErr(data) {
				console.log(data);
				var that = this;
				if(data.returnCode == "50000005") {
					that.xkedErr = data.returnMessage;
					that.xkedTip = true;
				}
			},
			getFeedbackErr(data) {
				console.log(data);
			},
			getCreditReportSuc(data) {
				console.log(data);
				this.reload();
				this.cancel();
			},
			getSuspendErr(data) {
				console.log(data);
			},
			getStopSuc(data) {
				console.log(data);
				this.reload();
				this.cancel();
			},
			getStopErr(data) {
				console.log(data);
			},
			getCreditReportErr() {
				console.log(data);
			},
			getCreditedSuc(data) {
				console.log(data);
				this.reload();
				this.cancel();
			},
			getSendMoneySuc(data) {
				console.log(data);
				this.reload();
				this.cancel();
			},
			handleClick(tab, event) {
				// console.log(this.applyInfo);
				// console.log(tab, event);
			},
			back() {
				this.$router.push({
					name: 'customerAccept',
					params: {
						back: 'back'
					}
				});
			},
			optBtn(obj) {
				console.log(obj);
				if(obj == 'issue') {
					this.distribute = true;
					let data = {
						"service": "organizeService",
						"method": "getBranch",
						"data": {}
					};
					this.$api.post('', data, this.getBranchInfoSuc, this.getBranchInfoErr, this.headers);
				} else if(obj == 'accept') {
					this.receive = true;
				} else if(obj == 'feedback') {
					this.feedback = true;
				} else if(obj == 'credit_report') {
					this.creditReport = true;
				} else if(obj == 'credit') {
					this.credited = true;
				} else if(obj == 'suspend') {
					let data = {
						"service": "applyService",
						"method": "getApplySuspend",
						"data": {
							"client": "B"
						}
					};
					this.$api.post('', data, this.getSuspendSuc, this.getSuspendErr, this.headers);
					this.stop = true;
				} else if(obj == 'loaned') {
					this.sendMoney = true;
				}
			},
			cancel() {
				this.receiveText = '';
				this.feedbackErr = '';
				this.creditReport = false;
				this.issueTip = false;
				this.receive = false;
				this.receiveTip = false;
				this.receiveErr = '';
				this.handleText = '';
				this.sxedErr = '';
				this.sxqx = '';
				this.sxqxTip = false;
				this.sxqxErr = '';
				this.sendMoney = false;
				this.feedbackTip = false;
				this.creditReportText = '';
				this.xkedErr = '';
				this.xksj = '';
				this.xksjTip = false;
				this.xked = '';
				this.xkedTip = false;
				this.feedback = false;
				this.feedbackText = '';
				this.stopReason = '';
				this.reasonText = '';
				this.xksjErr = '';
				this.stop = false;
				this.reasonTip = false;
				this.distribute = false;
				this.bankName = '';
				this.nick = '';
				this.reasonErr = '';
				this.creditReportTip = false;
				this.creditReportErr = '';
				this.credited = false;
				this.sxed = '';
				this.sxedTip = false;
				this.issueErr = '';
			},
			fixedBtn() {
				if(this.bankName == '') {
					this.issueErr = '请选择银行分支';
					this.issueTip = true;
					return;
				} else if(this.nick == '') {
					this.issueErr = '请选择人员';
					this.issueTip = true;
					return;
				}
				let data = {
					"service": "operateService",
					"method": "issue",
					"data": {
						applySerial: this.applyInfo.serialNum,
						userId: this.nick
					}
				};
				this.$api.post('', data, this.getIssueSuc, this.getIssueErr, this.headers);
			},
			receiveBtn() {
				let data = {
					"service": "operateService",
					"method": "accept",
					"data": {
						applySerial: this.applyInfo.serialNum,
						handleText: this.receiveText
					}
				};
				this.$api.post('', data, this.getAcceptSuc, this.getAcceptErr, this.headers);
			},
			feedbackBtn() {
				if(this.feedbackText == '') {
					this.feedbackErr = '请填写反馈详情';
					this.feedbackTip = true;
					return false;
				}
				let data = {
					"service": "operateService",
					"method": "feedBack",
					"data": {
						applySerial: this.applyInfo.serialNum,
						handleText: this.feedbackText
					}
				};
				this.$api.post('', data, this.getFeedbackSuc, this.getFeedbackErr, this.headers);
			},
			creditReportBtn() {
				if(this.creditReportText == '') {
					this.creditReportErr = '请填写上报详情';
					this.creditReportTip = true;
					return false;
				}
				let data = {
					"service": "operateService",
					"method": "creditReport",
					"data": {
						applySerial: this.applyInfo.serialNum,
						handleText: this.creditReportText
					}
				};
				this.$api.post('', data, this.getCreditReportSuc, this.getCreditReportErr, this.headers);
			},
			edReplace($event) {
				let dom = $event.target;
				this.replaceAndSetPos(dom, /[^\d]/g, '');
				this.sxed = dom.value;
			},
			checkEd() {
				this.sxedTip = false;
				if(!this.sxed || this.sxed === '') {
					this.sxedTip = true;
					this.sxedErr = '请填写授信额度';
					return this.sxedTip;
				}
				if(this.sxed > this.loanLimit) {
					this.sxedTip = true;
					this.sxedErr = '不能超过产品最高额度';
					return this.sxedTip;
				}
				return this.sxedTip;
			},
			qxReplace($event) {
				let dom = $event.target;
				this.replaceAndSetPos(dom, /[^\d]/g, '');
				this.sxqx = dom.value;
			},
			checkQx() {
				this.sxqxTip = false;
				if(!this.sxqx || this.sxqx === '') {
					this.sxqxTip = true;
					this.sxqxErr = '请填写授信期限';
					return this.sxqxTip;
				}
				return this.sxqxTip;
			},
			creditedBtn() {
				let err = this.checkEd() + this.checkQx();
				if(err) {
					return;
				}
				let data = {
					"service": "operateService",
					"method": "credit",
					"data": {
						applySerial: this.applyInfo.serialNum,
						creditQuota: this.sxed,
						creditTerm: this.sxqx
					}
				};
				this.$api.post('', data, this.getCreditedSuc, this.getCreditedErr, this.headers);
			},
			stopBtn() {
				if(this.stopReason == '') {
					this.reasonErr = '请选择终止原因';
					this.reasonTip = true;
					return false;
				}
				let data = {
					"service": "operateService",
					"method": "suspend",
					"data": {
						applySerial: this.applyInfo.serialNum,
						suspendType: this.stopReason,
						handleText: this.reasonText
					}
				};
				this.$api.post('', data, this.getStopSuc, this.getStopErr, this.headers);
			},
			sendMoneyBtn() {
				if(this.xked == '') {
					this.xkedErr = '请填写下款额度';
					this.xkedTip = true;
					return false;
				}
				if(this.xked > this.creditQuota) {
					this.xkedErr = '下款额度不能超过授信额度';
					this.xkedTip = true;
					return false;
				}
				if(this.xksj == '') {
					this.xksjErr = '请填写下款时间';
					this.xksjTip = true;
					return false;
				}
				let data = {
					"service": "operateService",
					"method": "loaned",
					"data": {
						applySerial: this.applyInfo.serialNum,
						loanedQuota: parseInt(this.xked),
						loanedDate: this.xksj
					}
				};
				this.$api.post('', data, this.getSendMoneySuc, this.getSendMoneyErr, this.headers);
			},
			getUserApplyUploadListByProductId() {
				/**
				 * 获取产品可显示项
				 
				 */
				var that = this;
				let data = {
					"service": "configService",
					"method": "getUserApplyUploadListByProductId",
					"data": {
						"product": {
							"id": that.productId
						}
					}
				};
				that.$api.post('', data, that.getUserApplyUploadListByProductIdSuc, that.getUserApplyUploadListByProductIdErr, that.headers);
			},
			getUserApplyUploadListByProductIdSuc(data) {
				var that = this;
				that.showApplyUploadList = data;
			},
			handleApplyUploadList(id) {
				var that = this;
				var s = [];
				for(var i in that.showApplyUploadList) {
					if(that.showApplyUploadList[i].id == id) {
						s.push(that.showApplyUploadList[i]);
					}
				}
				if(s.length > 0) {
					return true;
				} else {
					return false;
				}
			},
			getUserApplyUploadListByProductIdErr(data) {
				this.$message({
					message: data.returnMessage,
					type: 'warning'
				});
			},
			removeTip(tag) {
				console.log(tag);
				this.tag = false;
			},
			handleFileList(fileType) {
				//获取上传文件
				var that = this;
				var s = [];
				for(var i in that.allFileList) {
					if(that.allFileList[i].type == fileType) {
						s.push(that.allFileList[i]);
					}
				}
				return s;
			},
			removeFileList(fileType) {
				//删除上传文件
				var that = this;
				for(var i in that.allFileList) {
					if(that.allFileList[i].type == fileType) {
						that.allFileList.splice(i, 1);
					}
				}
			},
			fileInter(data) {
				var that = this;
				console.log(that.headers)
				return axios({
					method: 'POST',
					url: "",
					data: data,
					baseURL: that.uploadUrl,
					withCredentials: false,
					headers: that.headers
				})
			},
			getApplyFiles() {
				var that = this;
				let fd = new FormData();
				fd.append('enterpriseName', that.enterpriseName);
				console.log(that.headers);
				axios({
					method: 'POST',
					url: "",
					baseURL: that.getApplyFilesUrl,
					data: fd,
					withCredentials: false,
					headers: that.headers
				}).then(res => {
					console.log(res)
					let data = res.data;
					if(data.returnCode === "00000000") {
						var returnData = data.returnData;
						that.allFileList = [];
						for(var i in returnData) {
							returnData[i].url = that.downloadUrl + "?fileId=" + returnData[i].fileId;
							returnData[i].name = returnData[i].fileName;
							returnData[i].id = returnData[i].fileId;
							that.allFileList.push(returnData[i]);
						}
						if(that.allFileList.length > 0) {
							that.companyInfo = true;
						}
					} else {
						window.alert('error: ' + JSON.stringify(data.returnMessage))
					}
				});
			},

			beforeSectionUpload(file) {
				const isLt2M = file.size / 1024 / 1024 < 4
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 4MB!',
						type: 'warning'
					});
				}
				return isLt2M
			},
			beforeXMLUpload(file) {
				const isLt2M = file.size / 1024 / 1024 < 4
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 4MB!',
						type: 'warning'
					});
				}
				return isLt2M
			},
			uploadSectionFile(param, type) { //自定义文件上传
				/*
				 * type:
					1, 营业执照
					2, 法定代表人身份证正面
					3, 法定代表人身份证反面
					4, 法定代表人配偶身份证正面
					5, 法定代表人配偶身份证反面
					6, 实际控制人身份证正面
					7, 实际控制人身份证反面
					8, 实际控制人配偶身份证正面
					9, 实际控制人配偶身份证反面
					10, 企业去年资产负债表
					11, 企业去年资产利润表
					12, 企业去年资产负债表
					13, 企业去年资产利润表
					14, 企业征信报告*/
				var that = this;
				var file = param.file;
				let fd = new FormData();
				fd.append('uploadFile', file);
				fd.append('parentName', that.authInfo.qymc);
				fd.append('fileType', type);
				let loadingInstance1 = Loading.service({
					fullscreen: true
				});
				that.fileInter(fd).then(res => {
					console.log(res)
					let data = res.data;
					if(data.returnCode === "00000000") {
						var returnData = data.returnData;
						var tempFile = {
							id: returnData.id,
							name: returnData.fileName,
							url: that.downloadUrl + "?fileId=" + returnData.id,
							fileId: returnData.id,
							fileName: returnData.fileName,
							type: type
						};
						that.allFileList.push(tempFile);
						loadingInstance1.close();
					} else {
						loadingInstance1.close();
						if(data.returnCode === "6000002") {
							this.$message({
								message: data.returnMessage,
								type: 'warning'
							});
						} else {
							this.$message({
								message: data.returnMessage,
								type: 'warning'
							});
						}
						//window.alert('error: ' + JSON.stringify(data.returnMessage))
					}
				});
			},
			deleteFileInter(data) {
				var that = this;
				console.log(that.headers)
				return axios({
					method: 'post',
					url: that.deleteUrl,
					timeout: 20000,
					data: data,
					withCredentials: false,
					headers: that.headers
				})
			},
			removeFile(type, fileId) {
				/**
				 * 删除
				 */
				var that = this;
				let fd = new FormData();
				fd.append('fileId', fileId); //文件id
				that.deleteFileInter(fd).then(res => {
					console.log(res)
					let data = res.data;
					if(data.returnCode === "00000000") {
						var returnData = data.returnData;
						that.removeFileList(type);
					} else {
						window.alert('error: ' + JSON.stringify(data.returnMessage))
					}
				});
			},
			removeXMLFile(file, fileList, type) {
				console.log(type)

				var that = this;
				let fd = new FormData();
				fd.append('fileId', file.id); //文件id
				that.deleteFileInter(fd).then(res => {
					console.log(res)
					let data = res.data;
					if(data.returnCode === "00000000") {
						var returnData = data.returnData;
						that.removeFileList(type);
					} else {
						window.alert('error: ' + JSON.stringify(data.returnMessage))
					}
				});

			},
			openImage(e, url) {
				//预览图片
				var img_url = url;

				// 创建对象
				var img = new Image();

				// 改变图片的src
				img.src = img_url;

				// 加载完成执行
				img.onload = function() {
					var imagList = [{
						width: img.width,
						height: img.height,
						url: url
					}]
					console.log(e.target)
					fancyBox(e.target, imagList);
				};
			},
			previewFile(file) {
				var that = this;
				var url = that.downloadUrl + "?fileId=" + file.id;
				var fileName = file.name;
				if(fileName.indexOf(".pdf") != -1 || fileName.indexOf(".PDF") != -1) {
					this.$router.push({
						name: 'pdf',
						query: {
							url: Base64.encode(url)
						}
					})
				} else {
					console.log(file.name)
					window.open(url)
					//this.$router.push({ name: 'viewer', query: { url:"https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls" } })
				}

			}
		}
	}
</script>

<style lang="stylus" scoped>
	.pop-box {
		&>div {
			&>i {
				cursor: pointer;
			}
		}
	}
	
	.red {
		color: red !important;
	}
	
	.clearfix:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	
	.clearfix {
		display: block;
	}
	
	.is-wait {
		.el-step__icon {
			background-color: #fff;
			color: #c0c4cc;
		}
	}
	
	.is-error {
		.el-step__icon {
			background-color: #fff;
			color: rgb(245, 108, 108);
		}
	}
	
	.el-tabs__nav-scroll {
		background: #ffffff;
		padding-left: 48px;
	}
	
	.list_h:hover {
		color: #3185ff;
		text-decoration: underline;
	}
	
	.bkt_customerDetailContent {
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
		.customerInfo {
			margin: 0 24px;
			padding-bottom: 100px;
		}
		.opt {
			position: fixed;
			width: 100%;
			height: 60px;
			line-height: 60px;
			background: #f0f1f8;
			bottom: 0;
			z-index: 11;
			.lt {
				float: left;
				width: 40%;
				display: inline-block;
			}
			.rt {
				float: right;
				text-align right;
				margin-right: 50px;
				width: 40%;
				display: inline-block;
			}
		}
		.basis {
			background: #fff;
			.report {
				padding: 10px 30px;
				border-bottom 1px solid #eaeaea;
				text-align: right;
				.trial {
					display inline-block;
					text-align: center;
					width: 100px;
					height: 36px;
					line-height: 36px;
					font-size: 14px;
					color #fff;
					background: #3185ff;
				}
				.cret {
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
			.product {
				width: 100%;
				.productInfo {
					font-weight: 550;
					padding: 12px 30px 19px;
					font-size: 14px;
					color: #363f45;
					border-bottom 1px solid #eaeaea;
				}
				.info {
					font-size 14px;
					color #363f45;
					border-bottom 1px solid #eaeaea;
					&>div {
						padding: 12px 30px;
						&>div {
							display: inline-block;
							width: 23%;
						}
					}
				}
			}
			.apply {
				width: 100%;
				.applyInfo {
					font-weight: 550;
					padding: 12px 30px 19px;
					font-size: 14px;
					color: #363f45;
					border-bottom 1px solid #eaeaea;
				}
				.info {
					font-size 14px;
					color #363f45;
					border-bottom 1px solid #eaeaea;
					&>div {
						padding: 12px 0 14px 20px;
						&>div {
							display: inline-block;
							width: 24%;
						}
					}
				}
			}
		}
		.credit {
			background: #fff;
			.credit-content {
				width: 100%;
				.creditInfo {
					font-weight: 550;
					padding: 20px 30px;
					font-size: 14px;
					color: #363f45;
					border-bottom 1px solid #eaeaea;
				}
				.info {
					font-size 14px;
					color #363f45;
					border-bottom 1px solid #eaeaea;
					&>div {
						padding: 12px 30px;
						&>div {
							display: inline-block;
							width: 23%;
						}
					}
				}
			}
		}
		.applyInfo {
			width: 737px;
			margin-left: 10px;
			.none_list {
				color: #909399;
				text-align: center;
			}
			.applyTip {
				text-align: left;
				padding: 25px 25px 10px 25px;
				font-size: 10px;
				color: red;
				line-height: 20px;
			}
			.applyContent {
				background-color: rgba(255, 255, 255, 255);
				width: 100%;
				.applyli {
					.applytitle {
						padding: 20px 30px;
						border-bottom: 1px solid #e6e7ed;
						color: #363f45;
						font-size: 14px;
						text-align: left;
						font-weight: bold;
					}
					.applyList {
						padding: 20px 30px;
						border-bottom: 1px solid #e6e7ed;
						text-align: left;
						.mblicence {
							.mblicenceLeft {
								float: left;
								position: relative;
								img {
									width: 118px;
									height: 150px;
									cursor: pointer;
								}
								.mblicenceTip {
									margin-top: 10px;
									font-size: 12px;
									color: #999999;
									line-height: 16px;
									text-align: center;
								}
							}
							.mblicenceRight {
								float: left;
								margin-left: 30px;
								margin-top: 15px;
								.mblicenceTip {
									margin-bottom: 38px;
									&>div {
										font-size: 12px;
										color: #999999;
										line-height: 21px;
									}
								}
							}
						}
						.legalPerson {
							.legalPersonli {
								float: left;
								margin-right: 38px;
								text-align: center;
								width: 132px;
								cursor: pointer;
								position: relative;
								.img_div {
									position: relative;
									width: 132px;
									height: 78px;
									.mask {
										position: absolute;
										top: 0;
										left: 0;
										width: 132px;
										height: 78px;
										background: rgba(101, 101, 101, 0.2);
										color: #ffffff;
										border-radius: 5px;
										opacity: 0;
										.avatar-uploader {
											border: 1px dashed #ffffff;
											border-radius: 6px;
											cursor: pointer;
											position: relative;
											overflow: hidden;
											width: 40px;
											height: 40px;
											margin: 19px auto;
											.avatar-uploader-icon {
												font-size: 16px;
												color: #ffffff;
												width: 39px;
												height: 39px;
												line-height: 39px;
												text-align: center;
											}
										}
									}
									a:hover {
										.mask {
											opacity: 1;
										}
									}
								}
								img {
									width: 132px;
									height: 78px;
								}
								.legalPersonTip {
									margin-top: 10px;
									font-size: 12px;
									color: #999999;
									line-height: 16px;
								}
							}
							.legalPersonli:last-child {
								margin-right: 0px;
							}
						}
						.applyUploadList {
							.applyUploadLi {
								margin-bottom: 20px;
								.applyUploadTip {
									float: left;
									font-size: 14px;
									color: #363f45;
									line-height: 30px;
									min-width: 170px
								}
								.applyUploadContent {
									float: left;
									margin-left: 11px;
									.el-upload-list {
										display: inline-block;
										vertical-align: middle;
										margin-left: 15px;
										.el-upload-list__item {
											margin-top: 0px;
											.el-upload-list__item-name {
												min-width: 310px;
											}
										}
									}
								}
								.applyUploadNoneTip {
									float: left;
									margin-left: 11px;
									font-size: 12px;
									color: #999;
									line-height: 30px;
								}
								.applyUploadShowTip {
									float: left;
									margin-left: 11px;
									font-size: 12px;
									color: #67c23a;
									line-height: 30px;
									cursor: pointer;
								}
							}
						}
					}
				}
				.upload_btn {
					background-color: #f0871e;
					width: 80px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					border-radius: 14px;
					color: #FFFFFF;
					font-size: 12px;
					padding: 0px;
					border-color: #f0871e
				}
			}
		}
	}
	
	.mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow auto;
		margin: 0;
		z-index: 2001;
		.pop-box {
			position relative;
			width: 410px;
			margin 10% auto 50px;
			background #fff;
			border-radius 2px;
			box-shadow 0px 3px 10px 0px rgba(26, 24, 25, 0.3);
			box-sizing border-box;
			.title {
				padding 21px 20px 14px 20px;
				font-size 16px;
				color: #363f45;
				border-bottom 1px solid #f0f1f4;
				position: relative;
				&>i {
					font-family: element-icons!important;
					speak: none;
					font-style: normal;
					font-weight: 400;
					font-variant: normal;
					text-transform: none;
					line-height: 1;
					position: absolute;
					top: 15px;
					right: 10px;
					display: block;
					font-size: 28px;
					color: #606266;
					vertical-align: baseline;
					&:before {
						content: "\E60F";
					}
				}
			}
			.issue_content {
				padding 40px 20px 70px 20px;
				border-bottom 1px solid #f0f1f4;
				.issue {
					&>label {
						font-size 14px;
						color #363f45;
						width 110px;
						display inline-block;
					}
					&>div {
						display inline-block;
						padding-bottom 20px;
					}
				}
			}
			.receive_content {
				padding 40px 20px 40px 20px;
				border-bottom 1px solid #f0f1f4;
				&>label {
					display inline-block;
					vertical-align top;
					margin-right 20px;
				}
				&>div {
					display inline-block;
					&>p {
						padding-top 13px;
					}
				}
			}
			.credited_content {
				padding 40px 20px 40px 20px;
				border-bottom 1px solid #f0f1f4;
				&>div {
					input {
						width 215px;
						height 28px;
						line-height 28px;
						margin-left 10px;
						border: 1px solid #eaeaea;
					}
				}
				&>p {
					padding 12px 0 12px 80px;
				}
			}
			.stop_content {
				padding 40px 20px 40px 20px;
				border-bottom 1px solid #f0f1f4;
				&>div {
					padding-bottom 15px .lab {
						width 60px;
						display inline-block;
					}
					.labs {
						display inline-block;
					}
				}
				&>p {
					padding 12px 0 12px 80px;
				}
			}
			.sendMoney_content {
				padding 40px 20px 40px 20px;
				border-bottom 1px solid #f0f1f4;
				&>div {
					input {
						width 212px;
						height 40px;
						line-height 40px;
						margin-left 10px;
						border-radius 4px;
						border: 1px solid #eaeaea;
						padding-left: 8px;
					}
				}
				&>p {
					padding 12px 0 12px 80px;
				}
			}
			.btn {
				padding 20px 40px;
				text-align right;
			}
			.txt {
				position relative;
				top -26px;
				left 250px;
				display inline-block;
			}
			.txt_t {
				position relative;
				top -21px;
				left 250px;
				display inline-block;
			}
		}
	}
</style>